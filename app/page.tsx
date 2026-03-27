"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/app/provider"
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  Variants,
} from "motion/react"
import {
  Mic,
  Brain,
  BarChart3,
  Clock,
  Users,
  Zap,
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"

// ─── tiny helpers ────────────────────────────────────────────────────────────

function useCounter(target: number, inView: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const step = 16
    const increment = target / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, step)
    return () => clearInterval(timer)
  }, [inView, target])
  return count
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// ─── data ────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: <Mic className="w-5 h-5 text-blue-600" />,
    title: "AI-Generated Questions",
    desc: "Domain-specific questions generated instantly based on your exact job description and role requirements.",
  },
  {
    icon: <Brain className="w-5 h-5 text-blue-600" />,
    title: "Automated Evaluation",
    desc: "Instant AI assessment of candidate responses, covering technical depth, communication clarity, and confidence.",
  },
  {
    icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
    title: "Candidate Analytics",
    desc: "Compare candidates side-by-side with detailed scoring breakdowns and actionable insights.",
  },
  {
    icon: <Clock className="w-5 h-5 text-blue-600" />,
    title: "Seamless Invites",
    desc: "Generate unique interview links and easily invite candidates to complete the module at their convenience.",
  },
  {
    icon: <Users className="w-5 h-5 text-blue-600" />,
    title: "Centralized Dashboard",
    desc: "Manage all your created interviews, scheduled candidates, and results from a single unified workspace.",
  },
  {
    icon: <Zap className="w-5 h-5 text-blue-600" />,
    title: "Detailed Reports",
    desc: "Access comprehensive transcripts and feedback reports immediately after a candidate finishes their session.",
  },
]

const STEPS = [
  { num: "01", title: "Create Module", desc: "Input the job role and description to automatically generate tailored interview questions." },
  { num: "02", title: "Invite Candidates", desc: "Generate a unique interview link and share it directly with your applicants." },
  { num: "03", title: "AI Assessment", desc: "Candidates complete the voice-based interview while our AI evaluates their responses." },
  { num: "04", title: "Review & Hire", desc: "Check your dashboard for detailed scoring, transcripts, and insights to make your decision." },
]

const TESTIMONIALS = [
  { name: "Aryan Mehta", role: "SDE Intern @ Amazon", initials: "AM", rating: 5, quote: "The mock interviews felt incredibly real. VoiceSaathi helped me identify gaps in my system design knowledge before the actual interview." },
  { name: "Priya Sharma", role: "CS Student @ IIT Delhi", initials: "PS", rating: 5, quote: "I used this for 3 weeks before placement season. The automated behavioral feedback was a lifesaver for my confidence." },
  { name: "Rohit Verma", role: "Incoming SDE @ Zomato", initials: "RV", rating: 5, quote: "The detailed scorecard after every session showed me exactly what I needed to improve. Best tool to prep for technical rounds." },
  { name: "Neha Gupta", role: "Data Analyst Intern @ Swiggy", initials: "NG", rating: 4, quote: "Clean UI, sharp feedback, and very relevant questions. It feels like you're actually talking to a senior interviewer." },
  { name: "Karan Joshi", role: "Final Year Student @ BITS", initials: "KJ", rating: 5, quote: "Went from bombing every mock to clearing three consecutive actual rounds. The instant AI feedback was brutally honest and effective." },
  { name: "Sneha Rao", role: "Product Design Intern @ CRED", initials: "SR", rating: 5, quote: "I was worried it wouldn't have good design scenario questions, but it was spot on. VoiceSaathi is a must-have for campus placements." },
]

const STATS = [
  { target: 500, suffix: "+", label: "Companies Using Us" },
  { target: 50000, suffix: "+", label: "Candidates Assessed", format: (n: number) => n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : n.toLocaleString() },
  { target: 98, suffix: "%", label: "Time Saved/Hire" },
  { target: 1200, suffix: "+", label: "Interviews Created" },
]

// ─── sub-components ──────────────────────────────────────────────────────────

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-blue-200 mb-3">
      {children}
    </span>
  )
}

