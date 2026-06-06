'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { getPlans, type InvestmentPlan } from '@/lib/api/plans';
import { invest } from '@/lib/api/investment';
import { AlertCircle, CheckCircle, Loader } from 'lucide-react';

export default function InvestPage() {
  const router = useRouter();
  const params = useParams();
  const planslug = params.slug as string;
  const { isAuthenticated, getToken } = useAuthStore();
  
  const [plan, setPlan] = useState<InvestmentPlan | null>(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchPlan = async () => {
      try {
        const data = await getPlans();
        console.log('Fetched plans:', data);
        const foundPlan = data.items.find((p) => p.slug === planslug);
        if (!foundPlan) {
          setError('Plan not found');
          return;
        }
        setPlan(foundPlan);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load plan');
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [isAuthenticated, planslug, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!plan) {
      setError('Plan not found');
      return;
    }

    const investmentAmount = parseFloat(amount);
    if (!investmentAmount || investmentAmount < plan.minAmount) {
      setError(`Minimum investment amount is ₹${plan.minAmount.toLocaleString()}`);
      return;
    }

    if (investmentAmount > plan.maxAmount) {
      setError(`Maximum investment amount is ₹${plan.maxAmount.toLocaleString()}`);
      return;
    }

    setSubmitting(true);

    try {
      const token = getToken();
      if (!token) {
        router.push('/login');
        return;
      }

      const result = await invest(plan.slug, investmentAmount, token);
      setSuccess('Investment successful! Redirecting to dashboard...');
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Investment failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Loader className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-4 text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Back
          </button>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
            {error || 'Plan not found'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="mb-4 text-blue-600 hover:text-blue-700 font-semibold"
        >
          ← Back
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h1>
          <p className="text-gray-600 mb-8">{plan.description}</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <p className="text-green-700">{success}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-blue-50 rounded-lg">
            <div>
              <p className="text-gray-600 text-sm">Min Investment</p>
              <p className="text-2xl font-bold text-gray-900">₹{plan.minAmount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Max Investment</p>
              <p className="text-2xl font-bold text-gray-900">₹{plan.maxAmount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Returns</p>
              <p className="text-2xl font-bold text-green-600">{plan.returnPercentage}%</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Duration</p>
              <p className="text-2xl font-bold text-gray-900">{plan.duration} {plan.durationUnit}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Investment Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-500 text-lg">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  min={plan.minAmount}
                  max={plan.maxAmount}
                  step="100"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={submitting}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Min: ₹{plan.minAmount.toLocaleString()} | Max: ₹{plan.maxAmount.toLocaleString()}
              </p>
            </div>

            {plan.features && plan.features.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Plan Features</h3>
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" required disabled={submitting} />
              <span className="text-sm text-gray-700">
                I agree to the terms and conditions and understand the risks involved in this investment.
              </span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Processing...' : `Invest ₹${amount || '0'}`}
            </button>
          </form>

          {/* Risk Disclaimer */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Risk Warning:</strong> Investments are subject to market risks. Past performance does not guarantee future results. 
              Please consult with a financial advisor before investing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
