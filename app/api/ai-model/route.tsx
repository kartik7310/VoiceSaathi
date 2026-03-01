import { QUESTION_PROMPT } from '@/services/constants';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
export async function POST(req: Request) {
    const { jobPosition, jobDescription, interviewDuration, interviewType } = await req.json();
    const prompt = QUESTION_PROMPT.replace("{{jobTitle}}", jobPosition).replace("{{jobDescription}}", jobDescription).replace("{{duration}}", interviewDuration).replace("{{type}}", interviewType);
    console.log("prompt", prompt);

    try {
        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API_KEY,

        });
        const completion = await openai.chat.completions.create({
            model: "google/gemma-3-12b-it:free",
            messages: [
                { role: "user", content: prompt }
            ]
        });
        console.log(completion.choices[0].message);
        return NextResponse.json({ data: completion.choices[0].message })

    } catch (error) {
        console.log("error", error);
        return NextResponse.json({ error: error })
    }

}