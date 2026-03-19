import { RefObject } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3, DollarSign, CreditCard, CalendarDays, TrendingUp,
  FileSpreadsheet, Upload, Download, ArrowRight, Eye, PieChart,
  Layers, ShieldCheck, Table2,
} from "lucide-react";
import { downloadExcelTemplate } from "@/lib/excel-utils";
import { useI18n } from "@/lib/i18n";

interface Props {
  onNavigate: (tab: string) => void;
  excelFileRef: RefObject<HTMLInputElement>;
  onExcelUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const sheetSpecs = [
  {
    name: "Transactions",
    columns: ["date", "description", "category", "subcategory", "value"],
    example: "15/01/2025 | Salary | Income | Salary | 5000",
  },
  {
    name: "Dividends",
    columns: ["date", "asset", "category", "value"],
    example: "15/01/2025 | PETR4 | Stocks | 320",
  },
  {
    name: "Assets",
    columns: ["date", "institution", "value"],
    example: "31/01/2025 | Bank A | 15000",
  },
  {
    name: "Key People",
    columns: ["name"],
    example: "Gabriel",
  },
];

export function TutorialTab({ onNavigate, excelFileRef, onExcelUpload }: Props) {
  const { t } = useI18n();

  const features = [
    { icon: BarChart3, title: t("tutorial.feat.dashboard"), desc: t("tutorial.feat.dashboardDesc") },
    { icon: DollarSign, title: t("tutorial.feat.income"), desc: t("tutorial.feat.incomeDesc") },
    { icon: CreditCard, title: t("tutorial.feat.expenses"), desc: t("tutorial.feat.expensesDesc") },
    { icon: CalendarDays, title: t("tutorial.feat.yearFilter"), desc: t("tutorial.feat.yearFilterDesc") },
    { icon: TrendingUp, title: t("tutorial.feat.consolidated"), desc: t("tutorial.feat.consolidatedDesc") },
    { icon: FileSpreadsheet, title: t("tutorial.feat.import"), desc: t("tutorial.feat.importDesc") },
  ];

  const steps = [
    { number: "01", title: t("tutorial.step1Title"), desc: t("tutorial.step1Desc") },
    { number: "02", title: t("tutorial.step2Title"), desc: t("tutorial.step2Desc") },
    { number: "03", title: t("tutorial.step3Title"), desc: t("tutorial.step3Desc") },
  ];

  const overviewItems = [
    t("tutorial.overviewItem1"),
    t("tutorial.overviewItem2"),
    t("tutorial.overviewItem3"),
    t("tutorial.overviewItem4"),
  ];

  return (
    <div className="space-y-10">
      <div className="text-center space-y-2 py-6">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("tutorial.heading")}{" "}
          <span className="text-primary">{t("tutorial.headingHighlight")}</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("tutorial.subtitle")}</p>
      </div>

      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-5 sm:p-6 flex items-start gap-4">
          <div className="rounded-lg bg-primary/10 p-3 shrink-0">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-base">{t("tutorial.privacyTitle")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("tutorial.privacyDesc1")}{" "}
              <strong className="text-foreground">{t("tutorial.privacyLocal")}</strong>
              {t("tutorial.privacyDesc2")}{" "}
              <strong className="text-foreground">{t("tutorial.privacyNever")}</strong>
              {t("tutorial.privacyDesc3")}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-primary/10 p-3 hidden sm:block">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">{t("tutorial.overviewTitle")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("tutorial.overviewDesc")}</p>
              <ul className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
                {overviewItems.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" /> {t("tutorial.stepsTitle")}
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.number} className="border-border/50 bg-card relative overflow-hidden">
              <div className="absolute top-3 right-4 text-5xl font-black text-primary/10 leading-none select-none">{step.number}</div>
              <CardContent className="p-6 space-y-2">
                <h4 className="font-semibold text-base">{step.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <PieChart className="h-5 w-5 text-primary" /> {t("tutorial.featuresTitle")}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="border-border/50 bg-card hover:border-primary/30 transition-colors">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2.5 shrink-0">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{f.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{f.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Table2 className="h-5 w-5 text-primary" /> {t("tutorial.templateTitle")}
        </h3>
        <Card className="border-border/50 bg-card">
          <CardContent className="p-6 sm:p-8 space-y-5">
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("tutorial.templateDesc1")}
              <strong className="text-foreground">{t("tutorial.templateDesc2")}</strong>
              {t("tutorial.templateDesc3")}
              <strong className="text-foreground">{t("tutorial.templateDesc4")}</strong>
              {t("tutorial.templateDesc5")}
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {sheetSpecs.map((spec) => (
                <Card key={spec.name} className="border-border/30 bg-secondary/50">
                  <CardContent className="p-4 space-y-2">
                    <h4 className="font-semibold text-sm text-primary">{spec.name}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {spec.columns.map((col) => (
                        <span key={col} className="rounded bg-primary/10 px-2 py-0.5 text-xs font-mono text-primary">{col}</span>
                      ))}
                    </div>
                    <p className="text-[11px] text-muted-foreground font-mono break-all">{spec.example}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5 text-primary" /> {t("tutorial.importTitle")}
        </h3>
        <Card className="border-border/50 bg-card">
          <CardContent className="p-6 sm:p-8 space-y-6">
            <p className="text-muted-foreground text-sm leading-relaxed">{t("tutorial.importDesc")}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <input ref={excelFileRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={onExcelUpload} />
              <Button onClick={downloadExcelTemplate} variant="outline" size="lg" className="border-border/50 w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" /> {t("tutorial.downloadTemplate")}
              </Button>
              <Button onClick={() => excelFileRef.current?.click()} size="lg" className="w-full sm:w-auto">
                <Upload className="mr-2 h-4 w-4" /> {t("tutorial.uploadFile")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center py-8">
        <Button size="lg" className="text-base px-8 py-6 h-auto" onClick={() => onNavigate("transactions")}>
          {t("tutorial.cta")} <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
