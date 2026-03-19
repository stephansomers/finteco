import { Transaction, DividendEntry, AssetSnapshot } from "./types";

const currentYear = new Date().getFullYear();

export const MOCK_TRANSACTIONS: Transaction[] = [
  // January
  { date: `${currentYear}-01-05`, description: "Salary", category: "Income", subcategory: "Salary", type: "income", value: 12000 },
  { date: `${currentYear}-01-08`, description: "Website redesign project", category: "Income", subcategory: "Freelance", type: "income", value: 3500 },
  { date: `${currentYear}-01-10`, description: "Rent", category: "Housing", subcategory: "Rent", type: "expense", value: 2800 },
  { date: `${currentYear}-01-12`, description: "Supermarket", category: "Food", subcategory: "Groceries", type: "expense", value: 650 },
  { date: `${currentYear}-01-14`, description: "Restaurant", category: "Food", subcategory: "Dining Out", type: "expense", value: 280 },
  { date: `${currentYear}-01-18`, description: "Flight to Salvador", category: "Travel", subcategory: "Travel", type: "expense", value: 890 },
  { date: `${currentYear}-01-20`, description: "Hotel Salvador", category: "Travel", subcategory: "Travel", type: "expense", value: 1200 },
  { date: `${currentYear}-01-22`, description: "Uber rides", category: "Transport", subcategory: "Rideshare", type: "expense", value: 180 },
  { date: `${currentYear}-01-25`, description: "Loan to Gabriel", category: "Loan", subcategory: "Loan Out", type: "expense", value: 2000 },
  { date: `${currentYear}-01-28`, description: "Electricity bill", category: "Housing", subcategory: "Utilities", type: "expense", value: 320 },
  { date: `${currentYear}-01-30`, description: "Stock dividends", category: "Income", subcategory: "Investments", type: "income", value: 1160 },

  // February
  { date: `${currentYear}-02-05`, description: "Salary", category: "Income", subcategory: "Salary", type: "income", value: 12000 },
  { date: `${currentYear}-02-07`, description: "Mobile app UI project", category: "Income", subcategory: "Freelance", type: "income", value: 4200 },
  { date: `${currentYear}-02-10`, description: "Rent", category: "Housing", subcategory: "Rent", type: "expense", value: 2800 },
  { date: `${currentYear}-02-12`, description: "Supermarket", category: "Food", subcategory: "Groceries", type: "expense", value: 720 },
  { date: `${currentYear}-02-14`, description: "Restaurant Valentine", category: "Food", subcategory: "Dining Out", type: "expense", value: 450 },
  { date: `${currentYear}-02-16`, description: "Gym membership", category: "Health", subcategory: "Gym", type: "expense", value: 150 },
  { date: `${currentYear}-02-18`, description: "Repayment from Gabriel", category: "Loan Repayment", subcategory: "Repayment", type: "income", value: 500 },
  { date: `${currentYear}-02-20`, description: "Loan to Mariana", category: "Loan", subcategory: "Loan Out", type: "expense", value: 1500 },
  { date: `${currentYear}-02-22`, description: "Internet bill", category: "Housing", subcategory: "Utilities", type: "expense", value: 120 },
  { date: `${currentYear}-02-25`, description: "Clothing", category: "Shopping", subcategory: "Clothes", type: "expense", value: 380 },
  { date: `${currentYear}-02-27`, description: "FII monthly yield", category: "Income", subcategory: "Investments", type: "income", value: 1170 },

  // March
  { date: `${currentYear}-03-05`, description: "Salary", category: "Income", subcategory: "Salary", type: "income", value: 12000 },
  { date: `${currentYear}-03-07`, description: "Dividend income", category: "Income", subcategory: "Investments", type: "income", value: 1600 },
  { date: `${currentYear}-03-09`, description: "Landing page project", category: "Income", subcategory: "Freelance", type: "income", value: 2800 },
  { date: `${currentYear}-03-10`, description: "Rent", category: "Housing", subcategory: "Rent", type: "expense", value: 2800 },
  { date: `${currentYear}-03-12`, description: "Supermarket", category: "Food", subcategory: "Groceries", type: "expense", value: 580 },
  { date: `${currentYear}-03-15`, description: "Flight to Rio", category: "Travel", subcategory: "Flights", type: "expense", value: 650 },
  { date: `${currentYear}-03-18`, description: "Repayment from Mariana", category: "Loan Repayment", subcategory: "Repayment", type: "income", value: 750 },
  { date: `${currentYear}-03-20`, description: "Loan to Rafael", category: "Loan", subcategory: "Loan Out", type: "expense", value: 3000 },
  { date: `${currentYear}-03-22`, description: "Pharmacy", category: "Health", subcategory: "Pharmacy", type: "expense", value: 95 },
  { date: `${currentYear}-03-25`, description: "Gas station", category: "Transport", subcategory: "Fuel", type: "expense", value: 250 },
  { date: `${currentYear}-03-28`, description: "Electricity bill", category: "Housing", subcategory: "Utilities", type: "expense", value: 290 },

  // April
  { date: `${currentYear}-04-05`, description: "Salary", category: "Income", subcategory: "Salary", type: "income", value: 12000 },
  { date: `${currentYear}-04-08`, description: "E-commerce integration", category: "Income", subcategory: "Freelance", type: "income", value: 5500 },
  { date: `${currentYear}-04-09`, description: "CDB interest", category: "Income", subcategory: "Investments", type: "income", value: 920 },
  { date: `${currentYear}-04-10`, description: "Rent", category: "Housing", subcategory: "Rent", type: "expense", value: 2800 },
  { date: `${currentYear}-04-12`, description: "Supermarket", category: "Food", subcategory: "Groceries", type: "expense", value: 610 },
  { date: `${currentYear}-04-15`, description: "Repayment from Gabriel", category: "Loan Repayment", subcategory: "Repayment", type: "income", value: 1000 },
  { date: `${currentYear}-04-18`, description: "Car maintenance", category: "Transport", subcategory: "Maintenance", type: "expense", value: 800 },
  { date: `${currentYear}-04-20`, description: "Dining out", category: "Food", subcategory: "Dining Out", type: "expense", value: 320 },
  { date: `${currentYear}-04-22`, description: "Streaming services", category: "Entertainment", subcategory: "Subscriptions", type: "expense", value: 85 },

  // May
  { date: `${currentYear}-05-05`, description: "Salary", category: "Income", subcategory: "Salary", type: "income", value: 12000 },
  { date: `${currentYear}-05-07`, description: "API development project", category: "Income", subcategory: "Freelance", type: "income", value: 6800 },
  { date: `${currentYear}-05-09`, description: "Tesouro Direto yield", category: "Income", subcategory: "Investments", type: "income", value: 1105 },
  { date: `${currentYear}-05-10`, description: "Rent", category: "Housing", subcategory: "Rent", type: "expense", value: 2800 },
  { date: `${currentYear}-05-12`, description: "Supermarket", category: "Food", subcategory: "Groceries", type: "expense", value: 700 },
  { date: `${currentYear}-05-15`, description: "Flight to SP", category: "Travel", subcategory: "Flights", type: "expense", value: 520 },
  { date: `${currentYear}-05-18`, description: "Loan to Fernanda", category: "Loan", subcategory: "Loan Out", type: "expense", value: 500 },
  { date: `${currentYear}-05-20`, description: "Repayment from Rafael", category: "Loan Repayment", subcategory: "Repayment", type: "income", value: 1500 },
  { date: `${currentYear}-05-22`, description: "Gym membership", category: "Health", subcategory: "Gym", type: "expense", value: 150 },
  { date: `${currentYear}-05-25`, description: "Electronics", category: "Shopping", subcategory: "Electronics", type: "expense", value: 1200 },

  // June
  { date: `${currentYear}-06-05`, description: "Salary", category: "Income", subcategory: "Salary", type: "income", value: 12000 },
  { date: `${currentYear}-06-07`, description: "Consulting project", category: "Income", subcategory: "Freelance", type: "income", value: 4200 },
  { date: `${currentYear}-06-10`, description: "Rent", category: "Housing", subcategory: "Rent", type: "expense", value: 2800 },
  { date: `${currentYear}-06-12`, description: "Supermarket", category: "Food", subcategory: "Groceries", type: "expense", value: 690 },
  { date: `${currentYear}-06-15`, description: "Dining out", category: "Food", subcategory: "Dining Out", type: "expense", value: 300 },
  { date: `${currentYear}-06-18`, description: "Fuel", category: "Transport", subcategory: "Fuel", type: "expense", value: 260 },
  { date: `${currentYear}-06-22`, description: "Internet bill", category: "Housing", subcategory: "Utilities", type: "expense", value: 120 },
  { date: `${currentYear}-06-25`, description: "Gym membership", category: "Health", subcategory: "Gym", type: "expense", value: 150 },

  // July
  { date: `${currentYear}-07-05`, description: "Salary", category: "Income", subcategory: "Salary", type: "income", value: 12000 },
  { date: `${currentYear}-07-07`, description: "UX redesign project", category: "Income", subcategory: "Freelance", type: "income", value: 3800 },
  { date: `${currentYear}-07-10`, description: "Rent", category: "Housing", subcategory: "Rent", type: "expense", value: 2800 },
  { date: `${currentYear}-07-12`, description: "Supermarket", category: "Food", subcategory: "Groceries", type: "expense", value: 710 },
  { date: `${currentYear}-07-15`, description: "Cinema", category: "Entertainment", subcategory: "Movies", type: "expense", value: 120 },
  { date: `${currentYear}-07-18`, description: "Fuel", category: "Transport", subcategory: "Fuel", type: "expense", value: 240 },
  { date: `${currentYear}-07-22`, description: "Electricity bill", category: "Housing", subcategory: "Utilities", type: "expense", value: 310 },

  // August
  { date: `${currentYear}-08-05`, description: "Salary", category: "Income", subcategory: "Salary", type: "income", value: 12000 },
  { date: `${currentYear}-08-07`, description: "Shopify integration", category: "Income", subcategory: "Freelance", type: "income", value: 5200 },
  { date: `${currentYear}-08-10`, description: "Rent", category: "Housing", subcategory: "Rent", type: "expense", value: 2800 },
  { date: `${currentYear}-08-12`, description: "Supermarket", category: "Food", subcategory: "Groceries", type: "expense", value: 670 },
  { date: `${currentYear}-08-18`, description: "Uber rides", category: "Transport", subcategory: "Rideshare", type: "expense", value: 210 },
  { date: `${currentYear}-08-22`, description: "Restaurant", category: "Food", subcategory: "Dining Out", type: "expense", value: 350 },

  // September
  { date: `${currentYear}-09-05`, description: "Salary", category: "Income", subcategory: "Salary", type: "income", value: 12000 },
  { date: `${currentYear}-09-09`, description: "Tech consulting", category: "Income", subcategory: "Freelance", type: "income", value: 4100 },
  { date: `${currentYear}-09-10`, description: "Rent", category: "Housing", subcategory: "Rent", type: "expense", value: 2800 },
  { date: `${currentYear}-09-12`, description: "Supermarket", category: "Food", subcategory: "Groceries", type: "expense", value: 690 },
  { date: `${currentYear}-09-18`, description: "Fuel", category: "Transport", subcategory: "Fuel", type: "expense", value: 260 },

  // October
  { date: `${currentYear}-10-05`, description: "Salary", category: "Income", subcategory: "Salary", type: "income", value: 12000 },
  { date: `${currentYear}-10-07`, description: "Freelance backend project", category: "Income", subcategory: "Freelance", type: "income", value: 4700 },
  { date: `${currentYear}-10-10`, description: "Rent", category: "Housing", subcategory: "Rent", type: "expense", value: 2800 },
  { date: `${currentYear}-10-12`, description: "Supermarket", category: "Food", subcategory: "Groceries", type: "expense", value: 720 },
  { date: `${currentYear}-10-20`, description: "Concert tickets", category: "Entertainment", subcategory: "Events", type: "expense", value: 600 },

  // November
  { date: `${currentYear}-11-05`, description: "Salary", category: "Income", subcategory: "Salary", type: "income", value: 12000 },
  { date: `${currentYear}-11-10`, description: "Rent", category: "Housing", subcategory: "Rent", type: "expense", value: 2800 },
  { date: `${currentYear}-11-12`, description: "Supermarket", category: "Food", subcategory: "Groceries", type: "expense", value: 740 },
  { date: `${currentYear}-11-20`, description: "Black Friday electronics", category: "Shopping", subcategory: "Electronics", type: "expense", value: 2400 },

  // December
  { date: `${currentYear}-12-05`, description: "Salary", category: "Income", subcategory: "Salary", type: "income", value: 12000 },
  { date: `${currentYear}-12-10`, description: "Rent", category: "Housing", subcategory: "Rent", type: "expense", value: 2800 },
  { date: `${currentYear}-12-12`, description: "Christmas gifts", category: "Shopping", subcategory: "Gifts", type: "expense", value: 1500 },
  { date: `${currentYear}-12-15`, description: "Year-end bonus", category: "Income", subcategory: "Bonus", type: "income", value: 15000 },
  { date: `${currentYear}-12-20`, description: "New Year's travel", category: "Travel", subcategory: "Hotels", type: "expense", value: 1800 },
];

