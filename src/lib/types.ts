export interface Transaction {
  date: string;
  description: string;
  category: string;
  subcategory: string;
  type: "income" | "expense";
  value: number;
}

export interface AssetSnapshot {
  institution: string;
  date: string;
  value: number;
}

export type SortField = "date" | "value";
export type SortDirection = "asc" | "desc";
