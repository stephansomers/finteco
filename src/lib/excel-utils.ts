import * as XLSX from "xlsx";
import { Transaction, AssetSnapshot, DividendEntry } from "./types";

export interface ExcelImportResult {
  transactions: Transaction[];
  dividends: DividendEntry[];
  assets: AssetSnapshot[];
  errors: string[];
}

/** Convert date value (dd/mm/yyyy string or Excel serial number) to yyyy-mm-dd */
function parseDateValue(raw: unknown): string {
  if (typeof raw === "number") {
    const d = new Date(Math.round((raw - 25569) * 86400000));
    const yyyy = d.getUTCFullYear();
    const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(d.getUTCDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
  const s = String(raw || "").trim();
  const match = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (match) {
    const [, dd, mm, yyyy] = match;
    return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
  }
  return s;
}

export function parseExcelFile(data: ArrayBuffer): ExcelImportResult {
  const errors: string[] = [];
  let transactions: Transaction[] = [];
  let dividends: DividendEntry[] = [];
  let assets: AssetSnapshot[] = [];

  try {
    const workbook = XLSX.read(data, { type: "array" });

    const txSheet = workbook.Sheets["Transactions"];
    if (txSheet) {
      const rows = XLSX.utils.sheet_to_json<Record<string, string>>(txSheet);
      transactions = rows
        .map(row => ({
          date: parseDateValue(row["date"]),
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

    const divSheet = workbook.Sheets["Dividends"];
    if (divSheet) {
      const rows = XLSX.utils.sheet_to_json<Record<string, string>>(divSheet);
      dividends = rows
        .map(row => ({
          date: parseDateValue(row["date"]),
          asset: String(row["asset"] || "").trim(),
          category: String(row["category"] || "").trim(),
          value: Math.abs(parseFloat(String(row["value"] || "0"))),
        }))
        .filter(d => d.date && d.asset && !isNaN(d.value));
    } else {
      errors.push("Sheet 'Dividends' not found.");
    }

    const assetSheet = workbook.Sheets["Assets"];
    if (assetSheet) {
      const rows = XLSX.utils.sheet_to_json<Record<string, string>>(assetSheet);
      assets = rows
        .map(row => ({
          date: parseDateValue(row["date"]),
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

  function toExcelDate(d: Date): number {
    const epoch = new Date(1899, 11, 30);
    return Math.round((d.getTime() - epoch.getTime()) / 86400000);
  }

  // Transactions sheet — examples of each income type + loan + repayment
  const txHeaders = ["date", "description", "category", "subcategory", "type", "value"];
  const txRows = [
    // Income examples
    [toExcelDate(new Date(2025, 0, 5)),  "Monthly Salary",           "Income",          "Salary",      "income",  12000],
    [toExcelDate(new Date(2025, 0, 8)),  "Website redesign project", "Income",          "Freelance",   "income",  3500],
    [toExcelDate(new Date(2025, 0, 15)), "Stock dividends",          "Income",          "Investments", "income",  1160],
    [toExcelDate(new Date(2025, 0, 20)), "Apartment rental income",  "Income",          "Rental",      "income",  2500],
    [toExcelDate(new Date(2025, 11, 15)),"Year-end bonus",           "Income",          "Bonus",       "income",  15000],
    // Expense examples
    [toExcelDate(new Date(2025, 0, 10)), "Rent",                     "Housing",         "Rent",        "expense", 2800],
    [toExcelDate(new Date(2025, 0, 12)), "Grocery Store",            "Food",            "Groceries",   "expense", 650],
    [toExcelDate(new Date(2025, 0, 14)), "Restaurant",               "Food",            "Dining Out",  "expense", 280],
    [toExcelDate(new Date(2025, 0, 18)), "Flight to Salvador",       "Travel",          "Flights",     "expense", 890],
    [toExcelDate(new Date(2025, 0, 20)), "Hotel Salvador",           "Travel",          "Hotels",      "expense", 1200],
    // Loan examples
    [toExcelDate(new Date(2025, 0, 25)), "Loan to Gabriel",          "Loan",            "Loan Out",    "expense", 2000],
    [toExcelDate(new Date(2025, 1, 18)), "Repayment from Gabriel",   "Loan Repayment",  "Repayment",   "income",  500],
  ];
  const txSheet = XLSX.utils.aoa_to_sheet([txHeaders, ...txRows]);
  for (let r = 1; r <= txRows.length; r++) {
    const cell = txSheet[XLSX.utils.encode_cell({ r, c: 0 })];
    if (cell) { cell.t = "n"; cell.z = "dd/mm/yyyy"; }
  }
  txSheet["!cols"] = [{ wch: 12 }, { wch: 28 }, { wch: 16 }, { wch: 14 }, { wch: 10 }, { wch: 10 }];
  XLSX.utils.book_append_sheet(wb, txSheet, "Transactions");

  // Dividends sheet
  const divHeaders = ["date", "asset", "category", "value"];
  const divRows = [
    [toExcelDate(new Date(2025, 0, 15)), "PETR4",  "Stocks", 320],
    [toExcelDate(new Date(2025, 1, 20)), "XPML11", "FIIs",   180],
    [toExcelDate(new Date(2025, 2, 15)), "VALE3",  "Stocks", 450],
  ];
  const divSheet = XLSX.utils.aoa_to_sheet([divHeaders, ...divRows]);
  for (let r = 1; r <= divRows.length; r++) {
    const cell = divSheet[XLSX.utils.encode_cell({ r, c: 0 })];
    if (cell) { cell.t = "n"; cell.z = "dd/mm/yyyy"; }
  }
  divSheet["!cols"] = [{ wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 10 }];
  XLSX.utils.book_append_sheet(wb, divSheet, "Dividends");

  // Assets sheet — last day of month
  const assetHeaders = ["date", "institution", "value"];
  const assetRows = [
    [toExcelDate(new Date(2025, 1, 0)), "Bank A",   15000],   // 31/01/2025
    [toExcelDate(new Date(2025, 2, 0)), "Bank A",   15500],   // 28/02/2025
    [toExcelDate(new Date(2025, 1, 0)), "Broker B", 25000],   // 31/01/2025
  ];
  const assetSheet = XLSX.utils.aoa_to_sheet([assetHeaders, ...assetRows]);
  for (let r = 1; r <= assetRows.length; r++) {
    const cell = assetSheet[XLSX.utils.encode_cell({ r, c: 0 })];
    if (cell) { cell.t = "n"; cell.z = "dd/mm/yyyy"; }
  }
  assetSheet["!cols"] = [{ wch: 12 }, { wch: 14 }, { wch: 12 }];
  XLSX.utils.book_append_sheet(wb, assetSheet, "Assets");

  XLSX.writeFile(wb, "findashboard_template.xlsx");
}

export { formatCurrency, formatNumber, getMonthName } from "./csv-utils";
