import { useState, useEffect } from 'react';
import { FarcasterResponse } from '@/lib/farcaster';

interface UseFarcasterCastsOptions {
  fid: string;
}

export function useFarcasterCasts({ fid }: UseFarcasterCastsOptions) {
  const [data, setData] = useState<FarcasterResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchCasts = async () => {
      if (!fid) {
        setError('FID is required');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/farcaster/casts?fid=${fid}`, {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
          },
        });

        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.error || 'Failed to fetch Farcaster casts');
        }

        if (!json.casts) {
          throw new Error('Invalid response format from Farcaster API');
        }

        setData(json);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        setError(err instanceof Error ? err.message : 'An error occurred while fetching casts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCasts();

    return () => {
      controller.abort();
    };
  }, [fid]);

  return { data, error, isLoading };
}