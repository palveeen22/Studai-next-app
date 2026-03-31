'use client';

import { Navbar } from '@/widgets/navbar';
import { HeroSection } from './HeroSection';
import { FeatureSection } from './Feature/FeatureSection';
import { HowItWorks } from './HowItWorks';
import { PremiumSection } from './PremiumSection';
import { FooterLanding } from '@/widgets/footer';
import { ReadyToSection } from './ReadyToSection';


// const fadeUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
//   }),
// };

// const scaleIn = {
//   hidden: { opacity: 0, scale: 0.8 },
//   visible: (i: number) => ({
//     opacity: 1,
//     scale: 1,
//     transition: { delay: i * 0.08, duration: 0.5, type: 'spring' as const, stiffness: 200 },
//   }),
// };

// const features = [
//   {
//     icon: BookOpen,
//     title: 'Smart Tasks',
//     description: 'Organize your study tasks by subject with color-coded categories, deadlines, and progress tracking.',
//     color: '#2ECC71',
//     bg: '#D4F5E9',
//   },
//   {
//     icon: Sparkles,
//     title: 'AI Summaries',
//     description: 'Paste any text and get instant bullet-point summaries. Study smarter, not harder.',
//     color: '#F5C542',
//     bg: '#FFF9DB',
//   },
//   {
//     icon: BrainCircuit,
//     title: 'AI Quizzes',
//     description: 'Generate multiple-choice quizzes from your notes. Pick your goal: exam, interview, or practice.',
//     color: '#3498DB',
//     bg: '#D6EEFF',
//   },
//   {
//     icon: MessageCircle,
//     title: 'AI Tutor',
//     description: 'Chat with a patient AI study buddy that explains concepts with analogies and real-world examples.',
//     color: '#9B59B6',
//     bg: '#EDE7F6',
//   },
//   {
//     icon: Flame,
//     title: 'Daily Streaks',
//     description: 'Duolingo-style daily quiz challenges with streak tracking and progressive difficulty.',
//     color: '#E67E22',
//     bg: '#FFE8D6',
//   },
//   {
//     icon: Timer,
//     title: 'Pomodoro Timer',
//     description: 'Stay focused with timed study sessions, break management, and beautiful progress rings.',
//     color: '#E74C3C',
//     bg: '#FFE0E6',
//   },
// ];


export function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <HowItWorks />

      {/* ===== SOCIAL PROOF / TRUST ===== */}
      {/* <section className="py-20 px-6 bg-[#2D2D2D]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-6 w-6 fill-[#F5C542] text-[#F5C542]" />
              ))}
            </div>
            <blockquote className="text-xl sm:text-2xl font-semibold text-white leading-relaxed max-w-2xl mx-auto">
              &ldquo;StudAI turned my chaotic study habits into a system. The daily quizzes
              keep me accountable, and the AI summaries save me hours every week.&rdquo;
            </blockquote>
            <p className="mt-6 text-gray-400 font-medium">— A student who studies smarter now</p>
          </motion.div>
        </div>
      </section> */}

      <PremiumSection />
      <ReadyToSection/>
      <FooterLanding />
    </div>
  );
}