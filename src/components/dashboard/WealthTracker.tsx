import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { ChevronDown } from "lucide-react";
import { AssetSnapshot } from "@/lib/types";
import { formatCurrency, formatNumber } from "@/lib/csv-utils";

const COLORS = [
  "hsl(210, 100%, 52%)", "hsl(160, 84%, 39%)", "hsl(47, 100%, 50%)",
  "hsl(280, 65%, 60%)", "hsl(0, 72%, 51%)", "hsl(30, 100%, 50%)",
];

interface Props {
  assets: AssetSnapshot[];
}

export function WealthTracker({ assets }: Props) {
  const [tableOpen, setTableOpen] = useState(true);
  const institutions = [...new Set(assets.map(a => a.institution))];
  const periods = [...new Set(assets.map(a => a.date))].sort();

  const getValue = (inst: string, period: string) =>
    assets.find(a => a.institution === inst && a.date === period)?.value ?? null;

  const getVariation = (inst: string, periodIdx: number) => {
    if (periodIdx === 0) return null;
    const curr = getValue(inst, periods[periodIdx]);
    const prev = getValue(inst, periods[periodIdx - 1]);
    if (curr === null || prev === null || prev === 0) return null;
    return ((curr - prev) / prev) * 100;
  };

  const wealthData = periods.map(p => {
    const total = institutions.reduce((s, inst) => s + (getValue(inst, p) ?? 0), 0);
    const entry: Record<string, any> = { period: p, total };
    institutions.forEach(inst => { entry[inst] = getValue(inst, p) ?? 0; });
    return entry;
  });

  const tooltipStyle = {
    backgroundColor: "hsl(224, 28%, 10%)",
    border: "1px solid hsl(220, 20%, 18%)",
    borderRadius: "8px",
    color: "hsl(210, 40%, 96%)",
  };

  return (
    <div className="space-y-6">
      {/* Assets Table - Collapsible */}
      <Card className="border-border/50 bg-card">
        <Collapsible open={tableOpen} onOpenChange={setTableOpen}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Assets by Institution</CardTitle>
            <CollapsibleTrigger className="rounded-md p-1 hover:bg-secondary">
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${tableOpen ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="overflow-x-auto scrollbar-thin">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead className="sticky left-0 bg-card">Institution</TableHead>
                    {periods.map(p => (
                      <TableHead key={p} className="text-right">{p}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {institutions.map(inst => (
                    <TableRow key={inst} className="border-border/50">
                      <TableCell className="sticky left-0 bg-card font-medium">{inst}</TableCell>
                      {periods.map((p, pi) => {
                        const val = getValue(inst, p);
                        const variation = getVariation(inst, pi);
                        return (
                          <TableCell key={p} className="text-right">
                            <div>{val !== null ? formatNumber(val) : "—"}</div>
                            {variation !== null && (
                              <div className={`text-xs ${variation >= 0 ? "text-chart-income" : "text-chart-expense"}`}>
                                {variation >= 0 ? "+" : ""}{variation.toFixed(1)}%
                              </div>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Charts stacked vertically */}
      <Card className="border-border/50 bg-card">
        <CardHeader><CardTitle className="text-sm font-medium">Total Wealth Evolution</CardTitle></CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={wealthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 18%)" />
                <XAxis dataKey="period" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="total" stroke="hsl(160, 84%, 39%)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card">
        <CardHeader><CardTitle className="text-sm font-medium">Wealth by Institution</CardTitle></CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={wealthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 18%)" />
                <XAxis dataKey="period" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={tooltipStyle} />
                {institutions.map((inst, i) => (
                  <Area key={inst} type="monotone" dataKey={inst} stackId="1" fill={COLORS[i % COLORS.length]} stroke={COLORS[i % COLORS.length]} fillOpacity={0.6} />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            {institutions.map((inst, i) => (
              <div key={inst} className="flex items-center gap-1.5 text-xs">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-muted-foreground">{inst}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
