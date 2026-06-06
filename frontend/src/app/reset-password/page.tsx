'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/Input';
import { apiRequest, ApiRequestError } from '@/lib/api/client';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (!token) {
      setError('Invalid or missing reset token.');
      return;
    }

    setIsLoading(true);

    try {
      await apiRequest('/auth/reset-password', {
        method: 'POST',
        body: { token, newPassword: password },
      });

      setMessage('Password reset successfully! Redirecting to login...');
      setTimeout(() => router.push('/login'), 2000);
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

  if (!token) {
    return (
      <main className='shell py-16'>
        <div className='mx-auto max-w-md rounded-4xl border border-slate-200 bg-white p-8 shadow-xl'>
          <div className='text-center'>
            <p className='text-sm text-rose-700'>Invalid or missing reset token. Please try again.</p>
            <button onClick={() => router.push('/forgot-password')} className='mt-4 text-blue-600 hover:underline'>
              Back to forgot password
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='shell py-16'>
      <div className='mx-auto max-w-md rounded-4xl border border-slate-200 bg-white p-8 shadow-xl'>
        <div className='space-y-4 text-center'>
          <h1 className='text-3xl font-semibold text-slate-900'>Create New Password</h1>
          <p className='text-sm leading-6 text-slate-500'>Enter your new password below.</p>
        </div>

        {error && <div className='rounded-2xl bg-rose-50 p-4 text-sm text-rose-700'>{error}</div>}
        {message && <div className='rounded-2xl bg-green-50 p-4 text-sm text-green-700'>{message}</div>}

        <form className='space-y-5 mt-6' onSubmit={handleSubmit}>
          <div>
            <label className='mb-2 block text-sm font-medium text-slate-700'>New Password</label>
            <Input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter new password'
              required
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-slate-700'>Confirm Password</label>
            <Input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm new password'
              required
            />
          </div>

          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      </div>
    </main>
  );
}
