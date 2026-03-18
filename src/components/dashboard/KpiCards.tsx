import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingDown, Plane, Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/csv-utils";
import { useI18n } from "@/lib/i18n";

interface KpiCardsProps {
  revenue: number;
  expenses: number;
  travel: number;
  balance: number;
}

export function KpiCards({ revenue, expenses, travel, balance }: KpiCardsProps) {
  const { t } = useI18n();
  const kpiConfig = [
    { key: "revenue" as const, label: t("kpi.revenue"), icon: DollarSign, colorClass: "text-chart-income" },
    { key: "expenses" as const, label: t("kpi.expenses"), icon: TrendingDown, colorClass: "text-chart-expense" },
    { key: "travel" as const, label: t("kpi.travel"), icon: Plane, colorClass: "text-chart-travel" },
    { key: "balance" as const, label: t("kpi.balance"), icon: Wallet, colorClass: "text-chart-balance" },
  ];
  const values = { revenue, expenses, travel, balance };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpiConfig.map(({ key, label, icon: Icon, colorClass }) => (
        <Card key={key} className="border-border/50 bg-card">
          <CardContent className="flex items-center gap-4 p-5">
            <div className={`rounded-lg bg-secondary p-3 ${colorClass}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className={`text-xl font-bold ${colorClass}`}>
                {formatCurrency(values[key])}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
