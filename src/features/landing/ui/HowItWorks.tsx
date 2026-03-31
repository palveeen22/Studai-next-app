import { motion } from 'framer-motion';
import { FeatureBlockIcon } from './Feature/FeatureBlockIcon';

export const HowItWorks = () => {
  return (
    <section className="py-24">
      <div className="mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-4xl sm:text-5xl font-extrabold text-[#58CC02] leading-tight tracking-widest mb-3">
            How it works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D2D2D]">
            Three steps to better grades
          </h2>
        </motion.div>

        <div className="space-y-0">
          <FeatureBlockIcon
            title="Create your subjects & tasks"
            description="Organize everything by subject with color-coded cards. Set deadlines, track completion, and see your progress at a glance."
            iconText="📚"
            iconPosition="right"
            titleColor="#left"
          />

          <FeatureBlockIcon
            title="Let AI supercharge your learning"
            description="Paste your notes to generate instant summaries and quizzes. Chat with the AI tutor when you get stuck on a concept."
            iconText="🤖"
            iconPosition="left"
            titleColor="#1CB0F6"
          />

          <FeatureBlockIcon
            title="Build streaks & crush your goals"
            description="Take daily quizzes to build knowledge day by day. Track your streaks on a Duolingo-style path and watch your progress soar."
            iconText="🔥"
            iconPosition="right"
            titleColor="#F5C542"
          />
        </div>
      </div>
    </section>
  )
}