export interface Transaction {
    id: number; // Unique transaction ID
    date: string;
    type: string;
    status: string;
    amount: number;
    repaymentDate?: string; // Repayment date for repayments, scheduled repayment date for cash advances
  }