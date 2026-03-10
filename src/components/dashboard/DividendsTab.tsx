import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { DividendEntry } from "@/lib/types";
import { formatCurrency, getMonthName } from "@/lib/csv-utils";

const COLORS = [
  "hsl(210, 100%, 52%)", "hsl(160, 84%, 39%)", "hsl(47, 100%, 50%)",
  "hsl(280, 65%, 60%)", "hsl(0, 72%, 51%)", "hsl(30, 100%, 50%)",
  "hsl(190, 90%, 50%)", "hsl(340, 80%, 55%)",
];

interface Props {
  dividends: DividendEntry[];
  year: number;
}

export function DividendsTab({ dividends, year }: Props) {
  const yearDividends = useMemo(() =>
    dividends.filter(d => new Date(d.date).getFullYear() === year),
    [dividends, year]);

  const totalDividends = yearDividends.reduce((s, d) => s + d.value, 0);

  // Monthly growth data
  const growthData = useMemo(() => {
    const monthly: Record<number, number> = {};
    yearDividends.forEach(d => {
      const month = new Date(d.date).getMonth();
      monthly[month] = (monthly[month] || 0) + d.value;
    });
    let cumulative = 0;
    return Array.from({ length: 12 }, (_, i) => {
      cumulative += monthly[i] || 0;
      return { month: getMonthName(i), value: monthly[i] || 0, cumulative };
    }).filter(d => d.cumulative > 0 || d.value > 0);
  }, [yearDividends]);

  // Allocation by asset
  const allocationByAsset = useMemo(() => {
    const map: Record<string, number> = {};
    yearDividends.forEach(d => {
      map[d.asset] = (map[d.asset] || 0) + d.value;
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [yearDividends]);

  // Allocation by category
  const allocationByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    yearDividends.forEach(d => {
      map[d.category] = (map[d.category] || 0) + d.value;
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [yearDividends]);

  const tooltipStyle = {
    backgroundColor: "hsl(224, 28%, 10%)",
    border: "1px solid hsl(220, 20%, 18%)",
    borderRadius: "8px",
    color: "hsl(210, 40%, 96%)",
  };

  return (
    <div className="space-y-6">
      {/* KPI */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-border/50 bg-card">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Dividends ({year})</p>
            <p className="text-2xl font-bold text-chart-income">{formatCurrency(totalDividends)}</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Unique Assets</p>
            <p className="text-2xl font-bold text-primary">{allocationByAsset.length}</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Monthly Average</p>
            <p className="text-2xl font-bold text-chart-balance">
              {formatCurrency(growthData.length > 0 ? totalDividends / growthData.length : 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Dividend Growth Chart */}
      <Card className="border-border/50 bg-card">
        <CardHeader><CardTitle className="text-sm font-medium">Dividend Growth — {year}</CardTitle></CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 18%)" />
                <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} tickFormatter={v => `${(v / 1000).toFixed(1)}k`} />
                <Tooltip
                  formatter={(v: number, name: string) => [formatCurrency(v), name === "cumulative" ? "Total" : "Monthly"]}
                  contentStyle={tooltipStyle}
                />
                <Line type="monotone" dataKey="value" name="Monthly" stroke="hsl(210, 100%, 52%)" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="cumulative" name="Cumulative" stroke="hsl(160, 84%, 39%)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Allocation Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50 bg-card">
          <CardHeader><CardTitle className="text-sm font-medium">Allocation by Asset</CardTitle></CardHeader>
          <CardContent>
            {allocationByAsset.length === 0 ? (
              <div className="flex h-[250px] items-center justify-center text-muted-foreground">No data</div>
            ) : (
              <>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={allocationByAsset} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                        {allocationByAsset.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={tooltipStyle} itemStyle={{ color: "hsl(210, 40%, 96%)" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 flex flex-wrap gap-3">
                  {allocationByAsset.map((d, i) => (
                    <div key={d.name} className="flex items-center gap-1.5 text-xs">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-muted-foreground">{d.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card">
          <CardHeader><CardTitle className="text-sm font-medium">Allocation by Category</CardTitle></CardHeader>
          <CardContent>
            {allocationByCategory.length === 0 ? (
              <div className="flex h-[250px] items-center justify-center text-muted-foreground">No data</div>
            ) : (
              <>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={allocationByCategory} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                        {allocationByCategory.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={tooltipStyle} itemStyle={{ color: "hsl(210, 40%, 96%)" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 flex flex-wrap gap-3">
                  {allocationByCategory.map((d, i) => (
                    <div key={d.name} className="flex items-center gap-1.5 text-xs">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-muted-foreground">{d.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
