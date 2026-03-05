import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/lib/types";
import { formatCurrency } from "@/lib/csv-utils";

const COLORS = [
  "hsl(160, 84%, 39%)", "hsl(210, 100%, 52%)", "hsl(47, 100%, 50%)",
  "hsl(280, 65%, 60%)", "hsl(30, 100%, 50%)", "hsl(190, 90%, 50%)",
  "hsl(340, 80%, 55%)", "hsl(120, 60%, 45%)",
];

interface Props {
  transactions: Transaction[];
}

export function IncomeDonutChart({ transactions }: Props) {
  const incomes = transactions.filter(t => t.type === "income");
  const grouped = incomes.reduce<Record<string, number>>((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.value;
    return acc;
  }, {});

  const data = Object.entries(grouped)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  if (!data.length) {
    return (
      <Card className="border-border/50 bg-card">
        <CardHeader><CardTitle className="text-sm font-medium">Income by Category</CardTitle></CardHeader>
        <CardContent className="flex h-[250px] items-center justify-center text-muted-foreground">No data</CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader><CardTitle className="text-sm font-medium">Income by Category</CardTitle></CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: number) => formatCurrency(v)}
                contentStyle={{
                  backgroundColor: "hsl(224, 28%, 10%)",
                  border: "1px solid hsl(220, 20%, 18%)",
                  borderRadius: "8px",
                  color: "hsl(210, 40%, 96%)",
                }}
                itemStyle={{ color: "hsl(210, 40%, 96%)" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 flex flex-wrap gap-3">
          {data.map((d, i) => (
            <div key={d.name} className="flex items-center gap-1.5 text-xs">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span className="text-muted-foreground">{d.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
