import { Layout, Calendar, List, WalletCards, Settings, User, Code, BaggageClaim, LucideLoader } from "lucide-react";

export const sidebarMenu = [
    {
        title: "Dashboard",
        icon: Layout,
        path: "/dashboard",
    },
    {
        title: "Shedule Interview",
        icon: Calendar,
        path: "/schedule-interview",
    },
    {
        title: "All Interview",
        icon: List,
        path: "/all-interviews",
    },
    {
        title: "Billing",
        icon: WalletCards,
        path: "/billing",
    },

]

export const interviewType = [
    {
        title: "Technical",
        icon: Code,
    },
    {
        title: "Behavioral",
        icon: User,
    },
    {
        title: "HR",
        icon: User,
    },
    {
        title: "Experience",
        icon: BaggageClaim,
    },
    {
        title: "Problem Solving",
        icon: LucideLoader,
    },
]

export const QUESTION_PROMPT = `You are a senior technical interviewer designing a real-world interview.

INPUT:
Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

TASK:
1. Analyze the job description to identify:
   - core responsibilities
   - required technical skills
   - expected experience level

2. Generate interview questions appropriate for the duration:
   - 15 min → 5–7 questions
   - 30 min → 8–12 questions
   - 45 min → 12–16 questions

3. Ensure a balanced mix:
   - Technical
   - Problem Solving
   - Behavioral
   - Experience
   - Leadership (if applicable)

4. Questions must sound like a real interviewer speaking.

OUTPUT RULES (STRICT):
- Return ONLY valid JSON.
- Do NOT include explanations or extra text.
- Do NOT include markdown.

OUTPUT FORMAT:
{
  "interviewQuestions": [
    {
      "question": "string",
      "type": "Technical | Behavioral | Experience | Problem Solving | Leadership"
    }
  ]
}`

export const extractJSON = (text: string) => {
    let depth = 0;
    let start = -1;

    for (let i = 0; i < text.length; i++) {
        if (text[i] === "{") {
            if (depth === 0) start = i;
            depth++;
        } else if (text[i] === "}") {
            depth--;
            if (depth === 0 && start !== -1) {
                return text.slice(start, i + 1);
            }
        }
    }
    return null;
}

export const FEEDBACK_PROMPT = `{{conversation}}

Based ONLY on this interview conversation between assistant and user, evaluate the candidate's performance.

Rules:
- Do NOT assume skills if they are not demonstrated in the conversation.
- If the conversation is very short or lacks technical discussion, give LOW ratings (1–3).
- Only evaluate based on actual evidence in the conversation.
- Be realistic and strict in scoring.

Return response ONLY in valid JSON format (no explanation, no markdown):

{
  "feedback": {
    "rating": {
      "technicalSkills": <number between 1 and 10>,
      "communication": <number between 1 and 10>,
      "problemSolving": <number between 1 and 10>,
      "experience": <number between 1 and 10>
    },
    "summary": "<exactly 3 lines summarizing the interview>",
    "Recommendation": "<Recommended or Not Recommended>",
    "RecommendationMsg": "<one short line explaining the decision>"
  }
}
`;