export const MOCK_DIVIDENDS: DividendEntry[] = [
  // January
  { date: `${currentYear}-01-15`, asset: "PETR4", category: "Ações", value: 320 },
  { date: `${currentYear}-01-15`, asset: "VALE3", category: "Ações", value: 450 },
  { date: `${currentYear}-01-15`, asset: "BBAS3", category: "Ações", value: 280 },
  { date: `${currentYear}-01-20`, asset: "XPML11", category: "FIIs", value: 180 },
  { date: `${currentYear}-01-20`, asset: "HGLG11", category: "FIIs", value: 210 },
  { date: `${currentYear}-01-25`, asset: "IVVB11", category: "ETFs", value: 110 },

  // February
  { date: `${currentYear}-02-15`, asset: "PETR4", category: "Ações", value: 340 },
  { date: `${currentYear}-02-15`, asset: "ITUB4", category: "Ações", value: 280 },
  { date: `${currentYear}-02-15`, asset: "WEGE3", category: "Ações", value: 150 },
  { date: `${currentYear}-02-20`, asset: "XPML11", category: "FIIs", value: 185 },
  { date: `${currentYear}-02-20`, asset: "HGLG11", category: "FIIs", value: 215 },
  { date: `${currentYear}-02-20`, asset: "KNRI11", category: "FIIs", value: 150 },
  { date: `${currentYear}-02-25`, asset: "BOVA11", category: "ETFs", value: 95 },

  // March
  { date: `${currentYear}-03-15`, asset: "PETR4", category: "Ações", value: 380 },
  { date: `${currentYear}-03-15`, asset: "VALE3", category: "Ações", value: 520 },
  { date: `${currentYear}-03-15`, asset: "ITUB4", category: "Ações", value: 290 },
  { date: `${currentYear}-03-15`, asset: "BBAS3", category: "Ações", value: 310 },
  { date: `${currentYear}-03-20`, asset: "XPML11", category: "FIIs", value: 190 },
  { date: `${currentYear}-03-20`, asset: "HGLG11", category: "FIIs", value: 220 },
  { date: `${currentYear}-03-20`, asset: "MXRF11", category: "FIIs", value: 130 },
  { date: `${currentYear}-03-25`, asset: "IVVB11", category: "ETFs", value: 120 },

  // April
  { date: `${currentYear}-04-15`, asset: "PETR4", category: "Ações", value: 350 },
  { date: `${currentYear}-04-15`, asset: "VALE3", category: "Ações", value: 480 },
  { date: `${currentYear}-04-15`, asset: "WEGE3", category: "Ações", value: 160 },
  { date: `${currentYear}-04-20`, asset: "XPML11", category: "FIIs", value: 195 },
  { date: `${currentYear}-04-20`, asset: "HGLG11", category: "FIIs", value: 225 },
  { date: `${currentYear}-04-20`, asset: "KNRI11", category: "FIIs", value: 160 },
  { date: `${currentYear}-04-20`, asset: "VISC11", category: "FIIs", value: 140 },
  { date: `${currentYear}-04-25`, asset: "BOVA11", category: "ETFs", value: 105 },

  // May
  { date: `${currentYear}-05-15`, asset: "PETR4", category: "Ações", value: 400 },
  { date: `${currentYear}-05-15`, asset: "VALE3", category: "Ações", value: 510 },
  { date: `${currentYear}-05-15`, asset: "ITUB4", category: "Ações", value: 310 },
  { date: `${currentYear}-05-15`, asset: "BBAS3", category: "Ações", value: 330 },
  { date: `${currentYear}-05-20`, asset: "XPML11", category: "FIIs", value: 200 },
  { date: `${currentYear}-05-20`, asset: "HGLG11", category: "FIIs", value: 230 },
  { date: `${currentYear}-05-20`, asset: "KNRI11", category: "FIIs", value: 165 },
  { date: `${currentYear}-05-20`, asset: "MXRF11", category: "FIIs", value: 135 },
  { date: `${currentYear}-05-25`, asset: "IVVB11", category: "ETFs", value: 130 },
  { date: `${currentYear}-05-25`, asset: "HASH11", category: "ETFs", value: 75 },

  // June
  { date: `${currentYear}-06-15`, asset: "PETR4", category: "Ações", value: 360 },
  { date: `${currentYear}-06-15`, asset: "VALE3", category: "Ações", value: 470 },
  { date: `${currentYear}-06-20`, asset: "XPML11", category: "FIIs", value: 205 },
  { date: `${currentYear}-06-20`, asset: "HGLG11", category: "FIIs", value: 235 },

  // July
  { date: `${currentYear}-07-15`, asset: "PETR4", category: "Ações", value: 370 },
  { date: `${currentYear}-07-15`, asset: "ITUB4", category: "Ações", value: 300 },
  { date: `${currentYear}-07-20`, asset: "XPML11", category: "FIIs", value: 210 },

  // August
  { date: `${currentYear}-08-15`, asset: "VALE3", category: "Ações", value: 490 },
  { date: `${currentYear}-08-20`, asset: "HGLG11", category: "FIIs", value: 240 },
  { date: `${currentYear}-08-25`, asset: "IVVB11", category: "ETFs", value: 135 },

  // September
  { date: `${currentYear}-09-15`, asset: "PETR4", category: "Ações", value: 395 },
  { date: `${currentYear}-09-20`, asset: "XPML11", category: "FIIs", value: 215 },

  // October
  { date: `${currentYear}-10-15`, asset: "VALE3", category: "Ações", value: 505 },
  { date: `${currentYear}-10-20`, asset: "HGLG11", category: "FIIs", value: 245 },

  // November
  { date: `${currentYear}-11-15`, asset: "PETR4", category: "Ações", value: 410 },
  { date: `${currentYear}-11-20`, asset: "XPML11", category: "FIIs", value: 220 },

  // December
  { date: `${currentYear}-12-15`, asset: "VALE3", category: "Ações", value: 530 },
  { date: `${currentYear}-12-20`, asset: "HGLG11", category: "FIIs", value: 255 },
];

