'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { ReactElement } from 'react';
import { TrendingUp, Lock, Zap, Users, ArrowRight, CheckCircle } from 'lucide-react';

export default function HomePage(): ReactElement {
  return (
    <main className="bg-linear-to-br from-blue-900 via-blue-800 to-blue-900">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="text-white space-y-8">
            <div>
              <div className="inline-block mb-4 px-4 py-2 bg-blue-400 bg-opacity-20 rounded-full">
                <span className="text-blue-200 text-sm font-semibold">Smart Investment Platform</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
                Grow Your Wealth With Smart Investments
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Invest in high-yield plans, track your returns in real-time, and build your financial future with confidence.
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                href="/signup"
                className="px-8 py-3 bg-blue-400 text-blue-900 font-bold rounded-lg hover:bg-blue-300 transition inline-flex items-center gap-2"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/login"
                className="px-8 py-3 bg-transparent border-2 border-blue-300 text-blue-100 font-bold rounded-lg hover:bg-blue-300 hover:text-blue-900 transition"
              >
                Sign In
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-blue-400 border-opacity-30">
              <div>
                <p className="text-3xl font-bold">₹50K+</p>
                <p className="text-blue-200 text-sm">Active Investors</p>
              </div>
              <div>
                <p className="text-3xl font-bold">18%</p>
                <p className="text-blue-200 text-sm">Average Returns</p>
              </div>
              <div>
                <p className="text-3xl font-bold">₹100Cr+</p>
                <p className="text-blue-200 text-sm">Total Invested</p>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="relative h-96 md:h-full">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-400 to-blue-600 rounded-3xl opacity-20 blur-3xl"></div>
              <div className="absolute inset-4 bg-white rounded-2xl opacity-10 backdrop-blur-sm"></div>
              
              {/* Investment cards visualization */}
              <div className="absolute top-8 left-4 bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-xl p-4 w-64 transform -rotate-3">
                <p className="text-white text-sm font-semibold mb-2">Gold Plan</p>
                <p className="text-blue-200 text-xs mb-3">₹15,000 - ₹19,999</p>
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">18% Returns</span>
                  <span className="text-blue-300 text-xs">60 Days</span>
                </div>
              </div>

              <div className="absolute bottom-12 right-4 bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-xl p-4 w-64 transform rotate-2">
                <p className="text-white text-sm font-semibold mb-2">Platinum Plan</p>
                <p className="text-blue-200 text-xs mb-3">₹20,000+</p>
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">25% Returns</span>
                  <span className="text-blue-300 text-xs">90 Days</span>
                </div>
              </div>

              <div className="absolute top-1/2 right-8 bg-linear-to-br from-green-400 to-blue-500 rounded-full w-24 h-24 flex items-center justify-center shadow-xl">
                <TrendingUp className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-black bg-opacity-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose InvestPro?</h2>
            <p className="text-xl text-blue-200">Everything you need to invest smart and grow wealth</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-xl p-8 hover:bg-opacity-20 transition">
              <div className="bg-blue-400 bg-opacity-20 p-3 rounded-lg w-fit mb-4">
                <Lock className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Secure & Safe</h3>
              <p className="text-blue-200">Your investments are protected with industry-leading security measures and compliance standards.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-xl p-8 hover:bg-opacity-20 transition">
              <div className="bg-blue-400 bg-opacity-20 p-3 rounded-lg w-fit mb-4">
                <Zap className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">High Returns</h3>
              <p className="text-blue-200">Earn competitive returns ranging from 8% to 25% depending on your investment plan.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-xl p-8 hover:bg-opacity-20 transition">
              <div className="bg-blue-400 bg-opacity-20 p-3 rounded-lg w-fit mb-4">
                <Users className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Community</h3>
              <p className="text-blue-200">Join thousands of investors earning passive income and building wealth together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Plans Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Investment Plans</h2>
            <p className="text-xl text-blue-200">Choose the plan that fits your investment goals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Basic Plan */}
            <div className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-xl p-6 hover:bg-opacity-10 transition transform hover:scale-105">
              <h3 className="text-xl font-bold text-white mb-2">Basic Plan</h3>
              <p className="text-blue-300 text-sm mb-4">Min: ₹100 | Max: ₹999</p>
              <p className="text-3xl font-bold text-white mb-2">8%</p>
              <p className="text-blue-200 text-sm mb-6">Returns</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-blue-100 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" /> 30 Days
                </li>
              </ul>
              <Link href="/signup" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition text-center">
                Invest Now
              </Link>
            </div>

            {/* Silver Plan */}
            <div className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-xl p-6 hover:bg-opacity-10 transition transform hover:scale-105">
              <h3 className="text-xl font-bold text-white mb-2">Silver Plan</h3>
              <p className="text-blue-300 text-sm mb-4">Min: ₹1,000 | Max: ₹4,999</p>
              <p className="text-3xl font-bold text-white mb-2">12%</p>
              <p className="text-blue-200 text-sm mb-6">Returns</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-blue-100 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" /> 45 Days
                </li>
              </ul>
              <Link href="/signup" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition text-center">
                Invest Now
              </Link>
            </div>

            {/* Gold Plan */}
            <div className="bg-linear-to-br from-yellow-400 to-yellow-600 rounded-xl p-6 transform scale-105 shadow-2xl">
              <div className="mb-4">
                <span className="bg-white bg-opacity-20 text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Gold Plan</h3>
              <p className="text-yellow-100 text-sm mb-4">Min: ₹5,000 | Max: ₹19,999</p>
              <p className="text-4xl font-bold text-white mb-2">18%</p>
              <p className="text-yellow-100 text-sm mb-6">Returns</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-white text-sm">
                  <CheckCircle className="w-4 h-4" /> 60 Days
                </li>
              </ul>
              <Link href="/signup" className="w-full bg-white text-yellow-600 font-semibold py-2 rounded-lg hover:bg-yellow-50 transition text-center">
                Invest Now
              </Link>
            </div>

            {/* Platinum Plan */}
            <div className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-xl p-6 hover:bg-opacity-10 transition transform hover:scale-105">
              <h3 className="text-xl font-bold text-white mb-2">Platinum Plan</h3>
              <p className="text-blue-300 text-sm mb-4">Min: ₹20,000+</p>
              <p className="text-3xl font-bold text-white mb-2">25%</p>
              <p className="text-blue-200 text-sm mb-6">Returns</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-blue-100 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" /> 90 Days
                </li>
              </ul>
              <Link href="/signup" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition text-center">
                Invest Now
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/plans"
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-400 text-blue-900 font-bold rounded-lg hover:bg-blue-300 transition"
            >
              View All Plans <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-linear-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Investing?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of investors earning passive income today</p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-10 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition text-lg"
          >
            Create Account Now <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </main>
  );
}
