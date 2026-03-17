import { useState, useMemo, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Transaction, AssetSnapshot, DividendEntry } from "@/lib/types";
import { parseExcelFile } from "@/lib/excel-utils";
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
import { TutorialTab } from "@/components/dashboard/TutorialTab";
import { toast } from "sonner";

const currentYear = new Date().getFullYear();

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [assets, setAssets] = useState<AssetSnapshot[]>(MOCK_ASSETS);
  const [dividends, setDividends] = useState<DividendEntry[]>(MOCK_DIVIDENDS);
  const [txYear, setTxYear] = useState(currentYear.toString());
  const [wealthYear, setWealthYear] = useState("all");
  const [activeTab, setActiveTab] = useState("tutorial");
  const excelFileRef = useRef<HTMLInputElement>(null);

  const txYears = useMemo(() => {
    const yrs = transactions.map(t => new Date(t.date).getFullYear());
    return [...new Set([...yrs, currentYear])].sort((a, b) => b - a);
  }, [transactions]);

  const wealthYears = useMemo(() => {
    const yrs = assets.map(a => {
      const parts = a.date.split("/");
      return parseInt(parts.length === 3 ? parts[2] : parts[1]);
    });
    return [...new Set(yrs)].sort((a, b) => b - a);
  }, [assets]);

  const yearTx = useMemo(() =>
    txYear === "all"
      ? transactions
      : transactions.filter(t => new Date(t.date).getFullYear() === parseInt(txYear)),
    [transactions, txYear]);

  const revenue = yearTx.filter(t => t.type === "income").reduce((s, t) => s + t.value, 0);
  const expenses = yearTx.filter(t => t.type === "expense").reduce((s, t) => s + t.value, 0);
  const travel = yearTx.filter(t => t.type === "expense" && t.category.toLowerCase() === "travel").reduce((s, t) => s + t.value, 0);
  const balance = revenue - expenses;

  const filteredAssets = useMemo(() => {
    if (wealthYear === "all") return assets;
    return assets.filter(a => {
      const parts = a.date.split("/");
      const yr = parseInt(parts.length === 3 ? parts[2] : parts[1]);
      return yr === parseInt(wealthYear);
    });
  }, [assets, wealthYear]);

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = ev.target?.result as ArrayBuffer;
        const result = parseExcelFile(data);

        const loaded: string[] = [];
        if (result.transactions.length > 0) {
          setTransactions(result.transactions);
          loaded.push(`${result.transactions.length} transactions`);
        }
        if (result.dividends.length > 0) {
          setDividends(result.dividends);
          loaded.push(`${result.dividends.length} dividends`);
        }
        if (result.assets.length > 0) {
          setAssets(result.assets);
          loaded.push(`${result.assets.length} assets`);
        }

        if (loaded.length > 0) {
          toast.success("Data imported successfully", {
            description: `Loaded ${loaded.join(", ")}.`,
          });
        }

        if (result.errors.length > 0) {
          toast.error("Import warnings", {
            description: result.errors.join(" "),
          });
        }

        if (loaded.length === 0 && result.errors.length === 0) {
          toast.error("No data found", {
            description: "The file was read but no valid rows were found. Please check the template format.",
          });
        }
      } catch {
        toast.error("Invalid file", {
          description: "Could not read the file. Please upload a valid .xlsx Excel file.",
        });
      }
    };
    reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

  const YearFilter = ({ value, onChange, years }: { value: string; onChange: (v: string) => void; years: number[] }) => (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[120px] border-border/50 bg-secondary">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Years</SelectItem>
        {years.map(y => (
          <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-[1800px] items-center px-4 py-3 sm:px-6">
          <h1 className="text-lg font-bold tracking-tight">
            <span className="text-primary">Fin</span>Dashboard
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-[1800px] px-4 py-6 sm:px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-secondary w-full justify-start">
            <TabsTrigger value="tutorial">How to Use</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="loans">Loans</TabsTrigger>
            <TabsTrigger value="dividends">Dividends</TabsTrigger>
            <TabsTrigger value="wealth">Wealth Tracker</TabsTrigger>
          </TabsList>

          <TabsContent value="tutorial" className="mt-6">
            <TutorialTab
              onNavigate={setActiveTab}
              excelFileRef={excelFileRef}
              onExcelUpload={handleExcelUpload}
            />
          </TabsContent>

          <TabsContent value="transactions" className="mt-6 space-y-6">
            <div className="flex flex-wrap items-center justify-end gap-2">
              <YearFilter value={txYear} onChange={setTxYear} years={txYears} />
            </div>

            <KpiCards revenue={revenue} expenses={expenses} travel={travel} balance={balance} />
            <YearlyConsolidated transactions={transactions} year={txYear === "all" ? null : parseInt(txYear)} />

            <div className="grid gap-6 lg:grid-cols-2">
              <ExpenseDonutChart transactions={yearTx} />
              <IncomeDonutChart transactions={yearTx} />
            </div>

            <BalanceTrendChart transactions={transactions} year={txYear === "all" ? null : parseInt(txYear)} />
            <TransactionsTable transactions={transactions} year={txYear === "all" ? null : parseInt(txYear)} />
          </TabsContent>

          <TabsContent value="loans" className="mt-6 space-y-6">
            <LoansTab transactions={transactions} year={currentYear} />
          </TabsContent>

          <TabsContent value="dividends" className="mt-6 space-y-6">
            <DividendsTab dividends={dividends} year={currentYear} />
          </TabsContent>

          <TabsContent value="wealth" className="mt-6 space-y-6">
            <div className="flex flex-wrap items-center justify-end gap-2">
              <YearFilter value={wealthYear} onChange={setWealthYear} years={wealthYears} />
            </div>
            <WealthTracker assets={filteredAssets} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
