'use client';

import { Sparkles } from 'lucide-react';

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center border-b border-gray-100 bg-white/80 px-4 backdrop-blur-md lg:hidden">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
          <Sparkles className="h-4 w-4 text-[#2D2D2D]" />
        </div>
        <span className="font-bold text-gray-900">StudAI</span>
      </div>
    </header>
  );
}
