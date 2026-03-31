import { motion } from 'framer-motion';
import { renderDescriptionWithLink } from './RenderDescriptionWithLink';
import { ButtonCustom } from '@/shared/ui';

interface TProps {
  title: string;
  description: string;
  imagePosition?: 'left' | 'right';
  titleColor?: string;
  linkText?: string;
  linkHref?: string;
  linkColor?: string;
  buttonLink?: string;
  buttonText?: string;
}

export const TextContent = ({
  title,
  description,
  imagePosition = 'right',
  titleColor = '#58CC02',
  linkText,
  linkHref,
  linkColor = '#1CB0F6',
  buttonLink,
  buttonText
}: TProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: imagePosition === 'right' ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col justify-center gap-2"
    >
      <h2
        className="text-4xl sm:text-5xl font-extrabold lowercase leading-tight"
        style={{ color: titleColor }}
      >
        {title}
      </h2>
      <p className="mt-6 text-base sm:text-lg text-[#4B4B4B] leading-relaxed max-w-md">
        {linkText && linkHref ? (
          renderDescriptionWithLink(description, linkText, linkHref, linkColor)
        ) : (
          description
        )}
      </p>
      {buttonText && buttonLink && (
        <ButtonCustom color='outline' href={buttonLink}>{buttonText}</ButtonCustom>
      )}
    </motion.div>
  )
}