import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDown } from "lucide-react";
import { Transaction, SortField, SortDirection } from "@/lib/types";
import { formatCurrency } from "@/lib/csv-utils";

interface Props {
  transactions: Transaction[];
}

export function TransactionsTable({ transactions }: Props) {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  };

  const sorted = [...transactions].sort((a, b) => {
    const mul = sortDir === "asc" ? 1 : -1;
    if (sortField === "date") return mul * (new Date(a.date).getTime() - new Date(b.date).getTime());
    return mul * (a.value - b.value);
  });

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader><CardTitle className="text-sm font-medium">Transactions</CardTitle></CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50">
              <TableHead className="cursor-pointer select-none" onClick={() => toggleSort("date")}>
                Date <ArrowUpDown className="ml-1 inline h-3 w-3" />
              </TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Subcategory</TableHead>
              <TableHead className="cursor-pointer select-none text-right" onClick={() => toggleSort("value")}>
                Value <ArrowUpDown className="ml-1 inline h-3 w-3" />
              </TableHead>
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
