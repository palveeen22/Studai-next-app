'use client';

import { IconContent } from './IconContent';
import { TextContent } from './TextContent';

interface TProps {
  title: string;
  description: string;
  iconText: string
  iconPosition?: 'left' | 'right';
  titleColor?: string;
  linkText?: string;
  linkHref?: string;
  linkColor?: string;
  buttonLink?: string;
  buttonText?: string;
}

export function FeatureBlockIcon({
  title,
  description,
  iconText,
  iconPosition = 'right',
  titleColor = '#58CC02',
  linkText,
  linkHref,
  linkColor = '#1CB0F6',
  buttonLink,
  buttonText
}: TProps) {

  const sharedProps = {
    title,
    description,
    iconPosition,
    titleColor,
    linkText,
    linkHref,
    linkColor,
    buttonLink,
    buttonText
  };

  return (
    <section className="py-16 sm:py-24 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {iconPosition === 'left' ? (
          <>
            <IconContent iconText={iconText} iconPosition={iconPosition} />
            <TextContent {...sharedProps} />
          </>
        ) : (
          <>
            <TextContent {...sharedProps} />
            <IconContent iconText={iconText} iconPosition={iconPosition} />
          </>
        )}
      </div>
    </section>
  );
}

