import { get } from './client';

export interface Wallet {
  id: string;
  balance: number;
  totalInvested: number;
  totalReturns: number;
  lastUpdated: string;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'investment' | 'return';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  createdAt: string;
}

export interface WalletResponse {
  balance: number;
  totalInvested: number;
  totalReturns: number;
  availableBalance: number;
}

export interface TransactionsResponse {
  items: Transaction[];
  total: number;
}

export async function getWallet(token: string): Promise<WalletResponse> {
  return get<WalletResponse>('/wallet', token);
}

export async function getTransactions(token: string): Promise<TransactionsResponse> {
  return get<TransactionsResponse>('/transactions', token);
}
