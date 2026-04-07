'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/shared/supabase/client';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  async function login(email: string, password: string) {
    setIsLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setIsLoading(false);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  }

  return { login, isLoading, error };
}
