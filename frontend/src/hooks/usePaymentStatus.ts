import { useEffect, useState, useCallback } from 'react';
import { getPaymentStatus, type PaymentStatusResponse } from '@/lib/api/wallet';

interface UsePaymentStatusOptions {
  token: string | null;
  paymentId?: string;
  pollInterval?: number; // ms between checks
}

export function usePaymentStatus({ token, paymentId, pollInterval = 5000 }: UsePaymentStatusOptions) {
  const [status, setStatus] = useState<PaymentStatusResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkStatus = useCallback(async () => {
    if (!token || !paymentId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getPaymentStatus(token, paymentId);
      setStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check payment status');
    } finally {
      setLoading(false);
    }
  }, [token, paymentId]);

  useEffect(() => {
    if (!token || !paymentId) return;

    // Initial check
    checkStatus();

    // Set up polling
    const interval = setInterval(checkStatus, pollInterval);

    return () => clearInterval(interval);
  }, [token, paymentId, pollInterval, checkStatus]);

  return { status, loading, error, refetch: checkStatus };
}
