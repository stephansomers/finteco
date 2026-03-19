import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/lib/types";
import { formatCurrency } from "@/lib/csv-utils";
import { useI18n } from "@/lib/i18n";

const COLORS = [
  "hsl(210, 100%, 52%)", "hsl(160, 84%, 39%)", "hsl(0, 72%, 51%)",
  "hsl(47, 100%, 50%)", "hsl(280, 65%, 60%)", "hsl(30, 100%, 50%)",
  "hsl(190, 90%, 50%)", "hsl(340, 80%, 55%)",
];

interface Props {
  transactions: Transaction[];
}

export function ExpenseDonutChart({ transactions }: Props) {
  const { t } = useI18n();
  const expenses = transactions.filter(t => t.type === "expense");
  const grouped = expenses.reduce<Record<string, number>>((acc, t) => {
    const key = t.subcategory || t.category;
    acc[key] = (acc[key] || 0) + t.value;
    return acc;
  }, {});

  const data = Object.entries(grouped)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  if (!data.length) {
    return (
      <Card className="border-border/50 bg-card">
        <CardHeader><CardTitle className="text-sm font-medium">{t("expense.byCategory")}</CardTitle></CardHeader>
        <CardContent className="flex h-[250px] items-center justify-center text-muted-foreground">{t("chart.noData")}</CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader><CardTitle className="text-sm font-medium">{t("expense.byCategory")}</CardTitle></CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ backgroundColor: "hsl(224, 28%, 10%)", border: "1px solid hsl(220, 20%, 18%)", borderRadius: "8px", color: "hsl(210, 40%, 96%)" }} itemStyle={{ color: "hsl(210, 40%, 96%)" }} />
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
