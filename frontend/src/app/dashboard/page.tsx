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
  Plus,
  RotateCw,
  CheckCircle,
  Clock,
} from 'lucide-react';
import AddFundsModal from '@/components/AddFundsModal';

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
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const token = getToken();
      if (!token) {
        router.replace('/login');
        return;
      }

      const [walletData, investmentData, transactionData] = await Promise.all([
        getWallet(token),
        listInvestments(token),
        getTransactions(token),
      ]);

      setWallet(walletData);
      setInvestments(investmentData);
      setTransactions(transactionData);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh dashboard');
    } finally {
      setRefreshing(false);
    }
  };

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

        // Check if any investments just matured
        if (investments && investmentData.items) {
          const previousActive = investments.items?.filter(inv => inv.status === 'active') || [];
          const currentActive = investmentData.items.filter(inv => inv.status === 'active');
          const justMatured = previousActive.length - currentActive.length;
          
          if (justMatured > 0) {
            setNotification({
              message: `🎉 ${justMatured} investment(s) matured! Returns credited to your wallet.`,
              type: 'success'
            });
            setTimeout(() => setNotification(null), 5000);
          }
        }

        setWallet(walletData);
        setInvestments(investmentData);
        setTransactions(transactionData);
        setError('');
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load dashboard'
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };

    fetchData();

    // Poll for investment maturity every 5 minutes
    const pollInterval = setInterval(() => {
      console.log('[Dashboard] Polling for matured investments...');
      fetchData();
    }, 5 * 60 * 1000);

    return () => clearInterval(pollInterval);
  }, [isHydrated, isAuthenticated, user, router, getToken, investments]);

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
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name} 👋
            </h1>
            <p className="text-gray-600">
              Manage your investments and track your wealth growth
            </p>
          </div>
          <button
            onClick={() => setIsAddFundsOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Add Funds
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Notification */}
        {notification && (
          <div className={`mb-6 p-4 rounded-lg border ${
            notification.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-700'
              : 'bg-blue-50 border-blue-200 text-blue-700'
          }`}>
            {notification.message}
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

          {/* Remaining Investment */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between mb-4">
              <h3 className="text-gray-600 font-semibold">Remaining Investment</h3>
              <DollarSign className="text-orange-600" />
            </div>

            <p className="text-3xl font-bold">
              ₹{wallet?.remainingInvestment?.toLocaleString() ?? '0'}
            </p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Investments */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Investments</h2>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
                title="Refresh investments"
              >
                <RotateCw className={`w-5 h-5 text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {investments?.items?.length ? (
              <div className="space-y-4">
                {investments.items.slice(0, 5).map((inv) => (
                  <div
                    key={inv.id}
                    className={`p-4 rounded-lg border-2 transition ${
                      inv.status === 'completed'
                        ? 'bg-green-50 border-green-200'
                        : 'bg-gray-50 border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3">
                          <p className="font-semibold">{inv.planName}</p>
                          {inv.status === 'completed' ? (
                            <div className="flex items-center gap-1 px-2 py-1 bg-green-200 text-green-800 text-xs font-semibold rounded">
                              <CheckCircle className="w-3 h-3" />
                              Completed
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 px-2 py-1 bg-blue-200 text-blue-800 text-xs font-semibold rounded">
                              <Clock className="w-3 h-3" />
                              Active
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Invested: {new Date(inv.investedAt).toLocaleDateString()}
                        </p>
                        {inv.status === 'completed' && (
                          <p className="text-sm text-gray-500">
                            Completed: {new Date(inv.maturityAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>

                      <div className="text-right">
                        <p className="font-bold">
                          ₹{inv.amount.toLocaleString()}
                        </p>
                        <p className="text-green-600 text-sm font-medium">
                          +₹{inv.returns?.toLocaleString()} ({inv.returnPercentage}%)
                        </p>
                      </div>
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

        {/* Add Funds Modal */}
        <AddFundsModal 
          isOpen={isAddFundsOpen}
          onClose={() => setIsAddFundsOpen(false)}
          token={getToken()}
        />
      </div>
    </div>
  );
}