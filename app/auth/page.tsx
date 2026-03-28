"use client"

import Image from "next/image"
import supabase from "@/services/supabaseClient"
import { motion } from "motion/react"
import { Mic, Shield, Zap } from "lucide-react"

const PERKS = [
    { icon: <Mic className="w-3.5 h-3.5" />, text: "AI-powered mock interviews" },
    { icon: <Zap className="w-3.5 h-3.5" />, text: "Instant smart feedback" },
    { icon: <Shield className="w-3.5 h-3.5" />, text: "Secure & private sessions" },
]

export default function Page() {
    const signIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
        if (error) console.error(error.message)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br  from-white via-blue-50/40 to-blue-100/60 flex items-center justify-center px-4 relative overflow-hidden">


            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.22, 0.15] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-400 rounded-full blur-[110px] pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1, 1.12, 1], opacity: [0.1, 0.18, 0.1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                className="absolute -bottom-24 -right-24 w-[420px] h-[420px] bg-indigo-400 rounded-full blur-[100px] pointer-events-none"
            />

            <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-md"
            >
                {/* card */}
                <div className="bg-white/80 backdrop-blur-xl border border-blue-100 rounded-3xl shadow-[0_24px_64px_rgba(37,99,235,.12)] p-10 flex flex-col items-center text-center">

                    {/* logo */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                    >
                        <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent tracking-tight">
                            VoiceSaathi
                        </span>
                    </motion.div>

                    {/* illustration */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-5 mb-2 relative"
                    >
                        <div className="absolute inset-0 bg-blue-200/40 rounded-full blur-2xl scale-75 translate-y-4" />
                        <Image
                            src="/login.webp"
                            alt="VoiceSaathi login illustration"
                            width={240}
                            height={240}
                            priority
                            className="relative mx-auto drop-shadow-lg"
                        />
                    </motion.div>

                    {/* heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="space-y-2 mt-2"
                    >
                        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight leading-tight">
                            Ace your next{" "}
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                                Interview
                            </span>
                        </h2>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">
                            Practice with an AI interviewer, get instant feedback, and land your dream job.
                        </p>
                    </motion.div>

                    {/* perks */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="flex flex-wrap justify-center gap-2 mt-5"
                    >
                        {PERKS.map((p) => (
                            <span
                                key={p.text}
                                className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full"
                            >
                                {p.icon}
                                {p.text}
                            </span>
                        ))}
                    </motion.div>

                    {/* divider */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.45, duration: 0.5 }}
                        className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-6"
                    />

                    {/* sign in button */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="w-full"
                    >
                        <button
                            onClick={signIn}
                            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:border-blue-300 hover:shadow-[0_4px_20px_rgba(37,99,235,.15)] text-gray-700 font-semibold text-sm h-10 rounded-2xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                        >
                            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </button>
                    </motion.div>

                    {/* footer note */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="text-xs text-gray-400 mt-5 leading-relaxed"
                    >
                        By signing in, you agree to our{" "}
                        <span className="text-blue-500 cursor-pointer hover:underline">Terms</span>
                        {" "}and{" "}
                        <span className="text-blue-500 cursor-pointer hover:underline">Privacy Policy</span>
                    </motion.p>
                </div>

                {/* bottom glow */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-blue-400/20 blur-2xl rounded-full pointer-events-none" />
            </motion.div>
        </div>
    )
}