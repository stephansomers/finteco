import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/lib/types";
import { formatNumber, getMonthName } from "@/lib/csv-utils";

interface Props {
  transactions: Transaction[];
  year: number;
}

export function YearlyConsolidated({ transactions, year }: Props) {
  const yearTx = transactions.filter(
    t => new Date(t.date).getFullYear() === year
  );

  const subcategories = [...new Set(yearTx.map(t => t.subcategory))].sort();

  const getData = (sub: string, month: number) =>
    yearTx
      .filter(t => t.subcategory === sub && new Date(t.date).getMonth() === month)
      .reduce((s, t) => s + (t.type === "income" ? t.value : -t.value), 0);

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader><CardTitle className="text-sm font-medium">Yearly Consolidated — {year}</CardTitle></CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="consolidated" className="border-border/50">
            <AccordionTrigger className="text-sm">View Breakdown by Subcategory</AccordionTrigger>
            <AccordionContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead className="sticky left-0 bg-card">Subcategory</TableHead>
                    {Array.from({ length: 12 }, (_, i) => (
                      <TableHead key={i} className="text-right">{getMonthName(i)}</TableHead>
                    ))}
                    <TableHead className="text-right font-bold">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subcategories.map(sub => {
                    const values = Array.from({ length: 12 }, (_, i) => getData(sub, i));
                    const total = values.reduce((a, b) => a + b, 0);
                    return (
                      <TableRow key={sub} className="border-border/50">
                        <TableCell className="sticky left-0 bg-card font-medium">{sub}</TableCell>
                        {values.map((v, i) => (
                          <TableCell key={i} className={`text-right ${v > 0 ? "text-chart-income" : v < 0 ? "text-chart-expense" : "text-muted-foreground"}`}>
                            {v !== 0 ? formatNumber(Math.abs(v)) : "—"}
                          </TableCell>
                        ))}
                        <TableCell className={`text-right font-bold ${total > 0 ? "text-chart-income" : total < 0 ? "text-chart-expense" : ""}`}>
                          {formatNumber(Math.abs(total))}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
