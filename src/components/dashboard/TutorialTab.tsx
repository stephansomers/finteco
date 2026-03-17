import { RefObject } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  DollarSign,
  CreditCard,
  CalendarDays,
  TrendingUp,
  FileSpreadsheet,
  Upload,
  Download,
  ArrowRight,
  Eye,
  PieChart,
  Layers,
  ShieldCheck,
  Table2,
} from "lucide-react";
import { downloadExcelTemplate } from "@/lib/excel-utils";

interface Props {
  onNavigate: (tab: string) => void;
  excelFileRef: RefObject<HTMLInputElement>;
  onExcelUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const features = [
  {
    icon: BarChart3,
    title: "Dashboard",
    desc: "Monthly financial summary with KPIs and interactive charts.",
  },
  { icon: DollarSign, title: "Income", desc: "Track all your money inflows." },
  {
    icon: CreditCard,
    title: "Expenses",
    desc: "Detailed spending control by category.",
  },
  {
    icon: CalendarDays,
    title: "Year Filter",
    desc: "Navigate between periods and compare years.",
  },
  {
    icon: TrendingUp,
    title: "Consolidated",
    desc: "Income and expense analysis by category.",
  },
  {
    icon: FileSpreadsheet,
    title: "Import / Export",
    desc: "Use a single Excel template to feed the system.",
  },
];

const steps = [
  {
    number: "01",
    title: "Download the template",
    desc: "Download the Excel template (.xlsx) which contains 3 sheets: Transactions, Dividends, and Assets.",
  },
  {
    number: "02",
    title: "Fill in your data",
    desc: "Open the file in Excel or Google Sheets. Fill each sheet with your financial data following the column headers.",
  },
  {
    number: "03",
    title: "Upload & analyze",
    desc: "Upload the filled Excel file below. The dashboard will instantly show your KPIs, charts, and consolidated reports.",
  },
];

const sheetSpecs = [
  {
    name: "Transactions",
    columns: [
      "date",
      "description",
      "category",
      "subcategory",
      "type",
      "value",
    ],
    example: "15/01/2025 | Salary | Income | Salary | income | 5000",
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
];

export function TutorialTab({
  onNavigate,
  excelFileRef,
  onExcelUpload,
}: Props) {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center space-y-2 py-6">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          How to Use the{" "}
          <span className="text-primary">Financial Dashboard</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          A quick guide to organizing your finances
        </p>
      </div>

      {/* Privacy Notice */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-5 sm:p-6 flex items-start gap-4">
          <div className="rounded-lg bg-primary/10 p-3 shrink-0">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-base">
              Your data stays with you
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All data processing happens{" "}
              <strong className="text-foreground">
                locally in your browser
              </strong>
              . Your financial information is{" "}
              <strong className="text-foreground">
                never sent to any server
              </strong>
              . Nothing is stored remotely - when you close the tab, the data is
              gone. Full privacy, zero risk.
            </p>
          </div>
        </CardContent>
      </Card>

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
                ].map((item) => (
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
          {steps.map((step) => (
            <Card
              key={step.number}
              className="border-border/50 bg-card relative overflow-hidden"
            >
              <div className="absolute top-3 right-4 text-5xl font-black text-primary/10 leading-none select-none">
                {step.number}
              </div>
              <CardContent className="p-6 space-y-2">
                <h4 className="font-semibold text-base">{step.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
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
          {features.map((f) => (
            <Card
              key={f.title}
              className="border-border/50 bg-card hover:border-primary/30 transition-colors"
            >
              <CardContent className="p-5 flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2.5 shrink-0">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{f.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Excel Template Structure */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Table2 className="h-5 w-5 text-primary" /> Excel Template Structure
        </h3>
        <Card className="border-border/50 bg-card">
          <CardContent className="p-6 sm:p-8 space-y-5">
            <p className="text-muted-foreground text-sm leading-relaxed">
              The template is a single{" "}
              <strong className="text-foreground">.xlsx file</strong> with
              <strong className="text-foreground"> 3 sheets</strong>. Each sheet
              has specific columns that must be kept as headers in the first
              row:
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {sheetSpecs.map((spec) => (
                <Card
                  key={spec.name}
                  className="border-border/30 bg-secondary/50"
                >
                  <CardContent className="p-4 space-y-2">
                    <h4 className="font-semibold text-sm text-primary">
                      {spec.name}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {spec.columns.map((col) => (
                        <span
                          key={col}
                          className="rounded bg-primary/10 px-2 py-0.5 text-xs font-mono text-primary"
                        >
                          {col}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] text-muted-foreground font-mono break-all">
                      {spec.example}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Import */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5 text-primary" /> Import Data
        </h3>
        <Card className="border-border/50 bg-card">
          <CardContent className="p-6 sm:p-8 space-y-6">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Download the Excel template, fill it with your financial data
              across the 3 sheets, then upload it here. All data is processed
              locally in your browser.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <input
                ref={excelFileRef}
                type="file"
                accept=".xlsx,.xls"
                className="hidden"
                onChange={onExcelUpload}
              />
              <Button
                onClick={downloadExcelTemplate}
                variant="outline"
                size="lg"
                className="border-border/50 w-full sm:w-auto"
              >
                <Download className="mr-2 h-4 w-4" /> Download Template
              </Button>
              <Button
                onClick={() => excelFileRef.current?.click()}
                size="lg"
                className="w-full sm:w-auto"
              >
                <Upload className="mr-2 h-4 w-4" /> Upload Excel File
              </Button>
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
