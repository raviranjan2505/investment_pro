import type { ReactElement } from 'react';
import { ArrowRight, Mail, MapPin, Phone, Facebook, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';

export async function SiteFooter(): Promise<ReactElement> {
  return (
    <footer className="bg-blue-900 text-white border-t border-blue-700">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Newsletter Section */}
        <div className="bg-linear-to-r from-blue-800 to-blue-700 rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-3">Subscribe to our newsletter</h3>
              <p className="text-blue-100">Get investment tips, market updates, and exclusive offers directly to your inbox.</p>
            </div>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <button className="bg-yellow-400 text-blue-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition inline-flex items-center gap-2">
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h4 className="text-xl font-bold mb-4">{APP_NAME}</h4>
            <p className="text-blue-100 mb-4">Grow your wealth with smart investments. Secure, transparent, and profitable.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-300 transition"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-300 transition"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-300 transition"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-blue-100">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/plans" className="hover:text-white transition">Plans</Link></li>
              <li><Link href="/login" className="hover:text-white transition">Login</Link></li>
              <li><Link href="/signup" className="hover:text-white transition">Sign Up</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-blue-100">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 1800-123-4567</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@investpro.com</li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-blue-100">
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition">Disclaimer</Link></li>
              <li><Link href="/compliance" className="hover:text-white transition">Compliance</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-blue-100">© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
            <div className="flex items-center gap-2 mt-4 md:mt-0 text-blue-100">
              <MapPin className="w-4 h-4" />
              <span>Bengaluru, India</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-8 border-t border-blue-700 text-xs text-blue-200">
          <p>
            <strong>Disclaimer:</strong> This platform is for informational purposes only. Past performance does not guarantee future results. 
            Invest at your own risk. Please consult with a financial advisor before making investment decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
