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
  { icon: BarChart3, title: "Dashboard", desc: "Resumo financeiro do mês com KPIs e gráficos interativos." },
  { icon: DollarSign, title: "Receitas", desc: "Controle de todas as entradas de dinheiro." },
  { icon: CreditCard, title: "Despesas", desc: "Controle detalhado dos gastos por categoria." },
  { icon: CalendarDays, title: "Filtro por Ano", desc: "Permite navegar entre períodos e comparar anos." },
  { icon: TrendingUp, title: "Consolidados", desc: "Análise de despesas e receitas por categoria." },
  { icon: FileSpreadsheet, title: "Importação / Exportação", desc: "Utilize templates CSV para alimentar o sistema." },
];

const steps = [
  {
    number: "01",
    title: "Importe seus dados",
    desc: "Baixe os templates CSV, preencha com suas transações, dividendos ou ativos, e faça o upload na seção abaixo.",
  },
  {
    number: "02",
    title: "Visualize o consolidado mensal",
    desc: "O dashboard mostra automaticamente o total de receitas, total de despesas e o saldo do mês.",
  },
  {
    number: "03",
    title: "Analise seus dados",
    desc: "Filtre por ano, visualize consolidados por categoria e compare períodos para entender sua evolução financeira.",
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
          Como usar o <span className="text-primary">Dashboard Financeiro</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Guia rápido para organizar suas finanças
        </p>
      </div>

      {/* Visão geral */}
      <Card className="border-border/50 bg-card">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-primary/10 p-3 hidden sm:block">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Visão Geral</h3>
              <p className="text-muted-foreground leading-relaxed">
                Este sistema permite que você tenha controle total das suas finanças pessoais.
                Com ele, você pode:
              </p>
              <ul className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
                {[
                  "Registrar receitas e despesas",
                  "Visualizar consolidados mensais",
                  "Analisar evolução financeira",
                  "Acompanhar dividendos e patrimônio",
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

      {/* Passo a passo */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" /> Passo a Passo
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

      {/* Funcionalidades */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <PieChart className="h-5 w-5 text-primary" /> Funcionalidades do Sistema
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

      {/* Importação de dados */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5 text-primary" /> Importação de Dados via CSV
        </h3>
        <Card className="border-border/50 bg-card">
          <CardContent className="p-6 sm:p-8 space-y-6">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Utilize os templates CSV padronizados para importar seus dados financeiros.
              Baixe o template, preencha com seus dados e faça o upload.
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
          Começar a usar o sistema <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
