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
        path: "/interview",
    },
    {
        title: "All Interview",
        icon: List,
        path: "/interview",
    },
    {
        title: "Billing",
        icon: WalletCards,
        path: "/interview",
    },
    {
        title: "Settings",
        icon: Settings,
        path: "/settings",
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