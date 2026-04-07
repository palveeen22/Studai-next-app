'use client';

import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';
import type { DailyQuizResult } from '@/shared/types';

interface DuolingoPathProps {
  totalDays: number;
  results: DailyQuizResult[];
  onPlayDay: (dayIndex: number) => void;
  topic?: string;
}

type NodeStatus = 'completed' | 'current' | 'locked';
type NodeType = 'star' | 'chest' | 'crown' | 'book';

// ─── Layout constants ─────────────────────────────────────────────────────────
const W = 300;          // inner path column width (px)
const CX = W / 2;      // center x
const SPACING = 112;   // vertical distance between node centers (px)
const PAD_TOP = 86;    // space above first node (for START tooltip)
const PAD_BOT = 56;    // space below last node
// Gentle Duolingo-like zigzag: stays close to center
const OFFSETS = [0, -38, -58, -38, 0, 38, 58, 38];

function nodeType(i: number, total: number): NodeType {
  if (i === total - 1) return 'crown';
  if ((i + 1) % 7 === 0) return 'chest';
  if ((i + 1) % 4 === 0) return 'book';
  return 'star';
}

// ─── Inline SVG icons ─────────────────────────────────────────────────────────

function StarSvg({ dim }: { dim?: boolean }) {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24">
      <path
        fill={dim ? '#4a6070' : 'white'}
        d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"
      />
    </svg>
  );
}

function CrownSvg({ dim }: { dim?: boolean }) {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24">
      <path
        fill={dim ? '#4a6070' : 'white'}
        d="M5 16h14l2-9-4 4-3-7-3 7-4-4-2 9zm0 2v2h14v-2H5z"
      />
    </svg>
  );
}

function BookSvg({ dim }: { dim?: boolean }) {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24">
      <path
        fill={dim ? '#4a6070' : 'white'}
        d="M12 3C9 3 6 4 4 6v13c2-1.5 4.5-2.5 8-2.5S18 17.5 20 19V6c-2-2-5-3-8-3zm-1 13c-2.5 0-4.5.5-6 1.5V7.5C6.5 6.5 8.5 6 11 6v10zm2 0V6c2.5 0 4.5.5 6 1.5V17.5c-1.5-1-3.5-1.5-6-1.5z"
      />
    </svg>
  );
}

// ─── Chest node (rectangle shape) ─────────────────────────────────────────────
function ChestNode({
  status,
  onClick,
}: {
  status: NodeStatus;
  onClick?: () => void;
}) {
  const locked = status === 'locked';
  return (
    <motion.button
      whileHover={!locked ? { scale: 1.06, y: -2 } : undefined}
      whileTap={!locked ? { scale: 0.95, y: 3 } : undefined}
      onClick={!locked ? onClick : undefined}
      disabled={locked}
      className={cn(
        'relative flex flex-col items-center justify-end w-[76px] h-[58px] rounded-2xl select-none overflow-hidden',
        locked
          ? 'bg-[#2a3f50] shadow-[0_5px_0_#1a2c3a] cursor-not-allowed'
          : 'bg-[#f5a623] shadow-[0_5px_0_#bf7d0e]',
      )}
    >
      {/* lid */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 h-[26px] border-b-2',
          locked ? 'bg-[#354f62] border-[#1a2c3a]' : 'bg-[#ffc642] border-[#bf7d0e]',
        )}
      />
      {/* clasp */}
      <div
        className={cn(
          'relative z-10 mb-[10px] w-[18px] h-[18px] rounded-full border-2',
          locked ? 'bg-[#2a3f50] border-[#4a6275]' : 'bg-[#de8c0a] border-[#9c5f05]',
        )}
      />
    </motion.button>
  );
}

// ─── Circle node (star / book / crown) ────────────────────────────────────────
function CircleNode({
  type,
  status,
  score,
  onClick,
}: {
  type: Exclude<NodeType, 'chest'>;
  status: NodeStatus;
  score?: number;
  onClick?: () => void;
}) {
  const locked = status === 'locked';
  const current = status === 'current';
  const completed = status === 'completed';

  const btn = (
    <motion.button
      whileHover={!locked ? { scale: 1.08, y: -2 } : undefined}
      whileTap={!locked ? { scale: 0.95, y: 3 } : undefined}
      onClick={!locked ? onClick : undefined}
      disabled={locked}
      className={cn(
        'relative flex items-center justify-center rounded-full select-none',
        current  && 'h-[76px] w-[76px] bg-[#58CC02] shadow-[0_5px_0_#46A302]',
        completed && 'h-[68px] w-[68px] bg-[#58CC02] shadow-[0_5px_0_#46A302]',
        locked   && 'h-[68px] w-[68px] bg-[#2a3f50] shadow-[0_5px_0_#1a2c3a] cursor-not-allowed',
      )}
    >
      {type === 'star'  && <StarSvg  dim={locked} />}
      {type === 'crown' && <CrownSvg dim={locked} />}
      {type === 'book'  && <BookSvg  dim={locked} />}

      {completed && score !== undefined && (
        <span className="absolute -top-2 -right-1 min-w-[24px] h-6 flex items-center justify-center rounded-full bg-white px-1.5 text-[10px] font-extrabold text-[#46A302] shadow border border-[#46A302]/20">
          {score}%
        </span>
      )}
    </motion.button>
  );

  // Active node gets a dark bezel ring (like Duolingo's coin ring)
  if (current) {
    return (
      <div className="flex items-center justify-center h-[96px] w-[96px] rounded-full bg-[#162533] shadow-[0_6px_0_#0c1820]">
        {btn}
      </div>
    );
  }

  return btn;
}

