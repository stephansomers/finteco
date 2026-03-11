import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/lib/types";
import { getMonthName, formatCurrency } from "@/lib/csv-utils";

interface Props {
  transactions: Transaction[];
  year: number | null;
}

export function BalanceTrendChart({ transactions, year }: Props) {
  const yearTx = year ? transactions.filter(t => new Date(t.date).getFullYear() === year) : transactions;
  
  const data = Array.from({ length: 12 }, (_, i) => {
    const monthTx = yearTx.filter(t => new Date(t.date).getMonth() === i);
    const income = monthTx.filter(t => t.type === "income").reduce((s, t) => s + t.value, 0);
    const expense = monthTx.filter(t => t.type === "expense").reduce((s, t) => s + t.value, 0);
    return { month: getMonthName(i), balance: income - expense };
  });

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader><CardTitle className="text-sm font-medium">Balance Trend — {year}</CardTitle></CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 18%)" />
              <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} tickFormatter={v => `R$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ backgroundColor: "hsl(224, 28%, 10%)", border: "1px solid hsl(220, 20%, 18%)", borderRadius: "8px", color: "hsl(210, 40%, 96%)" }} />
              <Line type="monotone" dataKey="balance" stroke="hsl(210, 100%, 52%)" strokeWidth={2} dot={{ fill: "hsl(210, 100%, 52%)", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
