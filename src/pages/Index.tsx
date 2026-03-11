import { useState, useMemo, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";
import { Transaction, AssetSnapshot, DividendEntry } from "@/lib/types";
import { parseTransactionCSV, parseAssetCSV, parseDividendCSV, downloadTransactionTemplate, downloadAssetTemplate, downloadDividendTemplate } from "@/lib/csv-utils";
import { MOCK_TRANSACTIONS, MOCK_DIVIDENDS, MOCK_ASSETS } from "@/lib/mock-data";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { ExpenseDonutChart } from "@/components/dashboard/ExpenseDonutChart";
import { IncomeDonutChart } from "@/components/dashboard/IncomeDonutChart";
import { BalanceTrendChart } from "@/components/dashboard/BalanceTrendChart";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { YearlyConsolidated } from "@/components/dashboard/YearlyConsolidated";
import { WealthTracker } from "@/components/dashboard/WealthTracker";
import { LoansTab } from "@/components/dashboard/LoansTab";
import { DividendsTab } from "@/components/dashboard/DividendsTab";

const currentYear = new Date().getFullYear();

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [assets, setAssets] = useState<AssetSnapshot[]>(MOCK_ASSETS);
  const [dividends, setDividends] = useState<DividendEntry[]>(MOCK_DIVIDENDS);
  const [year, setYear] = useState(currentYear.toString());
  const txFileRef = useRef<HTMLInputElement>(null);
  const assetFileRef = useRef<HTMLInputElement>(null);
  const divFileRef = useRef<HTMLInputElement>(null);

  const years = useMemo(() => {
    const txYears = transactions.map(t => new Date(t.date).getFullYear());
    const all = [...new Set([...txYears, currentYear])].sort((a, b) => b - a);
    return all;
  }, [transactions]);

  const yearTx = useMemo(() =>
    transactions.filter(t => new Date(t.date).getFullYear() === parseInt(year)),
    [transactions, year]);

  const revenue = yearTx.filter(t => t.type === "income").reduce((s, t) => s + t.value, 0);
  const expenses = yearTx.filter(t => t.type === "expense").reduce((s, t) => s + t.value, 0);
  const travel = yearTx.filter(t => t.type === "expense" && t.category.toLowerCase() === "travel").reduce((s, t) => s + t.value, 0);
  const balance = revenue - expenses;

  const handleTxUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const parsed = parseTransactionCSV(ev.target?.result as string);
      setTransactions(prev => [...prev, ...parsed]);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleAssetUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const parsed = parseAssetCSV(ev.target?.result as string);
      setAssets(prev => [...prev, ...parsed]);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <h1 className="text-lg font-bold tracking-tight">
            <span className="text-primary">Fin</span>Dashboard
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[100px] border-border/50 bg-secondary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map(y => (
                  <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="bg-secondary w-full justify-start">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="wealth">Wealth Tracker</TabsTrigger>
            <TabsTrigger value="loans">Loans</TabsTrigger>
            <TabsTrigger value="dividends">Dividends</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-6">
            {/* Upload buttons */}
            <div className="flex flex-wrap gap-2">
              <input ref={txFileRef} type="file" accept=".csv" className="hidden" onChange={handleTxUpload} />
              <Button onClick={() => txFileRef.current?.click()} variant="outline" size="sm" className="border-border/50">
                <Upload className="mr-2 h-4 w-4" /> Upload CSV
              </Button>
              <Button onClick={downloadTransactionTemplate} variant="ghost" size="sm">
                <Download className="mr-2 h-4 w-4" /> Template
              </Button>
            </div>

            <KpiCards revenue={revenue} expenses={expenses} travel={travel} balance={balance} />

            <YearlyConsolidated transactions={transactions} year={parseInt(year)} />

            <div className="grid gap-6 lg:grid-cols-2">
              <ExpenseDonutChart transactions={yearTx} />
              <IncomeDonutChart transactions={yearTx} />
            </div>

            <BalanceTrendChart transactions={transactions} year={parseInt(year)} />

            <TransactionsTable transactions={transactions} year={parseInt(year)} />
          </TabsContent>

          <TabsContent value="wealth" className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <input ref={assetFileRef} type="file" accept=".csv" className="hidden" onChange={handleAssetUpload} />
              <Button onClick={() => assetFileRef.current?.click()} variant="outline" size="sm" className="border-border/50">
                <Upload className="mr-2 h-4 w-4" /> Upload Assets CSV
              </Button>
              <Button onClick={downloadAssetTemplate} variant="ghost" size="sm">
                <Download className="mr-2 h-4 w-4" /> Template
              </Button>
            </div>
            <WealthTracker assets={assets} />
          </TabsContent>

          <TabsContent value="loans" className="space-y-6">
            <LoansTab transactions={transactions} year={parseInt(year)} />
          </TabsContent>

          <TabsContent value="dividends" className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <input ref={divFileRef} type="file" accept=".csv" className="hidden" onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = ev => {
                  const parsed = parseDividendCSV(ev.target?.result as string);
                  setDividends(prev => [...prev, ...parsed]);
                };
                reader.readAsText(file);
                e.target.value = "";
              }} />
              <Button onClick={() => divFileRef.current?.click()} variant="outline" size="sm" className="border-border/50">
                <Upload className="mr-2 h-4 w-4" /> Upload Dividends CSV
              </Button>
              <Button onClick={downloadDividendTemplate} variant="ghost" size="sm">
                <Download className="mr-2 h-4 w-4" /> Template
              </Button>
            </div>
            <DividendsTab dividends={dividends} year={parseInt(year)} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
