import { motion } from 'framer-motion';
import { ButtonCustom } from '@/shared/ui';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
};

export const HeroSection = () => {
  return (
    <section className="min-h-svh relative flex items-center justify-center px-6 pt-20">

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-[#F5C542]/10 blur-3xl" />
        <div className="absolute top-40 right-[10%] w-96 h-96 rounded-full bg-[#3498DB]/8 blur-3xl" />
        <div className="absolute bottom-0 left-[30%] w-80 h-80 rounded-full bg-[#2ECC71]/8 blur-3xl" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-3xl text-center">

        {/* Emoji */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-8xl mb-6"
        >
          👨‍💻👩‍💻
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2D2D2D] tracking-tight leading-tight"
        >
          Tasks, Quizzes,{' '}
          <span className="relative inline-block">
            AI help
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
              className="absolute bottom-1 left-0 right-0 h-4 bg-[#F5C542]/40 origin-left rounded-sm -z-10"
            />
          </span>
          <br />
          Everything you need to study better.
        </motion.h1>

        {/* CTA */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <ButtonCustom color="blue" href="/register">
            Get Started — it&apos;s free
          </ButtonCustom>

          <ButtonCustom color="outline" href="/login">
            I already have an account
          </ButtonCustom>
        </motion.div>

      </div>
    </section>
  );
};