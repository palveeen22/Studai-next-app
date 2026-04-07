import React from 'react'
import { FeatureBlockIcon } from './FeatureBlockIcon'

export const FeatureSection = () => {
  return (
    <>
      <FeatureBlockIcon
        title="study better. every day. No stress. Just progress."
        description="Learning with StudAI is fun, and research shows that it works! With quick AI quizzes, you'll earn streaks and unlock new levels while mastering your subjects."
        titleColor="#58CC02"
        linkText="research shows that it works"
        linkHref="/about"
        linkColor="#1CB0F6"
        iconText='👩‍💼'
        iconPosition='right'
      />

      <FeatureBlockIcon
        title="science meets simplicity"
        description="StudAI uses AI-powered spaced repetition and active recall to help you remember what you study."
        titleColor="#CE82FF"
        iconText='👨‍🔬'
        iconPosition='left'
      />

      <FeatureBlockIcon
        title="learn your way"
        description="Build daily streaks, earn badges, and track your progress on a Duolingo-style learning path."
        iconText='📝'
        titleColor="#1CB0F6"
      />
    </>
  )
}