// ─── Main component ───────────────────────────────────────────────────────────
export function DuolingoPath({ totalDays, results, onPlayDay, topic }: DuolingoPathProps) {
  const completedSet = new Set(results.map((r) => r.day_index));
  const currentDay = results.length;

  const getStatus = (i: number): NodeStatus => {
    if (completedSet.has(i)) return 'completed';
    if (i === currentDay && currentDay < totalDays) return 'current';
    return 'locked';
  };

  const getScore = (i: number) => {
    const r = results.find((r) => r.day_index === i);
    if (!r || r.total_questions === 0) return undefined;
    return Math.round((r.score / r.total_questions) * 100);
  };

  const positions = Array.from({ length: totalDays }, (_, i) => ({
    x: CX + OFFSETS[i % OFFSETS.length],
    y: PAD_TOP + i * SPACING,
  }));

  const containerH = PAD_TOP + (totalDays - 1) * SPACING + 96 + PAD_BOT;

  // Mascot sits next to the node one step ahead of the current active one
  const mascotIdx = Math.min(currentDay + 1, totalDays - 1);

  return (
    <div className="w-full rounded-none lg:rounded-3xl bg-[#0f1f26] overflow-hidden">
      {/* ── Centered path column ── */}
      <div className="relative mx-auto" style={{ width: W, height: containerH }}>
        {positions.map((pos, i) => {
          const status = getStatus(i);
          const type = nodeType(i, totalDays);
          const score = getScore(i);
          const isLeft = pos.x < CX;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.55 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.045, type: 'spring', stiffness: 260, damping: 22 }}
              className="absolute"
              style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
            >
              {/* START tooltip */}
              {status === 'current' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.045 + 0.25 }}
                  className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
                  style={{ bottom: 'calc(100% + 10px)' }}
                >
                  <div className="bg-[#162533] text-white text-sm font-extrabold px-5 py-2 rounded-xl whitespace-nowrap border border-white/10 shadow-lg tracking-wide">
                    START
                  </div>
                  <div className="w-0 h-0 border-l-[7px] border-r-[7px] border-t-[7px] border-l-transparent border-r-transparent border-t-[#162533]" />
                </motion.div>
              )}

              {/* Node */}
              {type === 'chest' ? (
                <ChestNode status={status} onClick={() => onPlayDay(i)} />
              ) : (
                <CircleNode
                  type={type}
                  status={status}
                  score={score}
                  onClick={() => onPlayDay(i)}
                />
              )}

              {/* Day label */}
              <span
                className={cn(
                  'absolute left-1/2 -translate-x-1/2 text-[11px] font-bold whitespace-nowrap select-none top-full mt-2',
                  status === 'locked' ? 'text-[#3d5a6a]' : 'text-[#7fb5c8]',
                )}
              >
                Day {i + 1}
              </span>

              {/* Mascot (🦉) positioned to the open side of the turn */}
              {i === mascotIdx && (
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? 24 : -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045 + 0.5 }}
                  className="absolute top-1/2 -translate-y-1/2"
                  style={isLeft ? { left: 'calc(100% + 14px)' } : { right: 'calc(100% + 14px)' }}
                >
                  <span className="text-[48px] leading-none" role="img" aria-label="mascot">
                    🦉
                  </span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ── Section divider ── */}
      <div className="flex items-center gap-3 px-6 pt-2 pb-7">
        <div className="flex-1 h-px bg-white/10" />
        {topic && (
          <span className="text-[11px] font-bold text-white/25 uppercase tracking-widest text-center shrink-0 max-w-[160px] leading-tight">
            {topic}
          </span>
        )}
        <div className="flex-1 h-px bg-white/10" />
      </div>
    </div>
  );
}
