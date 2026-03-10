import { Transaction, DividendEntry } from "./types";

const currentYear = new Date().getFullYear();

export const MOCK_TRANSACTIONS: Transaction[] = [
  // January
  { date: `${currentYear}-01-05`, description: "Salary", category: "Income", subcategory: "Salary", type: "income", value: 12000 },
  { date: `${currentYear}-01-08`, description: "Freelance project", category: "Income", subcategory: "Freelance", type: "income", value: 3500 },
  { date: `${currentYear}-01-10`, description: "Rent", category: "Housing", subcategory: "Rent", type: "expense", value: 2800 },
  { date: `${currentYear}-01-12`, description: "Supermarket", category: "Food", subcategory: "Groceries", type: "expense", value: 650 },
  { date: `${currentYear}-01-14`, description: "Restaurant", category: "Food", subcategory: "Dining Out", type: "expense", value: 280 },
  { date: `${currentYear}-01-18`, description: "Flight to Salvador", category: "Travel", subcategory: "Flights", type: "expense", value: 890 },
  { date: `${currentYear}-01-20`, description: "Hotel Salvador", category: "Travel", subcategory: "Hotels", type: "expense", value: 1200 },
  { date: `${currentYear}-01-22`, description: "Uber rides", category: "Transport", subcategory: "Rideshare", type: "expense", value: 180 },
  { date: `${currentYear}-01-25`, description: "Loan to Vera", category: "Loan", subcategory: "Loan Out", type: "expense", value: 2000 },
  { date: `${currentYear}-01-28`, description: "Electricity bill", category: "Housing", subcategory: "Utilities", type: "expense", value: 320 },

  // February
  { date: `${currentYear}-02-05`, description: "Salary", category: "Income", subcategory: "Salary", type: "income", value: 12000 },
  { date: `${currentYear}-02-10`, description: "Rent", category: "Housing", subcategory: "Rent", type: "expense", value: 2800 },
  { date: `${currentYear}-02-12`, description: "Supermarket", category: "Food", subcategory: "Groceries", type: "expense", value: 720 },
  { date: `${currentYear}-02-14`, description: "Restaurant Valentine", category: "Food", subcategory: "Dining Out", type: "expense", value: 450 },
  { date: `${currentYear}-02-16`, description: "Gym membership", category: "Health", subcategory: "Gym", type: "expense", value: 150 },
  { date: `${currentYear}-02-18`, description: "Repayment from Vera", category: "Loan Repayment", subcategory: "Repayment", type: "income", value: 500 },
  { date: `${currentYear}-02-20`, description: "Loan to Chris", category: "Loan", subcategory: "Loan Out", type: "expense", value: 1500 },
  { date: `${currentYear}-02-22`, description: "Internet bill", category: "Housing", subcategory: "Utilities", type: "expense", value: 120 },
  { date: `${currentYear}-02-25`, description: "Clothing", category: "Shopping", subcategory: "Clothes", type: "expense", value: 380 },

  // March
  { date: `${currentYear}-03-05`, description: "Salary", category: "Income", subcategory: "Salary", type: "income", value: 12000 },
  { date: `${currentYear}-03-07`, description: "Dividend income", category: "Income", subcategory: "Investments", type: "income", value: 850 },
  { date: `${currentYear}-03-10`, description: "Rent", category: "Housing", subcategory: "Rent", type: "expense", value: 2800 },
  { date: `${currentYear}-03-12`, description: "Supermarket", category: "Food", subcategory: "Groceries", type: "expense", value: 580 },
  { date: `${currentYear}-03-15`, description: "Flight to Rio", category: "Travel", subcategory: "Flights", type: "expense", value: 650 },
  { date: `${currentYear}-03-18`, description: "Repayment from Chris", category: "Loan Repayment", subcategory: "Repayment", type: "income", value: 750 },
  { date: `${currentYear}-03-20`, description: "Loan to Louise", category: "Loan", subcategory: "Loan Out", type: "expense", value: 3000 },
  { date: `${currentYear}-03-22`, description: "Pharmacy", category: "Health", subcategory: "Pharmacy", type: "expense", value: 95 },
  { date: `${currentYear}-03-25`, description: "Gas station", category: "Transport", subcategory: "Fuel", type: "expense", value: 250 },
  { date: `${currentYear}-03-28`, description: "Electricity bill", category: "Housing", subcategory: "Utilities", type: "expense", value: 290 },

  // April
  { date: `${currentYear}-04-05`, description: "Salary", category: "Income", subcategory: "Salary", type: "income", value: 12000 },
  { date: `${currentYear}-04-08`, description: "Freelance project", category: "Income", subcategory: "Freelance", type: "income", value: 2200 },
  { date: `${currentYear}-04-10`, description: "Rent", category: "Housing", subcategory: "Rent", type: "expense", value: 2800 },
  { date: `${currentYear}-04-12`, description: "Supermarket", category: "Food", subcategory: "Groceries", type: "expense", value: 610 },
  { date: `${currentYear}-04-15`, description: "Repayment from Vera", category: "Loan Repayment", subcategory: "Repayment", type: "income", value: 1000 },
  { date: `${currentYear}-04-18`, description: "Car maintenance", category: "Transport", subcategory: "Maintenance", type: "expense", value: 800 },
  { date: `${currentYear}-04-20`, description: "Dining out", category: "Food", subcategory: "Dining Out", type: "expense", value: 320 },
  { date: `${currentYear}-04-22`, description: "Streaming services", category: "Entertainment", subcategory: "Subscriptions", type: "expense", value: 85 },

  // May
  { date: `${currentYear}-05-05`, description: "Salary", category: "Income", subcategory: "Salary", type: "income", value: 12000 },
  { date: `${currentYear}-05-10`, description: "Rent", category: "Housing", subcategory: "Rent", type: "expense", value: 2800 },
  { date: `${currentYear}-05-12`, description: "Supermarket", category: "Food", subcategory: "Groceries", type: "expense", value: 700 },
  { date: `${currentYear}-05-15`, description: "Flight to SP", category: "Travel", subcategory: "Flights", type: "expense", value: 520 },
  { date: `${currentYear}-05-18`, description: "Loan to someone unknown", category: "Loan", subcategory: "Loan Out", type: "expense", value: 500 },
  { date: `${currentYear}-05-20`, description: "Repayment from Louise", category: "Loan Repayment", subcategory: "Repayment", type: "income", value: 1500 },
  { date: `${currentYear}-05-22`, description: "Gym membership", category: "Health", subcategory: "Gym", type: "expense", value: 150 },
  { date: `${currentYear}-05-25`, description: "Electronics", category: "Shopping", subcategory: "Electronics", type: "expense", value: 1200 },
];

