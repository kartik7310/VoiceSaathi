# 🎙️ VoiceSaathi

<div align="center">
  <h3>AI-Powered Mock Interview Platform</h3>

  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Groq](https://img.shields.io/badge/Groq-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
  [![Vapi](https://img.shields.io/badge/Vapi_AI-FF4B4B?style=for-the-badge&logo=vapi&logoColor=white)](https://vapi.ai/)

</div>

---

## 🧐 What is VoiceSaathi?

**VoiceSaathi** is a cutting-edge, AI-driven mock interview platform designed to help job seekers master their interview skills. It provides a realistic, low-pressure environment where candidates can practice technical and behavioral interviews using **real-time voice AI**. 

Unlike traditional platforms that rely on text-based chat, VoiceSaathi simulates a real human conversation, allowing you to speak, listen, and react just as you would in a real interview.

---

##  Why VoiceSaathi?

Interview anxiety and a lack of constructive feedback are the biggest hurdles for candidates. VoiceSaathi solves this by:

- **Eliminating Anxiety**: Practice as many times as you want until you feel confident.
- **Realistic Simulation**: Uses advanced Voice AI (Vapi) to create natural-sounding conversations.
- **Data-Driven Feedback**: Receive instant, AI-generated scores and detailed suggestions on your body language (tone), technical accuracy, and communication.  
- **Tailored Experience**: Every interview is customized based on the specific job description you provide.

---

## 🛠️ Tech Stack

### Frontend & UI
- **Next.js 15+**: Modern React framework with App Router for optimal performance.
- **Tailwind CSS**: Utility-first CSS for a sleek, responsive design.
- **Shadcn/UI**: High-quality, accessible UI components.
- **Lucide React**: Beautiful icons for a premium feel.

### Backend & Infrastructure
- **Supabase**: Open-source Firebase alternative providing Auth, PostgreSQL Database, and Edge Functions.
- **SSR (Server Side Rendering)**: Fast page loads and SEO optimization.

### AI & Integrations
- **Vapi AI**: Real-time voice interface for human-like interaction.
- **Groq**: Brains behind the question generation and feedback analysis.


---

## 📂 Folder Structure

```text
mock-interview/
├── app/                    # Next.js App Router (Pages & API Routes)
│   ├── (main)/             # Protected dashboard & main app flows
│   ├── api/                # Backend API endpoints (Stripe, AI)
│   ├── auth/               # Authentication logic (Supabase)
│   ├── interview/          # Core interview experience pages
│   └── globals.css         # Global styling
├── components/             # Reusable UI components
│   └── ui/                 # Shadcn/UI base components
├── context/                # React Context for global state management
├── hooks/                  # Custom React hooks
├── services/               # External service clients (Supabase, Vapi)
├── lib/                    # Utility functions and shared helpers
├── public/                 # Static assets (images, icons)
├── package.json            # Project dependencies and scripts
└── next.config.ts          # Next.js configuration
```

---

## 🚀 Getting Started

### 1. Prerequisite
- Node.js 18+
- Supabase Account
- Groq API Key

### 2. Installation
```bash
git clone https://github.com/kartik7310/VoiceSaathi.git
cd mock-interview
npm install
```

### 3. Environment Setup
Create a `.env.local` and add:
```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_VAPI_PUBLIC_KEY=...
OPENAI_API_KEY=...
STRIPE_SECRET_KEY=...
```

### 4. Run Locally
```bash
npm run dev
```

---

## 🤝 Contributing
Built with ❤️ by [Kartik](https://github.com/kartik7310). Contributions and feedback are always welcome!
