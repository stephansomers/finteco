import { Transaction, AssetSnapshot } from "./types";

export function parseTransactionCSV(text: string): Transaction[] {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  
  return lines.slice(1).map(line => {
    const cols = parseCSVLine(line);
    return {
      date: cols[0]?.trim() || "",
      description: cols[1]?.trim() || "",
      category: cols[2]?.trim() || "",
      subcategory: cols[3]?.trim() || "",
      type: (cols[4]?.trim().toLowerCase() === "income" ? "income" : "expense") as "income" | "expense",
      value: Math.abs(parseFloat(cols[5]?.trim() || "0")),
    };
  }).filter(t => t.date && !isNaN(t.value));
}

export function parseAssetCSV(text: string): AssetSnapshot[] {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  
  return lines.slice(1).map(line => {
    const cols = parseCSVLine(line);
    return {
      institution: cols[0]?.trim() || "",
      date: cols[1]?.trim() || "",
      value: parseFloat(cols[2]?.trim() || "0"),
    };
  }).filter(a => a.institution && !isNaN(a.value));
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (const char of line) {
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

export function downloadTransactionTemplate() {
  const csv = "date,description,category,subcategory,type,value\n2025-01-15,Salary,Income,Salary,income,5000\n2025-01-16,Grocery Store,Food,Groceries,expense,120\n2025-01-17,Flight to NYC,Travel,Flights,expense,350";
  downloadCSV(csv, "transactions_template.csv");
}

export function downloadAssetTemplate() {
  const csv = "institution,date,value\nBank A,2025-01,15000\nBank A,2025-02,15500\nBroker B,2025-01,25000";
  downloadCSV(csv, "assets_template.csv");
}

function downloadCSV(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}

export function getMonthName(month: number): string {
  return new Date(2000, month, 1).toLocaleString("en-US", { month: "short" });
}
