import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ArrowUpDown } from "lucide-react";
import { Transaction } from "@/lib/types";
import { formatCurrency, formatNumber, getMonthName } from "@/lib/csv-utils";

interface Props {
  transactions: Transaction[];
  year: number;
}

const KNOWN_NAMES = ["Gabriel", "Mariana", "Rafael", "Fernanda", "Others"];

function extractPerson(description: string): string {
  const desc = description.toLowerCase();
  for (const name of KNOWN_NAMES) {
    if (desc.includes(name.toLowerCase())) return name;
  }
  return "Others";
}

function isLoanTx(t: Transaction) {
  return (
    t.category.toLowerCase().includes("loan") ||
    t.category.toLowerCase().includes("lend") ||
    t.category.toLowerCase().includes("repay") ||
    t.subcategory.toLowerCase().includes("loan") ||
    t.subcategory.toLowerCase().includes("lend") ||
    t.subcategory.toLowerCase().includes("repay")
  );
}

export function LoansTab({ transactions, year }: Props) {
  const [loanYear, setLoanYear] = useState<string>(year.toString());
  const [sortField, setSortField] = useState<"date" | "description" | "category" | "value">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

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
    t.type === "income" || t.category.toLowerCase().includes("repay") || t.subcategory.toLowerCase().includes("repay");

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
      const person = extractPerson(t.description);
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
  }, [loanTx]);

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

  const selectedLabel = loanYear === "all" ? "All Years" : loanYear;

  return (
    <div className="space-y-6">
      {/* Year Filter */}
      <div className="flex items-center gap-2">
        <Select value={loanYear} onValueChange={setLoanYear}>
          <SelectTrigger className="w-[120px] border-border/50 bg-secondary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {loanYears.map(y => (
              <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Annual Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Total Lent", value: totalLent, color: "text-chart-expense" },
          { label: "Total Repaid", value: totalRepaid, color: "text-chart-income" },
          { label: "Outstanding Balance", value: outstanding, color: outstanding >= 0 ? "text-chart-income" : "text-chart-expense" },
        ].map(({ label, value, color }) => (
          <Card key={label} className="border-border/50 bg-card">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>{formatCurrency(Math.abs(value))}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Consolidated Table */}
      <Card className="border-border/50 bg-card">
        <CardHeader><CardTitle className="text-sm font-medium">Monthly Consolidated</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto scrollbar-thin">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead className="sticky left-0 bg-card">Category</TableHead>
                {Array.from({ length: 12 }, (_, i) => (
                  <TableHead key={i} className="text-right">{getMonthName(i)}</TableHead>
                ))}
                <TableHead className="text-right font-bold">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map(cat => {
                const isRepay = cat.toLowerCase().includes("repay");
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
                <TableCell className="sticky left-0 bg-secondary/50 font-bold">TOTAL</TableCell>
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

      {/* Person Consolidation & Chart */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50 bg-card">
          <CardHeader><CardTitle className="text-sm font-medium">Consolidated by Person</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead className="pl-6">Person</TableHead>
                  <TableHead className="text-right">Lent</TableHead>
                  <TableHead className="text-right">Repaid</TableHead>
                  <TableHead className="text-right pr-6">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {personData.length === 0 ? (
                  <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No loan data</TableCell></TableRow>
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
                    <TableCell className="pl-6 font-bold">Total</TableCell>
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
          <CardHeader><CardTitle className="text-sm font-medium">Loans by Person</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={personData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 18%)" />
                  <XAxis dataKey="name" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                  <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={tooltipStyle} />
                  <Legend />
                  <Bar dataKey="lent" name="Lent" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="repaid" name="Repaid" fill="hsl(160, 84%, 39%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card className="border-border/50 bg-card">
        <CardHeader><CardTitle className="text-sm font-medium">Loan Transactions — {selectedLabel}</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead className="cursor-pointer select-none" onClick={() => toggleSort("date")}>
                  Date <ArrowUpDown className="ml-1 inline h-3 w-3" />
                </TableHead>
                <TableHead className="cursor-pointer select-none" onClick={() => toggleSort("description")}>
                  Description <ArrowUpDown className="ml-1 inline h-3 w-3" />
                </TableHead>
                <TableHead className="cursor-pointer select-none" onClick={() => toggleSort("category")}>
                  Category <ArrowUpDown className="ml-1 inline h-3 w-3" />
                </TableHead>
                <TableHead className="cursor-pointer select-none text-right" onClick={() => toggleSort("value")}>
                  Value <ArrowUpDown className="ml-1 inline h-3 w-3" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedLoanTx.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground">No loan transactions</TableCell></TableRow>
              ) : sortedLoanTx.map((t, i) => (
                <TableRow key={i} className="border-border/50">
                  <TableCell className="text-muted-foreground">{t.date}</TableCell>
                  <TableCell>{t.description}</TableCell>
                  <TableCell>{t.category}</TableCell>
                  <TableCell className={`text-right font-medium ${isRepayment(t) ? "text-chart-income" : "text-chart-expense"}`}>
                    {isRepayment(t) ? "+" : "-"}{formatCurrency(t.value)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
