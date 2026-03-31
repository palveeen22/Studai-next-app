import { ButtonCustom } from '@/shared/ui';
import { motion } from 'framer-motion';

export const ReadyToSection = () => {
  return (
    <section className="relative py-24 px-6 bg-linear-to-br from-[#FFF9DB] to-[#FFE8D6] overflow-hidden">

      {/* BACKGROUND GLOW (same style as footer) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-[30%] w-80 h-80 rounded-full bg-[#2ECC71]/10 blur-3xl" />
        <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-[#F5C542]/10 blur-3xl" />
      </div>

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        <span className="text-5xl mb-6 block">🚀</span>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D2D2D]">
          Ready to transform your study game?
        </h2>

        <p className="mt-4 text-gray-600 text-lg mb-6">
          Join StudAI today. It takes 30 seconds to sign up and it&apos;s completely free.
        </p>

        <ButtonCustom color="gold" href="/register">
          Get Started Now →
        </ButtonCustom>
      </motion.div>
    </section>
  );
};