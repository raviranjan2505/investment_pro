'use client';

import type { ReactElement } from 'react';
import { useState } from 'react';
import { Menu, X, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import { HeaderAuthActions } from '@/components/layout/header-auth-actions';

export function SiteHeader(): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-blue-200/30 bg-linear-to-r from-blue-900 to-blue-800 text-white">
      <div className="px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl hover:text-blue-100 transition">
            <BarChart3 className="w-8 h-8" />
            {APP_NAME}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/plans" className="hover:text-blue-100 transition font-medium">
              Plans
            </Link>
            <Link href="/dashboard" className="hover:text-blue-100 transition font-medium">
              Dashboard
            </Link>
            <Link href="/#features" className="hover:text-blue-100 transition font-medium">
              Features
            </Link>
          </nav>

          {/* Auth Actions */}
          <div className="hidden md:block">
            <HeaderAuthActions />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-blue-700 rounded-lg transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3 border-t border-blue-700 pt-4">
            <Link href="/plans" className="block hover:text-blue-100 transition font-medium">
              Plans
            </Link>
            <Link href="/dashboard" className="block hover:text-blue-100 transition font-medium">
              Dashboard
            </Link>
            <Link href="/#features" className="block hover:text-blue-100 transition font-medium">
              Features
            </Link>
            <div className="pt-3 border-t border-blue-700">
              <HeaderAuthActions />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
