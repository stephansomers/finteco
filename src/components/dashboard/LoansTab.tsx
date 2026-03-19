import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Transaction } from "@/lib/types";
import { formatCurrency, formatNumber } from "@/lib/csv-utils";
import { useI18n } from "@/lib/i18n";

interface Props {
  transactions: Transaction[];
  year: number;
  keyPeople?: string[];
}

function extractPerson(description: string, knownNames: string[]): string {
  const desc = description.toLowerCase();
  for (const name of knownNames) {
    if (desc.includes(name.toLowerCase())) return name;
  }
  return "Others";
}

const LOAN_KEYWORDS = ["loan", "lend", "repay", "empréstimo", "emprestimo", "pagamento"];

function isLoanTx(t: Transaction) {
  const cat = t.category.toLowerCase();
  const sub = t.subcategory.toLowerCase();
  return LOAN_KEYWORDS.some(k => cat.includes(k) || sub.includes(k));
}

export function LoansTab({ transactions, year, keyPeople = [] }: Props) {
  const { t, tMonth } = useI18n();
  const [loanYear, setLoanYear] = useState<string>(year.toString());
  const [sortField, setSortField] = useState<"date" | "description" | "category" | "value">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [txTableOpen, setTxTableOpen] = useState(true);

  const knownNames = useMemo(() => {
    if (keyPeople.length > 0) return [...keyPeople, "Others"];
    return ["Gabriel", "Mariana", "Rafael", "Fernanda", "Others"];
  }, [keyPeople]);

  const allLoanTx = useMemo(() => transactions.filter(isLoanTx), [transactions]);

  const loanYears = useMemo(() => {
    const yrs = [...new Set(allLoanTx.map(t => new Date(t.date).getFullYear()))].sort((a, b) => b - a);
    return yrs;
  }, [allLoanTx]);

  const loanTx = useMemo(() => {
    if (loanYear === "all") return allLoanTx;
    return allLoanTx.filter(t => new Date(t.date).getFullYear() === parseInt(loanYear));
  }, [allLoanTx, loanYear]);

  const isRepayment = (t: Transaction) =>
    t.type === "income" || t.category.toLowerCase().includes("repay") || t.subcategory.toLowerCase().includes("repay") || t.category.toLowerCase().includes("pagamento") || t.subcategory.toLowerCase().includes("pagamento");

  const totalLent = loanTx.filter(t => !isRepayment(t)).reduce((s, t) => s + t.value, 0);
  const totalRepaid = loanTx.filter(t => isRepayment(t)).reduce((s, t) => s + t.value, 0);
  const outstanding = totalRepaid - totalLent;

  const categories = [...new Set(loanTx.map(t => t.subcategory || t.category))].sort();
  const getMonthlyValue = (cat: string, month: number) =>
    loanTx.filter(t => (t.subcategory || t.category) === cat && new Date(t.date).getMonth() === month)
      .reduce((s, t) => s + (isRepayment(t) ? t.value : -t.value), 0);

  const personData = useMemo(() => {
    const map: Record<string, { lent: number; repaid: number }> = {};
    loanTx.forEach(t => {
      const person = extractPerson(t.description, knownNames);
      if (!map[person]) map[person] = { lent: 0, repaid: 0 };
      if (isRepayment(t)) map[person].repaid += t.value;
      else map[person].lent += t.value;
    });
    return Object.entries(map)
      .map(([name, d]) => ({ name, ...d, balance: d.repaid - d.lent }))
      .sort((a, b) => {
        if (a.name === "Others") return 1;
        if (b.name === "Others") return -1;
        return a.name.localeCompare(b.name);
      });
  }, [loanTx, knownNames]);

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  };

  const sortedLoanTx = [...loanTx].sort((a, b) => {
    const mul = sortDir === "asc" ? 1 : -1;
    if (sortField === "date") return mul * (new Date(a.date).getTime() - new Date(b.date).getTime());
    if (sortField === "value") return mul * (a.value - b.value);
    return mul * ((a[sortField] || "").localeCompare(b[sortField] || ""));
  });

  const tooltipStyle = {
    backgroundColor: "hsl(224, 28%, 10%)",
    border: "1px solid hsl(220, 20%, 18%)",
    borderRadius: "8px",
    color: "hsl(210, 40%, 96%)",
  };

  const selectedLabel = loanYear === "all" ? t("filter.allYears") : loanYear;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end gap-2">
        <Select value={loanYear} onValueChange={setLoanYear}>
          <SelectTrigger className="w-[140px] border-border/50 bg-secondary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filter.allYears")}</SelectItem>
            {loanYears.map(y => (
              <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: t("loans.totalLent"), value: totalLent, color: "text-chart-expense" },
          { label: t("loans.totalRepaid"), value: totalRepaid, color: "text-chart-income" },
          { label: t("loans.outstanding"), value: outstanding, color: outstanding >= 0 ? "text-chart-income" : "text-chart-expense" },
        ].map(({ label, value, color }) => (
          <Card key={label} className="border-border/50 bg-card">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>{formatCurrency(Math.abs(value))}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50 bg-card">
        <CardHeader><CardTitle className="text-sm font-medium">{t("loans.monthlyConsolidated")}</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto scrollbar-thin">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead className="sticky left-0 bg-card">{t("loans.category")}</TableHead>
                {Array.from({ length: 12 }, (_, i) => (
                  <TableHead key={i} className="text-right">{tMonth(i)}</TableHead>
                ))}
                <TableHead className="text-right font-bold">{t("loans.total")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map(cat => {
                const isRepay = cat.toLowerCase().includes("repay") || cat.toLowerCase().includes("pagamento");
                const yearTotal = Array.from({ length: 12 }, (_, i) => getMonthlyValue(cat, i)).reduce((a, b) => a + b, 0);
                return (
                  <TableRow key={cat} className="border-border/50">
                    <TableCell className={`sticky left-0 bg-card font-medium ${isRepay ? "text-chart-income" : "text-chart-expense"}`}>{cat}</TableCell>
                    {Array.from({ length: 12 }, (_, i) => {
                      const v = getMonthlyValue(cat, i);
                      return (
                        <TableCell key={i} className={`text-right ${v > 0 ? "text-chart-income" : v < 0 ? "text-chart-expense" : "text-muted-foreground"}`}>
                          {v !== 0 ? formatNumber(Math.abs(v)) : "—"}
                        </TableCell>
                      );
                    })}
                    <TableCell className={`text-right font-bold ${yearTotal > 0 ? "text-chart-income" : yearTotal < 0 ? "text-chart-expense" : ""}`}>
                      {formatNumber(Math.abs(yearTotal))}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow className="border-border/50 bg-secondary/50">
                <TableCell className="sticky left-0 bg-secondary/50 font-bold">{t("loans.TOTAL")}</TableCell>
                {Array.from({ length: 12 }, (_, i) => {
                  const total = categories.reduce((s, cat) => s + getMonthlyValue(cat, i), 0);
                  return (
                    <TableCell key={i} className={`text-right font-bold ${total > 0 ? "text-chart-income" : total < 0 ? "text-chart-expense" : ""}`}>
                      {total !== 0 ? formatNumber(Math.abs(total)) : "—"}
                    </TableCell>
                  );
                })}
                <TableCell className={`text-right font-bold ${outstanding >= 0 ? "text-chart-income" : "text-chart-expense"}`}>
                  {formatNumber(Math.abs(categories.reduce((s, cat) => s + Array.from({ length: 12 }, (_, i) => getMonthlyValue(cat, i)).reduce((a, b) => a + b, 0), 0)))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50 bg-card">
          <CardHeader><CardTitle className="text-sm font-medium">{t("loans.byPerson")}</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead className="pl-6">{t("loans.person")}</TableHead>
                  <TableHead className="text-right">{t("loans.lent")}</TableHead>
                  <TableHead className="text-right">{t("loans.repaid")}</TableHead>
                  <TableHead className="text-right pr-6">{t("loans.balance")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {personData.length === 0 ? (
                  <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">{t("loans.noData")}</TableCell></TableRow>
                ) : personData.map((p, idx) => (
                  <TableRow key={p.name} className={`border-border/50 ${idx % 2 === 0 ? "bg-secondary/20" : ""}`}>
                    <TableCell className="pl-6 font-medium">{p.name}</TableCell>
                    <TableCell className="text-right text-chart-expense">{formatCurrency(p.lent)}</TableCell>
                    <TableCell className="text-right text-chart-income">{formatCurrency(p.repaid)}</TableCell>
                    <TableCell className={`text-right pr-6 font-bold ${p.balance >= 0 ? "text-chart-income" : "text-chart-expense"}`}>
                      {p.balance >= 0 ? "+" : "-"}{formatCurrency(Math.abs(p.balance))}
                    </TableCell>
                  </TableRow>
                ))}
                {personData.length > 0 && (
                  <TableRow className="border-border/50 bg-secondary/50">
                    <TableCell className="pl-6 font-bold">{t("loans.total")}</TableCell>
                    <TableCell className="text-right font-bold text-chart-expense">{formatCurrency(totalLent)}</TableCell>
                    <TableCell className="text-right font-bold text-chart-income">{formatCurrency(totalRepaid)}</TableCell>
                    <TableCell className={`text-right pr-6 font-bold ${outstanding >= 0 ? "text-chart-income" : "text-chart-expense"}`}>
                      {outstanding >= 0 ? "+" : "-"}{formatCurrency(Math.abs(outstanding))}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card">
          <CardHeader><CardTitle className="text-sm font-medium">{t("loans.chartTitle")}</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={personData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 18%)" />
                  <XAxis dataKey="name" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                  <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={tooltipStyle} />
                  <Legend />
                  <Bar dataKey="lent" name={t("loans.lent")} fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="repaid" name={t("loans.repaid")} fill="hsl(160, 84%, 39%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card">
        <Collapsible open={txTableOpen} onOpenChange={setTxTableOpen}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-medium">{t("loans.txTitle")} — {selectedLabel}</CardTitle>
              <CollapsibleTrigger className="rounded-md p-1 hover:bg-secondary">
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${txTableOpen ? "rotate-180" : ""}`} />
              </CollapsibleTrigger>
            </div>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="overflow-x-auto scrollbar-thin">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead className="cursor-pointer select-none" onClick={() => toggleSort("date")}>
                      {t("tx.date")} <ArrowUpDown className="ml-1 inline h-3 w-3" />
                    </TableHead>
                    <TableHead className="cursor-pointer select-none" onClick={() => toggleSort("description")}>
                      {t("tx.description")} <ArrowUpDown className="ml-1 inline h-3 w-3" />
                    </TableHead>
                    <TableHead className="cursor-pointer select-none" onClick={() => toggleSort("category")}>
                      {t("tx.category")} <ArrowUpDown className="ml-1 inline h-3 w-3" />
                    </TableHead>
                    <TableHead className="cursor-pointer select-none text-right" onClick={() => toggleSort("value")}>
                      {t("tx.value")} <ArrowUpDown className="ml-1 inline h-3 w-3" />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedLoanTx.length === 0 ? (
                    <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground">{t("loans.noTx")}</TableCell></TableRow>
                  ) : sortedLoanTx.map((tx, i) => (
                    <TableRow key={i} className="border-border/50">
                      <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                      <TableCell>{tx.description}</TableCell>
                      <TableCell>{tx.category}</TableCell>
                      <TableCell className={`text-right font-medium ${isRepayment(tx) ? "text-chart-income" : "text-chart-expense"}`}>
                        {isRepayment(tx) ? "+" : "-"}{formatCurrency(tx.value)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
}
