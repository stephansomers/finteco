# Personal Finance Dashboard

## Overview

A dark-themed fintech-style personal finance dashboard with two main tabs: **Transactions**, **Wealth Tracker and Loans**, both powered by CSV uploads with fully client-side data processing.

---

## Tab 1: Transactions Dashboard

### Header & Filters

- Sticky top bar with app title and dark theme styling
- **CSV Upload** button to import transactions (date, description, category, subcategory, type, value)
- **CSV Template Download** button so users know the expected format
- **Year** and **Month** dropdown filters, defaulting to current month/year

### KPI Cards Row

Four summary cards with icons:

- **Revenue** (total income)
- **Expenses** (total expenses)
- **Travel** (travel-category spend)
- **Balance** (revenue minus expenses)

### Charts Row

- **Donut Chart** — Expense breakdown by category for selected month
- **Balance Trend Line Chart** — Monthly balance over the selected year

### Transactions Table

- Sortable table showing filtered transactions (date, description, category, subcategory, value)
- Sortable by date and value columns

### Yearly Consolidated Section

- Collapsible accordion showing expenses grouped by subcategory
- Columns: subcategory name + one column per month (Jan–Dec) + total
- Shows the selected year's data

---

## Tab 2: Wealth Tracker

### CSV Upload & Data

- Upload button for asset snapshots (institution, date/month, value)
- Template download button

### Assets Table

- Rows = institutions, Columns = month/year periods
- Each cell shows the asset value
- Monthly **% variation** with green (positive) / red (negative) color coding

### Wealth Charts

- **Total Wealth Evolution** — Line chart over time
- **Wealth by Institution** — Stacked area or multi-line chart

&nbsp;

Tab 3: **Loans**

**1. Annual Summary**

- Total Lent
- Total Repaid
- Outstanding Balance (**repaid - lent**)  
Positive values in **green**, negative in **red**.

**2. Monthly Consolidated Table**

- Rows: loan and repayment categories
- Columns: months + **Year Total**
- “TOTAL” row must calculate **repayments - loans per month**
- Loans displayed in **red**, repayments in **green**.

**3. Person Consolidation**  
Identify the person from the transaction description (e.g., Vera, Chris, Louise).  
Group by person showing:

- Total Lent
- Total Repaid
- Balance

Unknown names should be grouped as **“Others”** (always shown last).

**4. Bar Chart by Person**  
Compare:

- Lent amount (red)
- Repaid amount (green)

**5. Transactions Table**  
Display all loan-related transactions for the selected year.

---

## Design & UX

- Full dark theme with subtle card borders and accent colors (blues/greens)
- Responsive layout using CSS grid — cards and charts stack on mobile
- Smooth tab switching between Transactions and Wealth Tracker
- All data processing happens client-side using parsed CSV data stored in React state
- Charts built with **Recharts**