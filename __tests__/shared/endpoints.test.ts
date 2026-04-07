import { ENDPOINTS } from '@/shared/api/endpoints';

describe('ENDPOINTS', () => {
  it('tasks endpoints are well-formed', () => {
    expect(ENDPOINTS.tasks.list).toBe('/api/tasks');
    expect(ENDPOINTS.tasks.create).toBe('/api/tasks');
    expect(ENDPOINTS.tasks.byId('abc')).toBe('/api/tasks/abc');
    expect(ENDPOINTS.tasks.toggle('abc')).toBe('/api/tasks/abc/toggle');
  });

  it('subjects endpoints are well-formed', () => {
    expect(ENDPOINTS.subjects.list).toBe('/api/subjects');
    expect(ENDPOINTS.subjects.byId('xyz')).toBe('/api/subjects/xyz');
  });

  it('AI endpoints are well-formed', () => {
    expect(ENDPOINTS.ai.summary).toBe('/api/ai/summary');
    expect(ENDPOINTS.ai.quiz).toBe('/api/ai/quiz');
    expect(ENDPOINTS.ai.tutor).toBe('/api/ai/tutor');
  });

  it('dashboard endpoint is a string', () => {
    expect(typeof ENDPOINTS.dashboard).toBe('string');
  });

  it('subscription endpoint is well-formed', () => {
    expect(ENDPOINTS.subscription.status).toBe('/api/subscription/status');
  });

  it('daily quiz endpoints generate correct paths', () => {
    expect(ENDPOINTS.dailyQuiz.tasks).toBe('/api/daily-quiz');
    expect(ENDPOINTS.dailyQuiz.byId('task-1')).toBe('/api/daily-quiz/task-1');
    expect(ENDPOINTS.dailyQuiz.results('task-1')).toBe('/api/daily-quiz/task-1/results');
  });
});
