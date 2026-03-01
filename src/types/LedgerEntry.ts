export interface LedgerEntry {
  date: string;

  openingBalance: number;

  cashSales: number;
  upiSales: number;
  creditSales: number;

  personalExpense: number;
  businessExpense: number;
  otherExpense: number;

  totalSales: number;
  totalExpenses: number;

  profitLoss: number;
  closingCash: number;
}