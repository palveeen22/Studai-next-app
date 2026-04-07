'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';

// ─── MessageBubble ────────────────────────────────────────────────────────────

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

export function MessageBubble({ role, content, isStreaming }: MessageBubbleProps) {
  const isUser = role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, x: isUser ? 16 : -16 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.2 }}
      className={cn('flex gap-2.5', isUser ? 'flex-row-reverse' : 'flex-row')}
    >
      {/* Avatar */}
      <div className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base leading-none',
        isUser ? 'bg-[#27355B] shadow-[0_3px_0_#172140]' : 'bg-white border-2 border-[#E8ECF4]'
      )}>
        {isUser ? '🙋' : '🤖'}
      </div>

      {/* Bubble */}
      <div className={cn(
        'max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
        isUser
          ? 'bg-[#27355B] text-white rounded-br-md shadow-[0_3px_0_#172140]'
          : 'bg-white text-[#27355B] rounded-bl-md border-2 border-[#E8ECF4] shadow-[0_3px_0_#D1D7E8]'
      )}>
        <div className="whitespace-pre-wrap font-medium">{content}</div>
        {isStreaming && (
          <span className="inline-flex gap-0.5 ml-1 items-center">
            {[0, 0.15, 0.3].map((delay) => (
              <motion.span
                key={delay}
                className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-60"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.9, repeat: Infinity, delay }}
              />
            ))}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ─── ChatInput ────────────────────────────────────────────────────────────────

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!message.trim() || disabled) return;
    onSend(message.trim());
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => { inputRef.current?.focus(); }, [disabled]);

  const canSend = !!message.trim() && !disabled;

  return (
    <div className="flex items-end gap-2 border-t-2 border-[#E8ECF4] bg-white px-4 py-3">
      <textarea
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask your tutor anything…"
        rows={1}
        disabled={disabled}
        className="flex-1 resize-none rounded-xl border-2 border-[#E2E8F0] bg-[#fafafa] px-4 py-2.5 text-sm text-[#27355B] placeholder-[#B0BDD4] font-medium focus:border-[#27355B] focus:outline-none transition-colors disabled:opacity-50"
        style={{ maxHeight: '120px' }}
      />
      <button
        onClick={handleSend}
        disabled={!canSend}
        className={cn(
          'h-11 w-11 shrink-0 flex items-center justify-center rounded-xl transition-all select-none',
          canSend
            ? 'bg-[#27355B] shadow-[0_4px_0_#172140] text-white hover:bg-[#2f3f6e] active:shadow-none active:translate-y-0.75'
            : 'bg-[#EEF2FA] text-[#C5CEDD] cursor-not-allowed'
        )}
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
          <path fill="currentColor" d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
        </svg>
      </button>
    </div>
  );
}
