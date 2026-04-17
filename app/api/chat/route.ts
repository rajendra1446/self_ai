// app/api/chat/route.ts
import { streamText } from 'ai';
import { createGroq } from '@ai-sdk/groq';

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: groq('llama-3.3-70b-versatile'),
    messages,
  });
  return result.toTextStreamResponse();
}