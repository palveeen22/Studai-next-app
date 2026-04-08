'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, ArrowRight, Lock } from 'lucide-react';
import type { QuizQuestion, PreparationGoal } from '@/shared/types';
import { DAILY_QUIZ } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';
import { ButtonCustom } from '@/shared/ui/buttonCustom';
import { Textarea, Label } from '@/shared/ui/components';
import { QuizOption, QuizScoreCard, QuizProgress } from '@/entities/quiz';
import { useAIGate } from '@/features/subscription/hooks/useAIGate';

// ============================================
// QuizInputPanel
// ============================================
interface QuizInputPanelProps {
  onSubmit: (text: string, count: number, goal: PreparationGoal) => void;
  isLoading: boolean;
}

export function QuizInputPanel({ onSubmit, isLoading }: QuizInputPanelProps) {
  const [text, setText] = useState('');
  const [count, setCount] = useState(10);
  const [goal, setGoal] = useState<PreparationGoal>('practice');

  const GOAL_ICONS: Record<string, string> = {
    interview: '🎯', exam: '📝', test: '✅', practice: '💪',
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-[#E8ECF4] shadow-[0_4px_0_#D1D7E8] p-6 space-y-5">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-[#F5C542]" />
        <h3 className="text-base font-extrabold text-[#27355B]">Generate Quiz</h3>
      </div>

      <div className="space-y-1.5">
        <Label className="text-[10px] font-extrabold text-[#7B8FB5] uppercase tracking-widest">
          Study Material
        </Label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your study material here…"
          rows={6}
          className="border-2 border-[#E2E8F0] rounded-xl focus-visible:ring-0 focus-visible:border-[#27355B] text-[#27355B] placeholder-[#B0BDD4] resize-none"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-[10px] font-extrabold text-[#7B8FB5] uppercase tracking-widest">
            Questions
          </Label>
          <span className="text-sm font-extrabold text-[#27355B]">{count}</span>
        </div>
        <input
          type="range"
          min={5}
          max={20}
          step={1}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-full accent-[#27355B] h-2"
        />
        <div className="flex justify-between text-[10px] font-bold text-[#B0BDD4]">
          <span>5</span>
          <span>20</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-[10px] font-extrabold text-[#7B8FB5] uppercase tracking-widest">
          Goal
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {DAILY_QUIZ.preparationGoals.map((g) => (
            <button
              key={g.value}
              onClick={() => setGoal(g.value as PreparationGoal)}
              className={cn(
                'flex items-center gap-2 rounded-xl border-2 p-3 text-sm font-extrabold transition-all',
                goal === g.value
                  ? 'border-[#F5C542] bg-[#FFFBEB] text-[#27355B] shadow-[0_2px_0_#CFA830]'
                  : 'border-[#E2E8F0] text-[#7B8FB5] hover:border-[#F5C542]/50'
              )}
            >
              <span>{GOAL_ICONS[g.value]}</span>
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <ButtonCustom
        onClick={() => onSubmit(text, count, goal)}
        disabled={!text.trim() || isLoading}
        color="gold"
        size="lg"
        className="w-full"
      >
        {isLoading ? (
          <><Loader2 className="h-4 w-4 animate-spin" />Generating…</>
        ) : (
          <><Sparkles className="h-4 w-4" />Generate Quiz</>
        )}
      </ButtonCustom>
    </div>
  );
}

// ============================================
// QuizPlayView
// ============================================
interface QuizPlayViewProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

const FREE_EXPLANATIONS = 2;

export function QuizPlayView({ questions, onComplete }: QuizPlayViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [explanationsUsed, setExplanationsUsed] = useState(0);
  const { isPremium } = useAIGate();

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const handleSelect = (index: number) => {
    if (revealed) return;
    setSelectedOption(index);
  };

  const handleConfirm = () => {
    if (selectedOption === null) return;

    if (!revealed) {
      setRevealed(true);
      setExplanationsUsed((n) => n + 1);
      if (selectedOption === question.correctIndex) setScore((s) => s + 1);
      return;
    }

    if (!isLast) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setRevealed(false);
    } else {
      setFinished(true);
      onComplete(score + (selectedOption === question.correctIndex && !revealed ? 1 : 0));
    }
  };

  if (finished) {
    return <QuizScoreCard score={score} total={questions.length} />;
  }

  const isCorrect = revealed && selectedOption === question.correctIndex;

  return (
    <div className="space-y-5">
      <QuizProgress current={currentIndex + 1} total={questions.length} />

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
        className="space-y-4"
      >
        {/* Question card */}
        <div className="bg-white rounded-2xl border-2 border-[#E8ECF4] shadow-[0_4px_0_#D1D7E8] p-5">
          <p className="text-[10px] font-extrabold text-[#7B8FB5] uppercase tracking-widest mb-2">
            Question {currentIndex + 1}
          </p>
          <h3 className="text-base font-extrabold text-[#27355B] leading-snug">
            {question.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {question.options.map((option, i) => (
            <QuizOption
              key={i}
              label={option}
              index={i}
              selected={selectedOption === i}
              correct={revealed ? i === question.correctIndex : null}
              onSelect={() => handleSelect(i)}
              disabled={revealed}
            />
          ))}
        </div>

        {/* Explanation */}
        {revealed && question.explanation && (() => {
          const isLocked = !isPremium && explanationsUsed > FREE_EXPLANATIONS;
          return (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'relative rounded-2xl p-4 text-sm font-medium border-2 overflow-hidden',
                isCorrect
                  ? 'bg-[#F0FDF4] border-[#58CC02]/30 text-[#166534]'
                  : 'bg-[#FFF8F0] border-[#FF9600]/30 text-[#7C3A00]'
              )}
            >
              <div className={cn(isLocked && 'blur-[6px] opacity-40 select-none pointer-events-none')}>
                <p className="font-extrabold mb-1">{isCorrect ? '✅ Correct!' : '❌ Not quite'}</p>
                {question.explanation}
              </div>
              {isLocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/30 backdrop-blur-[1px]">
                  <div className="flex items-center gap-2 rounded-xl bg-[#27355B] px-4 py-2.5 shadow-lg">
                    <Lock className="h-4 w-4 text-[#F5C542]" />
                    <span className="text-xs font-extrabold text-white">Get Premium to unlock</span>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })()}

        {/* CTA */}
        <ButtonCustom
          onClick={handleConfirm}
          disabled={selectedOption === null}
          color={!revealed ? 'navy' : isCorrect ? 'green' : 'gold'}
          size="lg"
          className="w-full"
        >
          {!revealed ? 'Check Answer' : !isLast ? (
            <><span>Next</span><ArrowRight className="h-4 w-4" /></>
          ) : 'See Results'}
        </ButtonCustom>
      </motion.div>
    </div>
  );
}
