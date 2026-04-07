import { motion } from 'framer-motion';


export const IconContent = ({
  iconText,
  iconPosition
}: {
  iconText: string
  iconPosition?: 'left' | 'right';
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: iconPosition === 'right' ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
      className="flex items-center justify-center text-[120px]"
    >
      {iconText}
    </motion.div>
  )
}
