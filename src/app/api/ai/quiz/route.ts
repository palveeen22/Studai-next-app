import { createServerClient } from '@/shared/supabase/server';
import { NextResponse } from 'next/server';
import { generateQuizFromText } from '@/shared/api/gemini';
import { FREE_TIER_LIMITS } from '@/shared/constants';

export async function POST(req: Request) {
  const supabase = await createServerClient();

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const today = new Date().toISOString().split('T')[0];

    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('tier')
      .eq('user_id', user.id)
      .maybeSingle();

    if (subError) {
      console.error('Subscription fetch error:', subError);
      return NextResponse.json(
        { error: 'Failed to load subscription' },
        { status: 500 }
      );
    }

    const isFree = !subscription || subscription.tier === 'free';

    if (isFree) {
      const { data: usage, error: usageError } = await supabase
        .from('ai_usage')
        .select('quizzes_used')
        .eq('user_id', user.id)
        .eq('date', today)
        .maybeSingle();

      if (usageError) {
        console.error('Usage fetch error:', usageError);
        return NextResponse.json(
          { error: 'Failed to load usage data' },
          { status: 500 }
        );
      }

      const used = usage?.quizzes_used ?? 0;

      if (used >= FREE_TIER_LIMITS.quizzesPerDay) {
        return NextResponse.json(
          { error: 'Daily quiz limit reached' },
          { status: 429 }
        );
      }
    }

    const body = await req.json().catch(() => null);

    const text = body?.text;
    const count = body?.count ?? 10;
    const goal = body?.goal ?? 'practice';

    if (!text || typeof text !== 'string' || text.trim().length < 50) {
      return NextResponse.json(
        { error: 'Please provide at least 50 characters of text.' },
        { status: 400 }
      );
    }

    let questions;

    try {
      questions = await generateQuizFromText(text, count, goal);
    } catch (aiError) {
      console.error('AI generation error:', aiError);

      return NextResponse.json(
        { error: 'AI service temporarily unavailable' },
        { status: 503 }
      );
    }

    const { data: quiz, error: saveError } = await supabase
      .from('ai_quizzes')
      .insert({
        user_id: user.id,
        title: `Quiz — ${new Date().toLocaleDateString()}`,
        questions,
      })
      .select('id, title, questions')
      .maybeSingle();

    if (saveError || !quiz) {
      console.error('Quiz save error:', saveError);

      return NextResponse.json(
        { error: 'Failed to save quiz' },
        { status: 500 }
      );
    }

    supabase
      .from('ai_usage')
      .upsert(
        {
          user_id: user.id,
          date: today,
          quizzes_used: 1,
        },
        {
          onConflict: 'user_id,date',
        }
      )
      .then(({ error }) => {
        if (error) {
          console.error('Usage update error:', error);
        }
      });

    return NextResponse.json({
      data: {
        id: quiz.id,
        title: quiz.title,
        questions: quiz.questions,
      },
    });
  } catch (error) {
    console.error('Unexpected route error:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}