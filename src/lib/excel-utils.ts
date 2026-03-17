import * as XLSX from "xlsx";
import { Transaction, AssetSnapshot, DividendEntry } from "./types";

export interface ExcelImportResult {
  transactions: Transaction[];
  dividends: DividendEntry[];
  assets: AssetSnapshot[];
  errors: string[];
}

/** Convert dd/mm/yyyy to yyyy-mm-dd for internal use */
function parseDateDMY(raw: string): string {
  const s = String(raw || "").trim();
  const match = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (match) {
    const [, dd, mm, yyyy] = match;
    return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
  }
  // fallback: try as-is (ISO or other)
  return s;
}

export function parseExcelFile(data: ArrayBuffer): ExcelImportResult {
  const errors: string[] = [];
  let transactions: Transaction[] = [];
  let dividends: DividendEntry[] = [];
  let assets: AssetSnapshot[] = [];

  try {
    const workbook = XLSX.read(data, { type: "array" });

    // Parse Transactions sheet
    const txSheet = workbook.Sheets["Transactions"];
    if (txSheet) {
      const rows = XLSX.utils.sheet_to_json<Record<string, string>>(txSheet);
      transactions = rows
        .map(row => ({
          date: parseDateDMY(row["date"]),
          description: String(row["description"] || "").trim(),
          category: String(row["category"] || "").trim(),
          subcategory: String(row["subcategory"] || "").trim(),
          type: (String(row["type"] || "").trim().toLowerCase() === "income" ? "income" : "expense") as "income" | "expense",
          value: Math.abs(parseFloat(String(row["value"] || "0"))),
        }))
        .filter(t => t.date && !isNaN(t.value));
    } else {
      errors.push("Sheet 'Transactions' not found.");
    }

    // Parse Dividends sheet
    const divSheet = workbook.Sheets["Dividends"];
    if (divSheet) {
      const rows = XLSX.utils.sheet_to_json<Record<string, string>>(divSheet);
      dividends = rows
        .map(row => ({
          date: parseDateDMY(row["date"]),
          asset: String(row["asset"] || "").trim(),
          category: String(row["category"] || "").trim(),
          value: Math.abs(parseFloat(String(row["value"] || "0"))),
        }))
        .filter(d => d.date && d.asset && !isNaN(d.value));
    } else {
      errors.push("Sheet 'Dividends' not found.");
    }

    // Parse Assets sheet
    const assetSheet = workbook.Sheets["Assets"];
    if (assetSheet) {
      const rows = XLSX.utils.sheet_to_json<Record<string, string>>(assetSheet);
      assets = rows
        .map(row => ({
          date: String(row["date"] || "").trim(),
          institution: String(row["institution"] || "").trim(),
          value: parseFloat(String(row["value"] || "0")),
        }))
        .filter(a => a.institution && a.date && !isNaN(a.value));
    } else {
      errors.push("Sheet 'Assets' not found.");
    }
  } catch {
    errors.push("Failed to read the Excel file. Please ensure it is a valid .xlsx file.");
  }

  return { transactions, dividends, assets, errors };
}

export function downloadExcelTemplate() {
  const wb = XLSX.utils.book_new();

  // Transactions sheet
  const txData = [
    { date: "15/01/2025", description: "Salary", category: "Income", subcategory: "Salary", type: "income", value: 5000 },
    { date: "16/01/2025", description: "Grocery Store", category: "Food", subcategory: "Groceries", type: "expense", value: 120 },
    { date: "17/01/2025", description: "Flight to NYC", category: "Travel", subcategory: "Flights", type: "expense", value: 350 },
  ];
  const txSheet = XLSX.utils.json_to_sheet(txData);
  txSheet["!cols"] = [{ wch: 12 }, { wch: 20 }, { wch: 14 }, { wch: 14 }, { wch: 10 }, { wch: 10 }];
  XLSX.utils.book_append_sheet(wb, txSheet, "Transactions");

  // Dividends sheet
  const divData = [
    { date: "15/01/2025", asset: "PETR4", category: "Stocks", value: 320 },
    { date: "20/02/2025", asset: "XPML11", category: "FIIs", value: 180 },
    { date: "15/03/2025", asset: "VALE3", category: "Stocks", value: 450 },
  ];
  const divSheet = XLSX.utils.json_to_sheet(divData);
  divSheet["!cols"] = [{ wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 10 }];
  XLSX.utils.book_append_sheet(wb, divSheet, "Dividends");

  // Assets sheet (date as first column, consistent with other sheets)
  const assetData = [
    { date: "01/2025", institution: "Bank A", value: 15000 },
    { date: "02/2025", institution: "Bank A", value: 15500 },
    { date: "01/2025", institution: "Broker B", value: 25000 },
  ];
  const assetSheet = XLSX.utils.json_to_sheet(assetData);
  assetSheet["!cols"] = [{ wch: 12 }, { wch: 14 }, { wch: 12 }];
  XLSX.utils.book_append_sheet(wb, assetSheet, "Assets");

  XLSX.writeFile(wb, "findashboard_template.xlsx");
}

export { formatCurrency, formatNumber, getMonthName } from "./csv-utils";
