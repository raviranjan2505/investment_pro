'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/Input';
import { apiRequest, ApiRequestError } from '@/lib/api/client';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      const response = await apiRequest('/auth/forgot-password', {
        method: 'POST',
        body: { email: email.trim().toLowerCase() },
      });
      console.log('Forgot password response:', response);
      setMessage('If the email exists, a reset link has been sent.');
      setEmail('');
    } catch (err) {
      if (err instanceof ApiRequestError) {
        setError(err.message);
      } else {
        setError(err instanceof Error ? err.message : 'An error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='shell py-16'>
      <div className='mx-auto max-w-md rounded-4xl border border-slate-200 bg-white p-8 shadow-xl'>
        <div className='space-y-4 text-center'>
          <h1 className='text-3xl font-semibold text-slate-900'>Reset Password</h1>
          <p className='text-sm leading-6 text-slate-500'>Enter your email address and we'll send you a link to reset your password.</p>
        </div>

        {error && <div className='rounded-2xl bg-rose-50 p-4 text-sm text-rose-700'>{error}</div>}
        {message && <div className='rounded-2xl bg-green-50 p-4 text-sm text-green-700'>{message}</div>}

        <form className='space-y-5 mt-6' onSubmit={handleSubmit}>
          <div>
            <label className='mb-2 block text-sm font-medium text-slate-700'>Email</label>
            <Input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='admin@example.com'
              required
            />
          </div>

          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>

        <div className='mt-6 text-center text-sm text-slate-500'>
          Back to{' '}
          <button onClick={() => router.push('/login')} className='text-blue-600 hover:underline'>
            login
          </button>
        </div>
      </div>
    </main>
  );
}
