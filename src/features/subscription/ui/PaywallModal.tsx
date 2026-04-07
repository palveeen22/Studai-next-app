'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles, Zap, X } from 'lucide-react';
import { Button } from '@/shared/ui/button';

interface PaywallModalProps {
  open: boolean;
  onClose: () => void;
  feature: 'summary' | 'quiz';
}

export function PaywallModal({ open, onClose, feature }: PaywallModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative z-50 mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-2xl bg-accent/10 p-4">
                <Crown className="h-10 w-10 text-accent" />
              </div>

              <h2 className="text-xl font-bold text-gray-900">Upgrade to Premium</h2>
              <p className="mt-2 text-sm text-gray-500">
                You&apos;ve used all your free {feature === 'summary' ? 'summaries' : 'quizzes'} for today.
                Upgrade to get unlimited access.
              </p>

              <div className="mt-6 w-full space-y-3">
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 text-left text-sm">
                  <Sparkles className="h-5 w-5 shrink-0 text-accent" />
                  <span>Unlimited AI summaries & quizzes</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 text-left text-sm">
                  <Zap className="h-5 w-5 shrink-0 text-accent" />
                  <span>Priority AI tutor responses</span>
                </div>
              </div>

              <div className="mt-6 w-full space-y-2">
                <Button variant="accent" className="w-full" onClick={onClose}>
                  Go Premium — $9.99/month
                </Button>
                <Button variant="ghost" className="w-full text-gray-500" onClick={onClose}>
                  Maybe later
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
