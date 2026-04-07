import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ChatMessage, PreparationGoal, QuizQuestion } from '@/shared/types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

export async function generateSummaryFromText(text: string): Promise<string[]> {
  const prompt = `You are an expert study assistant. Summarize the following text into 6-10 concise bullet points. Return ONLY a JSON array of strings, no markdown.\n\nText:\n${text}`;
  const result = await model.generateContent(prompt);
  const response = result.response.text();
  try {
    return JSON.parse(response.replace(/```json\n?|```\n?/g, '').trim());
  } catch {
    return response.split('\n').map((l) => l.replace(/^[-•*]\s*/, '').trim()).filter(Boolean);
  }
}

export async function generateQuizFromText(text: string, count: number, goal: PreparationGoal): Promise<QuizQuestion[]> {
  const prompt = `Generate exactly ${count} multiple-choice quiz questions for ${goal} preparation from:\n${text}\n\nReturn ONLY a JSON array (no markdown):\n[{"question":"...","options":["A","B","C","D"],"correctIndex":0,"explanation":"..."}]`;
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text().replace(/```json\n?|```\n?/g, '').trim());
}

export async function streamTutorReply(messages: ChatMessage[]): Promise<ReadableStream> {
  const systemPrompt = `You are StudAI Tutor — a friendly, patient AI study assistant. Break down concepts simply, use analogies, and keep responses concise (2-4 paragraphs max).`;
  const chatHistory = messages.map((m) => ({
    role: m.role === 'user' ? ('user' as const) : ('model' as const),
    parts: [{ text: m.content }],
  }));
  const lastMessage = chatHistory.pop();
  if (!lastMessage) throw new Error('No messages provided');

  const chat = model.startChat({ history: chatHistory, systemInstruction: systemPrompt });
  const result = await chat.sendMessageStream(lastMessage.parts[0].text);
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (error) { controller.error(error); }
    },
  });
}

export async function generateDailyQuizQuestions(topic: string, count: number, goal: PreparationGoal, dayIndex: number): Promise<QuizQuestion[]> {
  const difficulty = dayIndex < 7 ? 'beginner' : dayIndex < 21 ? 'intermediate' : 'advanced';
  const prompt = `Generate ${count} ${difficulty} multiple-choice questions for day ${dayIndex + 1} of a daily ${goal} quiz about: "${topic}".\n\nReturn ONLY JSON array:\n[{"question":"...","options":["A","B","C","D"],"correctIndex":0,"explanation":"..."}]`;
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text().replace(/```json\n?|```\n?/g, '').trim());
}
