import { motion } from 'framer-motion';
import Image from 'next/image';

interface TProps {
  title: string;
  image: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
}

export const ImageContent = ({
  title,
  image,
  imageAlt = '',
  imagePosition
}: TProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: imagePosition === 'right' ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
      className="flex items-center justify-center"
    >
      <Image
        src={image}
        alt={imageAlt || title}
        width={500}
        height={400}
        className="w-full max-w-105 h-auto object-contain"
      />
    </motion.div>
  )
}