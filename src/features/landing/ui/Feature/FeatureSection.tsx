import React from 'react'
import { FeatureBlock } from './FeatureBlock'

export const FeatureSection = () => {
  return (
    <>
      <FeatureBlock
        title="study better. every day. No stress. Just progress."
        description="Learning with StudAI is fun, and research shows that it works! With quick AI quizzes, you'll earn streaks and unlock new levels while mastering your subjects."
        image="/images/feature-1.png"
        imagePosition="right"
        titleColor="#58CC02"
        linkText="research shows that it works"
        linkHref="/about"
        linkColor="#1CB0F6"
      />

      <FeatureBlock
        title="science meets simplicity"
        description="StudAI uses AI-powered spaced repetition and active recall to help you remember what you study."
        image="/images/feature-2.png"
        imagePosition="left"
        titleColor="#CE82FF"
      />

      <FeatureBlock
        title="learn your way"
        description="Build daily streaks, earn badges, and track your progress on a Duolingo-style learning path."
        image="/images/feature-3.png"
        imagePosition="right"
        titleColor="#1CB0F6"
      />
    </>
  )
}
