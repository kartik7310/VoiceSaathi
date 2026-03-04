import { FEEDBACK_PROMPT } from '@/services/constants';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
export async function POST(req: Request) {
    const { conversations } = await req.json();
    const formattedConversation = Array.isArray(conversations)
        ? conversations
            .map((msg: any) => `${msg.role}: ${msg.content}`)
            .join("\n")
        : conversations;

    const prompt = FEEDBACK_PROMPT.replace(
        "{{conversation}}",
        formattedConversation
    );

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
        const raw = completion.choices[0]?.message?.content || "";

        let parsed;
        try {
            parsed = JSON.parse(raw);
        } catch {
            return NextResponse.json(
                { error: "Invalid JSON from AI", raw },
                { status: 500 }
            );
        }


        return NextResponse.json({
            data: parsed,
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to generate feedback" },
            { status: 500 }
        );
    }

}