export const MOCK_ASSETS: AssetSnapshot[] = [
  // Bank A
  { institution: "Bank Alpha", date: `${currentYear}-01`, value: 45000 },
  { institution: "Bank Alpha", date: `${currentYear}-02`, value: 47200 },
  { institution: "Bank Alpha", date: `${currentYear}-03`, value: 46800 },
  { institution: "Bank Alpha", date: `${currentYear}-04`, value: 49500 },
  { institution: "Bank Alpha", date: `${currentYear}-05`, value: 51000 },
  { institution: "Bank Alpha", date: `${currentYear}-06`, value: 52800 },
  { institution: "Bank Alpha", date: `${currentYear}-07`, value: 54200 },
  { institution: "Bank Alpha", date: `${currentYear}-08`, value: 56000 },
  { institution: "Bank Alpha", date: `${currentYear}-09`, value: 57500 },
  { institution: "Bank Alpha", date: `${currentYear}-10`, value: 59000 },
  { institution: "Bank Alpha", date: `${currentYear}-11`, value: 61000 },
  { institution: "Bank Alpha", date: `${currentYear}-12`, value: 64000 },

  // Broker
  { institution: "Broker Prime", date: `${currentYear}-01`, value: 82000 },
  { institution: "Broker Prime", date: `${currentYear}-02`, value: 84500 },
  { institution: "Broker Prime", date: `${currentYear}-03`, value: 81200 },
  { institution: "Broker Prime", date: `${currentYear}-04`, value: 86000 },
  { institution: "Broker Prime", date: `${currentYear}-05`, value: 89300 },
  { institution: "Broker Prime", date: `${currentYear}-06`, value: 91000 },
  { institution: "Broker Prime", date: `${currentYear}-07`, value: 92500 },
  { institution: "Broker Prime", date: `${currentYear}-08`, value: 94800 },
  { institution: "Broker Prime", date: `${currentYear}-09`, value: 97000 },
  { institution: "Broker Prime", date: `${currentYear}-10`, value: 99500 },
  { institution: "Broker Prime", date: `${currentYear}-11`, value: 101200 },
  { institution: "Broker Prime", date: `${currentYear}-12`, value: 108000 },

  // Another bank
  { institution: "Bank Beta", date: `${currentYear}-01`, value: 18000 },
  { institution: "Bank Beta", date: `${currentYear}-02`, value: 18500 },
  { institution: "Bank Beta", date: `${currentYear}-03`, value: 19200 },
  { institution: "Bank Beta", date: `${currentYear}-04`, value: 19800 },
  { institution: "Bank Beta", date: `${currentYear}-05`, value: 20100 },
  { institution: "Bank Beta", date: `${currentYear}-06`, value: 20800 },
  { institution: "Bank Beta", date: `${currentYear}-07`, value: 21400 },
  { institution: "Bank Beta", date: `${currentYear}-08`, value: 21900 },
  { institution: "Bank Beta", date: `${currentYear}-09`, value: 22500 },
  { institution: "Bank Beta", date: `${currentYear}-10`, value: 23100 },
  { institution: "Bank Beta", date: `${currentYear}-11`, value: 23800 },
  { institution: "Bank Beta", date: `${currentYear}-12`, value: 24500 },

  // Crypto
  { institution: "Crypto Exchange", date: `${currentYear}-01`, value: 12000 },
  { institution: "Crypto Exchange", date: `${currentYear}-02`, value: 14800 },
  { institution: "Crypto Exchange", date: `${currentYear}-03`, value: 11500 },
  { institution: "Crypto Exchange", date: `${currentYear}-04`, value: 15200 },
  { institution: "Crypto Exchange", date: `${currentYear}-05`, value: 16800 },
  { institution: "Crypto Exchange", date: `${currentYear}-06`, value: 17400 },
  { institution: "Crypto Exchange", date: `${currentYear}-07`, value: 18200 },
  { institution: "Crypto Exchange", date: `${currentYear}-08`, value: 19500 },
  { institution: "Crypto Exchange", date: `${currentYear}-09`, value: 18800 },
  { institution: "Crypto Exchange", date: `${currentYear}-10`, value: 20500 },
  { institution: "Crypto Exchange", date: `${currentYear}-11`, value: 21400 },
  { institution: "Crypto Exchange", date: `${currentYear}-12`, value: 23000 },
];
