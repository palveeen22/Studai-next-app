'use client';

import { ImageContent } from './ImageContent';
import { TextContent } from './TextContent';

interface FeatureSectionProps {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
  titleColor?: string;
  linkText?: string;
  linkHref?: string;
  linkColor?: string;
  buttonLink?: string;
  buttonText?: string;
}

export function FeatureBlock({
  title,
  description,
  image,
  imageAlt = '',
  imagePosition = 'right',
  titleColor = '#58CC02',
  linkText,
  linkHref,
  linkColor = '#1CB0F6',
  buttonLink,
  buttonText
}: FeatureSectionProps) {

  const sharedProps = {
    title,
    description,
    imagePosition,
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
        {imagePosition === 'left' ? (
          <>
            <ImageContent title={title} image={image} imageAlt={imageAlt} imagePosition={imagePosition} />
            <TextContent {...sharedProps} />
          </>
        ) : (
          <>
            <TextContent {...sharedProps} />
            <ImageContent title={title} image={image} imageAlt={imageAlt} imagePosition={imagePosition} />
          </>
        )}
      </div>
    </section>
  );
}

