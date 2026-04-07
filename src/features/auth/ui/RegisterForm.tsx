'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useRegister } from '../model/useRegister';

function DarkInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-full h-13.5 rounded-xl bg-[#1f2d35] border border-[#2d3e47] px-4 text-white placeholder-[#4a6275] text-base focus:outline-none focus:border-[#49c8f5] transition-colors"
      {...props}
    />
  );
}

export function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, isLoading, error } = useRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(name, email, password);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <h1 className="text-white text-[28px] font-extrabold text-center mb-6">
        Create account
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <DarkInput
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />
        <DarkInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <DarkInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          autoComplete="new-password"
        />

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-red-400 text-center pt-1"
          >
            {error}
          </motion.p>
        )}

        <div className="pt-1">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-13.5 rounded-xl bg-[#58CC02] shadow-[0_4px_0_#46A302] text-white text-sm font-extrabold uppercase tracking-widest hover:bg-[#61d900] active:shadow-none active:translate-y-0.75 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            Get started
          </button>
        </div>
      </form>

      <p className="text-[#4a6275] text-xs text-center mt-6 leading-relaxed">
        By creating an account you agree to our{' '}
        <a href="/terms" className="text-[#6a8a9a] hover:text-white underline transition-colors">
          Terms
        </a>{' '}
        and{' '}
        <a href="/privacy" className="text-[#6a8a9a] hover:text-white underline transition-colors">
          Privacy Policy
        </a>
        .
      </p>
    </motion.div>
  );
}
