import { QUESTION_PROMPT } from '@/services/constants';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
export async function POST(req: Request) {
    const { jobPosition, jobDescription, interviewDuration, interviewType } = await req.json();
    const prompt = QUESTION_PROMPT.replace("{{jobTitle}}", jobPosition).replace("{{jobDescription}}", jobDescription).replace("{{duration}}", interviewDuration).replace("{{type}}", interviewType);
    const API_KEY = process.env.GROQ_KEY;
    if (!API_KEY) {
        return NextResponse.json({ error: "API_KEY not found" })
    }
    try {
        const client = new OpenAI({
            apiKey: API_KEY,
            baseURL: "https://api.groq.com/openai/v1",
        });
        const completion = await client.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "system",
                    content:
                        "Return ONLY valid JSON. No markdown. No explanation.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.3,
        });
        console.log(completion.choices[0].message);
        return NextResponse.json({
            content: completion.choices[0]?.message?.content,
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to generate questions" },
            { status: 500 }
        );
    }

}