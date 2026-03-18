import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/lib/types";
import { formatNumber } from "@/lib/csv-utils";
import { useI18n } from "@/lib/i18n";

interface Props {
  transactions: Transaction[];
  year: number | null;
}

export function YearlyConsolidated({ transactions, year }: Props) {
  const { t, tMonth } = useI18n();
  const yearTx = year
    ? transactions.filter(t => new Date(t.date).getFullYear() === year)
    : transactions;

  const incomeSubcategories = [...new Set(yearTx.filter(t => t.type === "income").map(t => t.subcategory))].sort();
  const expenseSubcategories = [...new Set(yearTx.filter(t => t.type === "expense").map(t => t.subcategory))].sort();
  const subcategories = [...incomeSubcategories, ...expenseSubcategories].filter((v, i, a) => a.indexOf(v) === i);

  const getData = (sub: string, month: number) =>
    yearTx
      .filter(t => t.subcategory === sub && new Date(t.date).getMonth() === month)
      .reduce((s, t) => s + (t.type === "income" ? t.value : -t.value), 0);

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader><CardTitle className="text-sm font-medium">{t("consolidated.title")}{year ? ` — ${year}` : ""}</CardTitle></CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="consolidated" className="border-border/50">
            <AccordionTrigger className="text-sm">{t("consolidated.breakdown")}</AccordionTrigger>
            <AccordionContent className="overflow-x-auto scrollbar-thin">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead className="sticky left-0 bg-card">{t("consolidated.subcategory")}</TableHead>
                    {Array.from({ length: 12 }, (_, i) => (
                      <TableHead key={i} className="text-right">{tMonth(i)}</TableHead>
                    ))}
                    <TableHead className="text-right font-bold">{t("consolidated.total")}</TableHead>
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
