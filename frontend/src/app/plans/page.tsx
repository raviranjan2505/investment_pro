'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { getPlans, type InvestmentPlan } from '@/lib/api/plans';
import { CheckCircle, Loader } from 'lucide-react';

export default function PlansPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [plans, setPlans] = useState<InvestmentPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getPlans();
        setPlans(data.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load plans');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleInvest = (slug: string) => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    // Navigate to investment form
    router.push(`/invest/${slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading investment plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Investment Plans</h1>
          <p className="text-xl text-gray-600">Choose the perfect plan for your investment goals</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {plans.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No investment plans available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => {
              const isPopular = plan.returnPercentage >= 18;
              return (
                <div
                  key={plan.id}
                  className={`rounded-2xl p-6 transition transform hover:scale-105 ${
                    isPopular
                      ? 'bg-linear-to-br from-yellow-400 to-yellow-600 text-white shadow-2xl scale-105'
                      : 'bg-white text-gray-900 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isPopular && (
                    <div className="mb-4">
                      <span className="inline-block bg-white bg-opacity-20 text-white text-xs font-bold px-3 py-1 rounded-full">
                        POPULAR
                      </span>
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className={`mb-4 ${isPopular ? 'text-yellow-100' : 'text-gray-600'} text-sm`}>
                    Min: ₹{plan.minAmount.toLocaleString()} | Max: ₹{plan.maxAmount.toLocaleString()}
                  </p>

                  <div className="mb-6">
                    <p className={`${isPopular ? 'text-5xl' : 'text-4xl'} font-bold mb-2`}>
                      {plan.returnPercentage}%
                    </p>
                    <p className={`text-sm ${isPopular ? 'text-yellow-100' : 'text-gray-600'}`}>
                      Returns
                    </p>
                  </div>

                  <div className="mb-6 pb-6 border-b border-current border-opacity-20">
                    <p className={`${isPopular ? 'text-yellow-100' : 'text-gray-600'} text-sm font-semibold`}>
                      Duration: {plan.duration} {plan.durationUnit}
                    </p>
                  </div>

                  {plan.features && (
                    <ul className="space-y-3 mb-6">
                      {plan.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${isPopular ? 'text-white' : 'text-green-600'}`} />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <button
                    onClick={() => handleInvest(plan.slug)}
                    className={`w-full font-semibold py-3 rounded-lg transition ${
                      isPopular
                        ? 'bg-white text-yellow-600 hover:bg-yellow-50'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isAuthenticated ? 'Invest Now' : 'Sign Up to Invest'}
                  </button>

                  {plan.description && (
                    <p className={`mt-4 text-xs ${isPopular ? 'text-yellow-100' : 'text-gray-600'}`}>
                      {plan.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        {isAuthenticated && (
          <div className="mt-12 text-center">
            <Link
              href="/dashboard"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Go to Dashboard
            </Link>
          </div>
        )}

        {!isAuthenticated && (
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Ready to start investing?</p>
            <Link
              href="/signup"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Create Account
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
