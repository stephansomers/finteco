import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";
import { Transaction } from "@/lib/types";
import { formatCurrency } from "@/lib/csv-utils";

interface Props {
  transactions: Transaction[];
  year: number | null;
}

type SortField = "date" | "value" | "description" | "category" | "subcategory";
type SortDirection = "asc" | "desc";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function TransactionsTable({ transactions, year }: Props) {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");
  const [month, setMonth] = useState<string>("all");

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  };

  const filtered = useMemo(() => {
    let tx = transactions.filter(t => new Date(t.date).getFullYear() === year);
    if (month !== "all") {
      tx = tx.filter(t => new Date(t.date).getMonth() === parseInt(month));
    }
    return tx;
  }, [transactions, year, month]);

  const sorted = [...filtered].sort((a, b) => {
    const mul = sortDir === "asc" ? 1 : -1;
    if (sortField === "date") return mul * (new Date(a.date).getTime() - new Date(b.date).getTime());
    if (sortField === "value") return mul * (a.value - b.value);
    return mul * ((a[sortField] || "").localeCompare(b[sortField] || ""));
  });

  const SortHeader = ({ field, children, className }: { field: SortField; children: React.ReactNode; className?: string }) => (
    <TableHead className={`cursor-pointer select-none ${className || ""}`} onClick={() => toggleSort(field)}>
      {children} <ArrowUpDown className="ml-1 inline h-3 w-3" />
    </TableHead>
  );

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">Transactions</CardTitle>
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger className="w-[140px] border-border/50 bg-secondary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Months</SelectItem>
            {months.map((m, i) => (
              <SelectItem key={i} value={i.toString()}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50">
              <SortHeader field="date">Date</SortHeader>
              <SortHeader field="description">Description</SortHeader>
              <SortHeader field="category">Category</SortHeader>
              <SortHeader field="subcategory">Subcategory</SortHeader>
              <SortHeader field="value" className="text-right">Value</SortHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">No transactions</TableCell></TableRow>
            ) : sorted.map((t, i) => (
              <TableRow key={i} className="border-border/50">
                <TableCell className="text-muted-foreground">{t.date}</TableCell>
                <TableCell>{t.description}</TableCell>
                <TableCell>{t.category}</TableCell>
                <TableCell className="text-muted-foreground">{t.subcategory}</TableCell>
                <TableCell className={`text-right font-medium ${t.type === "income" ? "text-chart-income" : "text-chart-expense"}`}>
                  {t.type === "income" ? "+" : "-"}{formatCurrency(t.value)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
