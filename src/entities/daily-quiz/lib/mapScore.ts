export function mapScore(score: number, total: number): 'perfect' | 'great' | 'good' | 'needs_work' {
  const pct = (score / total) * 100;
  if (pct === 100) return 'perfect';
  if (pct >= 80) return 'great';
  if (pct >= 60) return 'good';
  return 'needs_work';
}

export function getScoreEmoji(rating: ReturnType<typeof mapScore>): string {
  const map = { perfect: '🏆', great: '🎉', good: '👍', needs_work: '📚' };
  return map[rating];
}

export function getScoreMessage(rating: ReturnType<typeof mapScore>): string {
  const map = {
    perfect: 'Perfect score! Outstanding!',
    great: 'Great job! Keep it up!',
    good: 'Good effort! Room to improve.',
    needs_work: 'Keep studying, you\'ll get there!',
  };
  return map[rating];
}
