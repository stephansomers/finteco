import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "pt";

const translations = {
  // Header
  "app.name.prefix": { en: "Fin", pt: "Fin" },
  "app.name.suffix": { en: "Dashboard", pt: "Dashboard" },

  // Tabs
  "tab.tutorial": { en: "How to Use", pt: "Como Usar" },
  "tab.transactions": { en: "Transactions", pt: "Transações" },
  "tab.loans": { en: "Loans", pt: "Empréstimos" },
  "tab.dividends": { en: "Dividends", pt: "Dividendos" },
  "tab.wealth": { en: "Wealth Tracker", pt: "Patrimônio" },

  // Year filter
  "filter.allYears": { en: "All Years", pt: "Todos os Anos" },
  "filter.allMonths": { en: "All Months", pt: "Todos os Meses" },

  // KPI Cards
  "kpi.revenue": { en: "Revenue", pt: "Receita" },
  "kpi.expenses": { en: "Expenses", pt: "Despesas" },
  "kpi.travel": { en: "Travel", pt: "Viagens" },
  "kpi.balance": { en: "Balance", pt: "Saldo" },

  // Transactions Table
  "tx.title": { en: "Transactions", pt: "Transações" },
  "tx.date": { en: "Date", pt: "Data" },
  "tx.description": { en: "Description", pt: "Descrição" },
  "tx.category": { en: "Category", pt: "Categoria" },
  "tx.subcategory": { en: "Subcategory", pt: "Subcategoria" },
  "tx.value": { en: "Value", pt: "Valor" },
  "tx.noData": { en: "No transactions", pt: "Sem transações" },

  // Balance Trend
  "balance.title": { en: "Balance Trend", pt: "Tendência do Saldo" },

  // Donut Charts
  "expense.byCategory": { en: "Expenses by Category", pt: "Despesas por Categoria" },
  "income.byCategory": { en: "Income by Category", pt: "Receitas por Categoria" },
  "chart.noData": { en: "No data", pt: "Sem dados" },

  // Yearly Consolidated
  "consolidated.title": { en: "Yearly Consolidated", pt: "Consolidado Anual" },
  "consolidated.breakdown": { en: "View Breakdown by Subcategory", pt: "Ver Detalhamento por Subcategoria" },
  "consolidated.subcategory": { en: "Subcategory", pt: "Subcategoria" },
  "consolidated.total": { en: "Total", pt: "Total" },

  // Loans Tab
  "loans.totalLent": { en: "Total Lent", pt: "Total Emprestado" },
  "loans.totalRepaid": { en: "Total Repaid", pt: "Total Devolvido" },
  "loans.outstanding": { en: "Outstanding Balance", pt: "Saldo Pendente" },
  "loans.monthlyConsolidated": { en: "Monthly Consolidated", pt: "Consolidado Mensal" },
  "loans.byPerson": { en: "Consolidated by Person", pt: "Consolidado por Pessoa" },
  "loans.person": { en: "Person", pt: "Pessoa" },
  "loans.lent": { en: "Lent", pt: "Emprestado" },
  "loans.repaid": { en: "Repaid", pt: "Devolvido" },
  "loans.balance": { en: "Balance", pt: "Saldo" },
  "loans.chartTitle": { en: "Loans by Person", pt: "Empréstimos por Pessoa" },
  "loans.txTitle": { en: "Loan Transactions", pt: "Transações de Empréstimo" },
  "loans.noData": { en: "No loan data", pt: "Sem dados de empréstimo" },
  "loans.noTx": { en: "No loan transactions", pt: "Sem transações de empréstimo" },
  "loans.total": { en: "Total", pt: "Total" },
  "loans.category": { en: "Category", pt: "Categoria" },
  "loans.TOTAL": { en: "TOTAL", pt: "TOTAL" },

  // Dividends Tab
  "div.total": { en: "Total Dividends", pt: "Total de Dividendos" },
  "div.uniqueAssets": { en: "Unique Assets", pt: "Ativos Únicos" },
  "div.monthlyAvg": { en: "Monthly Average", pt: "Média Mensal" },
  "div.growth": { en: "Dividend Growth", pt: "Crescimento de Dividendos" },
  "div.byAsset": { en: "Dividends by Asset", pt: "Dividendos por Ativo" },
  "div.byCategory": { en: "Dividends per Category", pt: "Dividendos por Categoria" },
  "div.monthly": { en: "Monthly", pt: "Mensal" },
  "div.cumulative": { en: "Cumulative", pt: "Acumulado" },

  // Wealth Tracker
  "wealth.assetsByInst": { en: "Assets by Institution", pt: "Ativos por Instituição" },
  "wealth.institution": { en: "Institution", pt: "Instituição" },
  "wealth.totalEvolution": { en: "Total Wealth Evolution", pt: "Evolução do Patrimônio Total" },
  "wealth.byInstitution": { en: "Wealth by Institution", pt: "Patrimônio por Instituição" },
  "wealth.total": { en: "Total", pt: "Total" },

  // Tutorial Tab
  "tutorial.heading": { en: "How to Use the", pt: "Como Usar o" },
  "tutorial.headingHighlight": { en: "Financial Dashboard", pt: "Dashboard Financeiro" },
  "tutorial.subtitle": { en: "A quick guide to organizing your finances", pt: "Um guia rápido para organizar suas finanças" },
  "tutorial.privacyTitle": { en: "Your data stays with you", pt: "Seus dados ficam com você" },
  "tutorial.privacyDesc1": { en: "All data processing happens", pt: "Todo o processamento de dados acontece" },
  "tutorial.privacyLocal": { en: "locally in your browser", pt: "localmente no seu navegador" },
  "tutorial.privacyDesc2": { en: ". Your financial information is", pt: ". Suas informações financeiras" },
  "tutorial.privacyNever": { en: "never sent to any server", pt: "nunca são enviadas a nenhum servidor" },
  "tutorial.privacyDesc3": { en: ". Nothing is stored remotely - when you close the tab, the data is gone. Full privacy, zero risk.", pt: ". Nada é armazenado remotamente - ao fechar a aba, os dados são apagados. Privacidade total, risco zero." },
  "tutorial.overviewTitle": { en: "Overview", pt: "Visão Geral" },
  "tutorial.overviewDesc": { en: "This system gives you full control over your personal finances. With it, you can:", pt: "Este sistema dá controle total sobre suas finanças pessoais. Com ele, você pode:" },
  "tutorial.overviewItem1": { en: "Track income and expenses", pt: "Acompanhar receitas e despesas" },
  "tutorial.overviewItem2": { en: "View monthly consolidated reports", pt: "Visualizar relatórios mensais consolidados" },
  "tutorial.overviewItem3": { en: "Analyze financial progress", pt: "Analisar progresso financeiro" },
  "tutorial.overviewItem4": { en: "Monitor dividends and wealth", pt: "Monitorar dividendos e patrimônio" },
  "tutorial.stepsTitle": { en: "Step by Step", pt: "Passo a Passo" },
  "tutorial.step1Title": { en: "Download the template", pt: "Baixe o template" },
  "tutorial.step1Desc": { en: "Download the Excel template (.xlsx) which contains 3 sheets: Transactions, Dividends, and Assets.", pt: "Baixe o template Excel (.xlsx) que contém 3 abas: Transactions, Dividends e Assets." },
  "tutorial.step2Title": { en: "Fill in your data", pt: "Preencha seus dados" },
  "tutorial.step2Desc": { en: "Open the file in Excel or Google Sheets. Fill each sheet with your financial data following the column headers.", pt: "Abra o arquivo no Excel ou Google Sheets. Preencha cada aba com seus dados financeiros seguindo os cabeçalhos das colunas." },
  "tutorial.step3Title": { en: "Upload & analyze", pt: "Faça upload e analise" },
  "tutorial.step3Desc": { en: "Upload the filled Excel file below. The dashboard will instantly show your KPIs, charts, and consolidated reports.", pt: "Faça upload do arquivo Excel preenchido abaixo. O dashboard mostrará instantaneamente seus KPIs, gráficos e relatórios consolidados." },
  "tutorial.featuresTitle": { en: "System Features", pt: "Funcionalidades do Sistema" },
  "tutorial.feat.dashboard": { en: "Dashboard", pt: "Dashboard" },
  "tutorial.feat.dashboardDesc": { en: "Monthly financial summary with KPIs and interactive charts.", pt: "Resumo financeiro mensal com KPIs e gráficos interativos." },
  "tutorial.feat.income": { en: "Income", pt: "Receitas" },
  "tutorial.feat.incomeDesc": { en: "Track all your money inflows.", pt: "Acompanhe todas as suas entradas de dinheiro." },
  "tutorial.feat.expenses": { en: "Expenses", pt: "Despesas" },
  "tutorial.feat.expensesDesc": { en: "Detailed spending control by category.", pt: "Controle detalhado de gastos por categoria." },
  "tutorial.feat.yearFilter": { en: "Year Filter", pt: "Filtro por Ano" },
  "tutorial.feat.yearFilterDesc": { en: "Navigate between periods and compare years.", pt: "Navegue entre períodos e compare anos." },
  "tutorial.feat.consolidated": { en: "Consolidated", pt: "Consolidado" },
  "tutorial.feat.consolidatedDesc": { en: "Income and expense analysis by category.", pt: "Análise de receitas e despesas por categoria." },
  "tutorial.feat.import": { en: "Import / Export", pt: "Importar / Exportar" },
  "tutorial.feat.importDesc": { en: "Use a single Excel template to feed the system.", pt: "Use um único template Excel para alimentar o sistema." },
  "tutorial.templateTitle": { en: "Excel Template Structure", pt: "Estrutura do Template Excel" },
  "tutorial.templateDesc1": { en: "The template is a single", pt: "O template é um único arquivo" },
  "tutorial.templateDesc2": { en: ".xlsx file", pt: ".xlsx" },
  "tutorial.templateDesc3": { en: " with", pt: " com" },
  "tutorial.templateDesc4": { en: " 3 sheets", pt: " 3 abas" },
  "tutorial.templateDesc5": { en: ". Each sheet has specific columns that must be kept as headers in the first row:", pt: ". Cada aba possui colunas específicas que devem ser mantidas como cabeçalhos na primeira linha:" },
  "tutorial.importTitle": { en: "Import Data", pt: "Importar Dados" },
  "tutorial.importDesc": { en: "Download the Excel template, fill it with your financial data across the 3 sheets, then upload it here. All data is processed locally in your browser.", pt: "Baixe o template Excel, preencha com seus dados financeiros nas 3 abas e faça upload aqui. Todos os dados são processados localmente no seu navegador." },
  "tutorial.downloadTemplate": { en: "Download Template", pt: "Baixar Template" },
  "tutorial.uploadFile": { en: "Upload Excel File", pt: "Enviar Arquivo Excel" },
  "tutorial.cta": { en: "Start using the system", pt: "Começar a usar o sistema" },

  // Months (short)
  "month.0": { en: "Jan", pt: "Jan" },
  "month.1": { en: "Feb", pt: "Fev" },
  "month.2": { en: "Mar", pt: "Mar" },
  "month.3": { en: "Apr", pt: "Abr" },
  "month.4": { en: "May", pt: "Mai" },
  "month.5": { en: "Jun", pt: "Jun" },
  "month.6": { en: "Jul", pt: "Jul" },
  "month.7": { en: "Aug", pt: "Ago" },
  "month.8": { en: "Sep", pt: "Set" },
  "month.9": { en: "Oct", pt: "Out" },
  "month.10": { en: "Nov", pt: "Nov" },
  "month.11": { en: "Dec", pt: "Dez" },

  // Months (full) for transaction filter
  "monthFull.0": { en: "January", pt: "Janeiro" },
  "monthFull.1": { en: "February", pt: "Fevereiro" },
  "monthFull.2": { en: "March", pt: "Março" },
  "monthFull.3": { en: "April", pt: "Abril" },
  "monthFull.4": { en: "May", pt: "Maio" },
  "monthFull.5": { en: "June", pt: "Junho" },
  "monthFull.6": { en: "July", pt: "Julho" },
  "monthFull.7": { en: "August", pt: "Agosto" },
  "monthFull.8": { en: "September", pt: "Setembro" },
  "monthFull.9": { en: "October", pt: "Outubro" },
  "monthFull.10": { en: "November", pt: "Novembro" },
  "monthFull.11": { en: "December", pt: "Dezembro" },

  // Toast messages
  "toast.success": { en: "Data imported successfully", pt: "Dados importados com sucesso" },
  "toast.loaded": { en: "Loaded", pt: "Carregados" },
  "toast.transactions": { en: "transactions", pt: "transações" },
  "toast.dividends": { en: "dividends", pt: "dividendos" },
  "toast.assets": { en: "assets", pt: "ativos" },
  "toast.warnings": { en: "Import warnings", pt: "Avisos de importação" },
  "toast.noData": { en: "No data found", pt: "Nenhum dado encontrado" },
  "toast.noDataDesc": { en: "The file was read but no valid rows were found. Please check the template format.", pt: "O arquivo foi lido mas nenhuma linha válida foi encontrada. Verifique o formato do template." },
  "toast.invalidFile": { en: "Invalid file", pt: "Arquivo inválido" },
  "toast.invalidFileDesc": { en: "Could not read the file. Please upload a valid .xlsx Excel file.", pt: "Não foi possível ler o arquivo. Envie um arquivo .xlsx válido." },
} as const;

type TranslationKey = keyof typeof translations;

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
  tMonth: (month: number) => string;
  tMonthFull: (month: number) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const t = (key: TranslationKey): string => {
    return translations[key]?.[lang] ?? key;
  };

  const tMonth = (month: number): string => {
    const key = `month.${month}` as TranslationKey;
    return translations[key]?.[lang] ?? "";
  };

  const tMonthFull = (month: number): string => {
    const key = `monthFull.${month}` as TranslationKey;
    return translations[key]?.[lang] ?? "";
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t, tMonth, tMonthFull }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