export const MOCK_DIVIDENDS: DividendEntry[] = [
  // January
  { date: `${currentYear}-01-15`, asset: "PETR4", category: "Stocks", value: 320 },
  { date: `${currentYear}-01-15`, asset: "VALE3", category: "Stocks", value: 450 },
  { date: `${currentYear}-01-20`, asset: "XPML11", category: "FIIs", value: 180 },
  { date: `${currentYear}-01-20`, asset: "HGLG11", category: "FIIs", value: 210 },

  // February
  { date: `${currentYear}-02-15`, asset: "PETR4", category: "Stocks", value: 340 },
  { date: `${currentYear}-02-15`, asset: "ITUB4", category: "Stocks", value: 280 },
  { date: `${currentYear}-02-20`, asset: "XPML11", category: "FIIs", value: 185 },
  { date: `${currentYear}-02-20`, asset: "HGLG11", category: "FIIs", value: 215 },
  { date: `${currentYear}-02-25`, asset: "KNRI11", category: "FIIs", value: 150 },

  // March
  { date: `${currentYear}-03-15`, asset: "PETR4", category: "Stocks", value: 380 },
  { date: `${currentYear}-03-15`, asset: "VALE3", category: "Stocks", value: 520 },
  { date: `${currentYear}-03-15`, asset: "ITUB4", category: "Stocks", value: 290 },
  { date: `${currentYear}-03-20`, asset: "XPML11", category: "FIIs", value: 190 },
  { date: `${currentYear}-03-20`, asset: "HGLG11", category: "FIIs", value: 220 },

  // April
  { date: `${currentYear}-04-15`, asset: "PETR4", category: "Stocks", value: 350 },
  { date: `${currentYear}-04-15`, asset: "VALE3", category: "Stocks", value: 480 },
  { date: `${currentYear}-04-20`, asset: "XPML11", category: "FIIs", value: 195 },
  { date: `${currentYear}-04-20`, asset: "HGLG11", category: "FIIs", value: 225 },
  { date: `${currentYear}-04-20`, asset: "KNRI11", category: "FIIs", value: 160 },

  // May
  { date: `${currentYear}-05-15`, asset: "PETR4", category: "Stocks", value: 400 },
  { date: `${currentYear}-05-15`, asset: "VALE3", category: "Stocks", value: 510 },
  { date: `${currentYear}-05-15`, asset: "ITUB4", category: "Stocks", value: 310 },
  { date: `${currentYear}-05-20`, asset: "XPML11", category: "FIIs", value: 200 },
  { date: `${currentYear}-05-20`, asset: "HGLG11", category: "FIIs", value: 230 },
  { date: `${currentYear}-05-20`, asset: "KNRI11", category: "FIIs", value: 165 },
];
