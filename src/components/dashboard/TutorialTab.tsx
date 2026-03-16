import { RefObject } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3, DollarSign, CreditCard, CalendarDays, TrendingUp,
  FileSpreadsheet, Upload, Download, ArrowRight, Eye, PieChart, Layers
} from "lucide-react";
import { downloadTransactionTemplate, downloadAssetTemplate, downloadDividendTemplate } from "@/lib/csv-utils";

interface Props {
  onNavigate: (tab: string) => void;
  txFileRef: RefObject<HTMLInputElement>;
  assetFileRef: RefObject<HTMLInputElement>;
  divFileRef: RefObject<HTMLInputElement>;
  onTxUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAssetUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDivUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const features = [
  { icon: BarChart3, title: "Dashboard", desc: "Monthly financial summary with KPIs and interactive charts." },
  { icon: DollarSign, title: "Income", desc: "Track all your money inflows." },
  { icon: CreditCard, title: "Expenses", desc: "Detailed spending control by category." },
  { icon: CalendarDays, title: "Year Filter", desc: "Navigate between periods and compare years." },
  { icon: TrendingUp, title: "Consolidated", desc: "Income and expense analysis by category." },
  { icon: FileSpreadsheet, title: "Import / Export", desc: "Use CSV templates to feed the system." },
];

const steps = [
  {
    number: "01",
    title: "Import your data",
    desc: "Download the CSV templates, fill them with your transactions, dividends, or assets, and upload them in the section below.",
  },
  {
    number: "02",
    title: "View monthly consolidated",
    desc: "The dashboard automatically displays total income, total expenses, and the monthly balance.",
  },
  {
    number: "03",
    title: "Analyze your data",
    desc: "Filter by year, view consolidated reports by category, and compare periods to understand your financial progress.",
  },
];

const imports = [
  { label: "Transactions", templateFn: downloadTransactionTemplate, fileRef: "tx" as const },
  { label: "Dividends", templateFn: downloadDividendTemplate, fileRef: "div" as const },
  { label: "Assets", templateFn: downloadAssetTemplate, fileRef: "asset" as const },
];

export function TutorialTab({ onNavigate, txFileRef, assetFileRef, divFileRef, onTxUpload, onAssetUpload, onDivUpload }: Props) {
  const fileRefs = { tx: txFileRef, div: divFileRef, asset: assetFileRef };
  const uploadHandlers = { tx: onTxUpload, div: onDivUpload, asset: onAssetUpload };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center space-y-2 py-6">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          How to Use the <span className="text-primary">Financial Dashboard</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          A quick guide to organizing your finances
        </p>
      </div>

      {/* Overview */}
      <Card className="border-border/50 bg-card">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-primary/10 p-3 hidden sm:block">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Overview</h3>
              <p className="text-muted-foreground leading-relaxed">
                This system gives you full control over your personal finances.
                With it, you can:
              </p>
              <ul className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
                {[
                  "Track income and expenses",
                  "View monthly consolidated reports",
                  "Analyze financial progress",
                  "Monitor dividends and wealth",
                ].map(item => (
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

      {/* Step by step */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" /> Step by Step
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map(step => (
            <Card key={step.number} className="border-border/50 bg-card relative overflow-hidden">
              <div className="absolute top-3 right-4 text-5xl font-black text-primary/10 leading-none select-none">
                {step.number}
              </div>
              <CardContent className="p-6 space-y-2">
                <h4 className="font-semibold text-base">{step.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <PieChart className="h-5 w-5 text-primary" /> System Features
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(f => (
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

      {/* Data Import */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5 text-primary" /> CSV Data Import
        </h3>
        <Card className="border-border/50 bg-card">
          <CardContent className="p-6 sm:p-8 space-y-6">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Use the standardized CSV templates to import your financial data.
              Download the template, fill it with your data, and upload it.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {imports.map(imp => (
                <Card key={imp.label} className="border-border/30 bg-secondary/50">
                  <CardContent className="p-4 space-y-3">
                    <h4 className="font-semibold text-sm text-center">{imp.label}</h4>
                    <div className="flex gap-2">
                      <input
                        ref={fileRefs[imp.fileRef]}
                        type="file"
                        accept=".csv"
                        className="hidden"
                        onChange={uploadHandlers[imp.fileRef]}
                      />
                      <Button
                        onClick={imp.templateFn}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-border/50 text-xs"
                      >
                        <Download className="mr-1.5 h-3.5 w-3.5" /> Template
                      </Button>
                      <Button
                        onClick={() => fileRefs[imp.fileRef].current?.click()}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-border/50 text-xs"
                      >
                        <Upload className="mr-1.5 h-3.5 w-3.5" /> Upload
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA */}
      <div className="text-center py-8">
        <Button
          size="lg"
          className="text-base px-8 py-6 h-auto"
          onClick={() => onNavigate("transactions")}
        >
          Start using the system <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
