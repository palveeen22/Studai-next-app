import { mapScore, getScoreEmoji, getScoreMessage } from '@/entities/daily-quiz/lib/mapScore';

describe('mapScore', () => {
  it('returns perfect for 100%', () => {
    expect(mapScore(10, 10)).toBe('perfect');
  });

  it('returns great for 80%+', () => {
    expect(mapScore(8, 10)).toBe('great');
    expect(mapScore(9, 10)).toBe('great');
  });

  it('returns good for 60%+', () => {
    expect(mapScore(6, 10)).toBe('good');
    expect(mapScore(7, 10)).toBe('good');
  });

  it('returns needs_work for below 60%', () => {
    expect(mapScore(5, 10)).toBe('needs_work');
    expect(mapScore(0, 10)).toBe('needs_work');
  });
});

describe('getScoreEmoji', () => {
  it('returns correct emoji for each rating', () => {
    expect(getScoreEmoji('perfect')).toBe('🏆');
    expect(getScoreEmoji('great')).toBe('🎉');
    expect(getScoreEmoji('good')).toBe('👍');
    expect(getScoreEmoji('needs_work')).toBe('📚');
  });
});

describe('getScoreMessage', () => {
  it('returns a message for each rating', () => {
    expect(getScoreMessage('perfect')).toBeTruthy();
    expect(getScoreMessage('needs_work')).toBeTruthy();
  });
});
