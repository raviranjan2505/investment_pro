'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

import {
  getWallet,
  getTransactions,
  type WalletResponse,
  type TransactionsResponse,
} from '@/lib/api/wallet';

import {
  listInvestments,
  type InvestmentsListResponse,
} from '@/lib/api/investment';

import {
  TrendingUp,
  Wallet,
  Target,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();

  const {
    user,
    isAuthenticated,
    isHydrated,
    getToken,
  } = useAuthStore();

  const [wallet, setWallet] = useState<WalletResponse | null>(null);
  const [investments, setInvestments] = useState<InvestmentsListResponse | null>(null);
  const [transactions, setTransactions] = useState<TransactionsResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated || !user) {
      router.replace('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const token = getToken();

        if (!token) {
          router.replace('/login');
          return;
        }

        const [walletData, investmentData, transactionData] =
          await Promise.all([
            getWallet(token),
            listInvestments(token),
            getTransactions(token),
          ]);

        setWallet(walletData);
        setInvestments(investmentData);
        setTransactions(transactionData);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load dashboard'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isHydrated, isAuthenticated, user, router, getToken]);

  /* ---------------- LOADING ---------------- */

  if (!isHydrated || loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-7xl mx-auto animate-pulse space-y-6">
          <div className="h-32 bg-gray-300 rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-300 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) return null;

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name} 👋
          </h1>
          <p className="text-gray-600">
            Manage your investments and track your wealth growth
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          {/* Balance */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between mb-4">
              <h3 className="text-gray-600 font-semibold">Total Balance</h3>
              <Wallet className="text-blue-600" />
            </div>

            <p className="text-3xl font-bold">
              ₹{wallet?.balance?.toLocaleString() ?? '0'}
            </p>
          </div>

          {/* Invested */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between mb-4">
              <h3 className="text-gray-600 font-semibold">Total Invested</h3>
              <Target className="text-green-600" />
            </div>

            <p className="text-3xl font-bold">
              ₹{wallet?.totalInvested?.toLocaleString() ?? '0'}
            </p>
          </div>

          {/* Returns */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between mb-4">
              <h3 className="text-gray-600 font-semibold">Total Returns</h3>
              <TrendingUp className="text-purple-600" />
            </div>

            <p className="text-3xl font-bold">
              ₹{wallet?.totalReturns?.toLocaleString() ?? '0'}
            </p>
          </div>

          {/* Available */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between mb-4">
              <h3 className="text-gray-600 font-semibold">Available</h3>
              <DollarSign className="text-orange-600" />
            </div>

            <p className="text-3xl font-bold">
              ₹{wallet?.availableBalance?.toLocaleString() ?? '0'}
            </p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Investments */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-6">Recent Investments</h2>

            {investments?.items?.length ? (
              <div className="space-y-4">
                {investments.items.slice(0, 5).map((inv) => (
                  <div
                    key={inv.id}
                    className="flex justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{inv.planName}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(inv.investedAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold">
                        ₹{inv.amount.toLocaleString()}
                      </p>
                      <p className="text-green-600 text-sm">
                        {inv.returnPercentage}% return
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No investments yet
              </p>
            )}
          </div>

          {/* Transactions */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold mb-4">Recent Transactions</h3>

            {transactions?.items?.length ? (
              <div className="space-y-3">
                {transactions.items.slice(0, 5).map((tx) => (
                  <div
                    key={tx.id}
                    className="flex justify-between text-sm"
                  >
                    <div className="flex gap-2 items-center">
                      {tx.type === 'deposit' || tx.type === 'return' ? (
                        <ArrowDownLeft className="text-green-600 w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="text-red-600 w-4 h-4" />
                      )}

                      <span>{tx.description}</span>
                    </div>

                    <span
                      className={
                        tx.type === 'deposit' || tx.type === 'return'
                          ? 'text-green-600 font-semibold'
                          : 'text-red-600 font-semibold'
                      }
                    >
                      {tx.type === 'deposit' || tx.type === 'return'
                        ? '+'
                        : '-'}
                      ₹{tx.amount}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                No transactions yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}