function StatCard({ target, suffix, label, format }: { target: number; suffix: string; label: string; format?: (n: number) => string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const count = useCounter(target, inView)
  const display = format ? format(count) : count.toLocaleString()

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="text-center text-white"
    >
      <p className="text-4xl md:text-5xl font-extrabold tracking-tight">
        {display}<span className="text-blue-300">{suffix}</span>
      </p>
      <p className="text-sm text-blue-200 mt-1.5 font-medium">{label}</p>
    </motion.div>
  )
}

function FeatureCard({ icon, title, desc, index }: { icon: React.ReactNode; title: string; desc: string; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      whileHover={{ y: -5, boxShadow: "0 20px 48px rgba(37,99,235,.13)" }}
      className="group bg-white border border-gray-100 rounded-2xl p-7 relative overflow-hidden cursor-default transition-colors hover:border-blue-100"
    >
      {/* top accent */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-400 origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 text-base mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </motion.div>
  )
}

function TestiCard({ name, role, initials, rating, quote }: typeof TESTIMONIALS[0]) {
  return (
    <div className="w-80 flex-shrink-0 bg-white border border-gray-100 rounded-2xl p-7 mx-3 shadow-sm">
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-sm text-gray-600 leading-relaxed italic font-light mb-5">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">{name}</p>
          <p className="text-xs text-gray-400">{role}</p>
        </div>
      </div>
    </div>
  )
}

// ─── main page ───────────────────────────────────────────────────────────────

export default function Home() {
  const { user } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [tesiIdx, setTesiIdx] = useState(0)

  // navbar scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // stats section ref
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" })

  // testimonials auto-play
  const VISIBLE = 3
  const maxIdx = TESTIMONIALS.length - VISIBLE
  useEffect(() => {
    const t = setInterval(() => setTesiIdx(i => (i >= maxIdx ? 0 : i + 1)), 3500)
    return () => clearInterval(t)
  }, [maxIdx])

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">

      {/* ── NAVBAR ─────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-shadow duration-300 ${scrolled ? "shadow-[0_4px_24px_rgba(37,99,235,.08)]" : ""}`}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent tracking-tight">
            VoiceSaathi
          </Link>
          <div className="flex items-center gap-2">
            {user ? (
              <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors">
                Dashboard
              </Link>
            ) : (
              <Link href="/auth" className="text-sm font-medium text-gray-600 hover:text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors">
                Login
              </Link>
            )}
            <Link
              href="/dashboard"
              className="text-sm font-semibold bg-gradient-to-br from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl shadow-[0_2px_12px_rgba(37,99,235,.35)] hover:shadow-[0_4px_20px_rgba(37,99,235,.45)] hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
            >
              Start Hiring <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-blue-50/60 pt-24 pb-28 px-5 md:px-8 text-center">
        {/* background blobs */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.18, 0.26, 0.18] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-blue-400 rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-1/3 -right-20 w-[380px] h-[380px] bg-indigo-400 rounded-full blur-[90px] pointer-events-none"
        />

        <div className="relative max-w-4xl mx-auto">
          {/* badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
            AI-Powered Hiring Assistant
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]"
          >
            Streamline Your Hiring<br />
            with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              VoiceSaathi
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Create domain-specific mock interviews instantly. Let our AI evaluate your candidates'
            technical depth and communication skills, so you can focus on the best talent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold text-base px-8 py-4 rounded-2xl shadow-[0_4px_24px_rgba(37,99,235,.4)] hover:shadow-[0_8px_32px_rgba(37,99,235,.5)] hover:-translate-y-0.5 transition-all duration-200"
            >
              🎙 Create Interview Module
            </Link>
            <Link
              href={user ? "/dashboard" : "/auth"}
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold text-base px-8 py-4 rounded-2xl border border-blue-200 shadow-sm hover:border-blue-400 hover:shadow-[0_4px_16px_rgba(37,99,235,.15)] hover:-translate-y-0.5 transition-all duration-200"
            >
              {user ? "View Dashboard" : "Get Started"} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* mock card */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 relative max-w-lg mx-auto"
          >
            {/* floating badges */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-6 md:-right-14 bg-white rounded-2xl px-4 py-2.5 shadow-lg border border-gray-100 flex items-center gap-2 text-sm font-semibold text-gray-700 z-10 hidden sm:flex"
            >
              🏆 Score: <span className="text-blue-600">7 / 10</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-6 md:-left-14 bg-white rounded-2xl px-4 py-2.5 shadow-lg border border-gray-100 flex items-center gap-2 text-sm font-semibold text-gray-700 z-10 hidden sm:flex"
            >
              ⚡ Instant AI Feedback
            </motion.div>

            <div className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-3xl p-7 shadow-[0_24px_64px_rgba(37,99,235,.12)]">
              <div className="flex items-center gap-1.5 mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-gray-400 font-medium">Live Interview Session</span>
              </div>

              <p className="text-left text-gray-700 text-sm leading-relaxed italic border-l-2 border-blue-500 pl-4 mb-5">
                "Tell me about a time you handled a high-pressure situation at work.
                Walk me through your thought process."
              </p>

              {/* waveform */}
              <div className="flex items-center justify-center gap-1 h-10 my-4">
                {[20, 32, 44, 28, 38, 22, 36, 18, 42, 30].map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-1 rounded-full bg-gradient-to-t from-blue-600 to-indigo-400"
                    animate={{ scaleY: [1, 2.5, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.09, ease: "easeInOut" }}
                    style={{ height: h, transformOrigin: "bottom" }}
                  />
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Clear structure
                </span>
                <span className="bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                  ⚡ Add more detail
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────── */}
      <section
        ref={statsRef}
        className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 py-16 px-5 md:px-8"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10"
        >
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </motion.div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────── */}
      <section className="py-28 px-5 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-14"
          >
            <SectionTag>Why VoiceSaathi</SectionTag>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mt-2 mb-4">
              Everything You Need to Prepare
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              From AI-driven questions to deep performance breakdowns — all in one polished platform.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────── */}
      <section className="py-28 px-5 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-16"
          >
            <SectionTag>How It Works</SectionTag>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mt-2 mb-4">
              From Zero to Interview-Ready
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
              Four simple steps is all it takes to streamline your hiring process.
            </p>
          </motion.div>

          <div className="relative">
            {/* connector line */}
            <div className="hidden md:block absolute top-[36px] left-[16%] right-[16%] h-px bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 z-0" />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 relative z-10"
            >
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  variants={fadeUp}
                  custom={i}
                  className="flex flex-col items-center text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 5 }}
                    className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white font-extrabold text-xl flex items-center justify-center shadow-[0_8px_24px_rgba(37,99,235,.35)] mb-6 relative"
                  >
                    {step.num}
                    <span className="absolute inset-[-6px] rounded-full border-2 border-dashed border-blue-300 animate-[spin_12s_linear_infinite]" />
                  </motion.div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────── */}
      <section className="py-28 px-0 bg-gray-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-14"
          >
            <SectionTag>Testimonials</SectionTag>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mt-2 mb-4">
              Loved by 1000+ Candidates
            </h2>
            <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
              Real stories from users who landed their dream jobs with VoiceSaathi.
            </p>
          </motion.div>
        </div>

        {/* auto-scroll strip */}
        <div className="relative">
          {/* edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex"
            animate={{ x: [`0%`, `-${50}%`] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            style={{ width: "max-content" }}
          >
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <TestiCard key={`${t.name}-${i}`} {...t} />
            ))}
          </motion.div>
        </div>

        {/* manual dots */}
        <div className="flex justify-center gap-2 mt-10">
          {TESTIMONIALS.slice(0, maxIdx + 1).map((_, i) => (
            <button
              key={i}
              onClick={() => setTesiIdx(i)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${i === tesiIdx ? "bg-blue-600 w-5" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-28 px-5 md:px-8 text-center">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.22, 0.15] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-white rounded-full blur-[100px] pointer-events-none"
        />
        <div className="relative max-w-2xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">
              Ready to Hire the<br />Best Talent?
            </h2>
            <p className="text-blue-200 text-lg mb-10">
              Join 500+ forward-thinking companies streamlining recruitment with VoiceSaathi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold text-base px-9 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                🎙 Start Hiring for Free
              </Link>
              <Link
                href={user ? "/dashboard" : "/auth"}
                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/25 text-white font-semibold text-base px-9 py-4 rounded-2xl hover:bg-white/20 transition-all duration-200"
              >
                {user ? "View Dashboard" : "Create Account"} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 py-10 px-5 text-center">
        <p className="text-xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">
          VoiceSaathi
        </p>
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} VoiceSaathi • Built for Success
        </p>
      </footer>

    </div>
  )
}