
"use client"
import React, { useContext, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useAuth } from "@/app/provider"
import { Button } from "@/components/ui/button"
import { Clock, Mic, PhoneOff, Video } from "lucide-react"
import Vapi from "@vapi-ai/web"
import { interviewDataContext } from "@/context/interviewDataContext"
import AleartDialogBox from "./_components/AleartDialogBox"
import { toast } from "sonner"
import axios from "axios"
import supabase from "@/services/supabaseClient"
import { useParams, useRouter } from "next/navigation"

const Page = () => {
    const router = useRouter()
    const { interview_id } = useParams()
    const { user } = useAuth()
    const { interviwQuestions } = useContext(interviewDataContext)
    const [speaker, setSpeaker] = useState<"ai" | "user" | "thinking" | null>(null)
    const [callStatus, setCallStatus] = useState<"idle" | "connecting" | "active" | "ended">("idle")
    const [conversation, setConversation] = useState<any[]>([])
    const vapiRef = useRef<Vapi | null>(null)
    const isCallingRef = useRef(false)

    // Initialize Vapi 
    useEffect(() => {
        if (!vapiRef.current) {
            vapiRef.current = new Vapi(
                process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY as string
            )
        }
        return () => {
            vapiRef.current?.stop()
        }
    }, [])

    // Register event listeners once
    useEffect(() => {
        const vapi = vapiRef.current
        if (!vapi) return

        const handleCallStart = () => {
            setCallStatus("active")
            setSpeaker("thinking")
            toast("Interview Started")
        }

        // AI starts speaking
        const handleSpeechStart = () => {
            setSpeaker("ai")
        }

        // AI stops speaking
        const handleSpeechEnd = () => {
            setSpeaker(null)
        }

        // User speaking detected via transcript
        const handleMessage = (message: any) => {
            if (message.type === "transcript" && message.role === "user") {
                setSpeaker("user")
            }
        }

        const handleCallEnd = () => {
            setSpeaker(null)
            setCallStatus("ended")
            toast("Interview Ended")
            generateFeedback()
        }

        const handleError = (error: any) => {
            console.error("Vapi Error:", error)
            setSpeaker(null)
            setCallStatus("idle")
            toast.error("Call failed. Please try again.")
        }

        const generateFeedback = async () => {
            try {
                const result = await axios.post("/api/ai-feedback", {
                    conversations: conversation
                })
                console.log("result of feedback raw", result);
                const aiFeedback = result.data.data.feedback;

                if (aiFeedback) {
                    const { data, error } = await supabase.from("Feedback").insert({
                        userName: interviwQuestions?.userName,
                        userEmail: interviwQuestions?.userEmail,
                        interview_id: interview_id,
                        feedback: aiFeedback,
                    }).select();
                    router.replace(`/interview/${interview_id}/completed`)
                    if (error) {
                        console.error("Insert error:", error);
                    } else {
                        console.log("Inserted row:", data);
                    }

                }
            } catch (error) {
                console.error(error);
            }
        }
        vapi.on("call-start", handleCallStart)
        vapi.on("speech-start", handleSpeechStart)
        vapi.on("speech-end", handleSpeechEnd)
        vapi.on("message", handleMessage)
        vapi.on("call-end", handleCallEnd)
        vapi.on("message", (message: any) => {
            if (message?.conversation) {
                setConversation((prev: any[]) => [
                    ...prev,
                    ...message.conversation
                ]);
            }
        });
        vapi.on("error", handleError)

        return () => {
            vapi.off("call-start", handleCallStart)
            vapi.off("speech-start", handleSpeechStart)
            vapi.off("speech-end", handleSpeechEnd)
            vapi.off("message", handleMessage)
            vapi.off("call-end", handleCallEnd)
            vapi.off("error", handleError)
        }
    }, [])


    useEffect(() => {
        if (interviwQuestions && vapiRef.current && !isCallingRef.current) {
            startInterview()
        }
    }, [interviwQuestions])

    const startInterview = () => {
        if (!interviwQuestions || !vapiRef.current) {
            toast.error("Interview data not ready.")
            return
        }
        if (isCallingRef.current) return
        isCallingRef.current = true
        setCallStatus("connecting")

        const questionList = interviwQuestions?.questionList?.questions
            ?.map((q: any) => q.question)
            .join("\n")

        const assistantOptions = {
            name: "VoiceSaathi",
            firstMessage: `Hi ${interviwQuestions?.userName}, how are you? Ready for your interview on ${interviwQuestions?.jobPosition}?`,
            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en-US",
            },
            voice: {
                provider: "11labs",
                voiceId: "bIHbv24MWmeRgasZH58o",
            },
            model: {
                provider: "openai",
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: `
You are an AI voice assistant conducting a job interview.
Ask one question at a time. Wait for the candidate's full response before moving on.
Keep responses short, friendly, and professional.
Give brief encouraging feedback after each answer.

Questions:
${questionList}

If the candidate struggles, rephrase or give a hint.
After all questions, give a brief positive summary and wish them well.
                        `.trim(),
                    },
                ],
            },
        }

        try {
            vapiRef.current.start(assistantOptions as any)
        } catch (error) {
            console.error("Start failed:", error)
            isCallingRef.current = false
            setCallStatus("idle")
            toast.error("Failed to start. Please try again.")
        }
    }

    const stopInterview = () => {
        vapiRef.current?.stop()
        isCallingRef.current = false
        setCallStatus("idle")
    }

    const statusLabel = {
        idle: "Click mic to start interview...",
        connecting: "Connecting...",
        active: "Interview in Progress...",
        ended: "Interview Ended",
    }[callStatus]

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between bg-white p-4 md:p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-50 rounded-2xl text-blue-600">
                            <Video className="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                        <div>
                            <h2 className="text-lg md:text-xl font-extrabold text-gray-900 tracking-tight">Active Interview</h2>
                            <p className="text-xs md:text-sm text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">AI-Powered Session</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3 bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-2xl font-bold shadow-lg shadow-blue-100">
                        <Clock className="h-4 w-4 md:h-5 md:w-5" />
                        <span className="text-sm md:text-lg">5:00</span>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    {/* AI Interviewer */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-emerald-400/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative flex flex-col items-center justify-center rounded-[2.5rem] border border-gray-100 bg-white p-6 md:p-12 shadow-xl shadow-gray-200/40 overflow-hidden h-full min-h-[400px]">
                            {/* Status Indicator */}
                            <div className="absolute top-6 left-6 flex items-center gap-2">
                                <span className={`h-2.5 w-2.5 rounded-full ${speaker === 'ai' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`} />
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Interviewer</span>
                            </div>

                            <div className="relative flex items-center justify-center mb-8">
                                {(speaker === "ai" || speaker === "thinking") && (
                                    <>
                                        <div className="absolute h-[240px] w-[240px] md:h-[300px] md:w-[300px] rounded-full bg-emerald-400/10 animate-ping" />
                                        <div className="absolute h-[280px] w-[280px] md:h-[350px] md:w-[350px] rounded-full bg-emerald-400/5 animate-ping [animation-delay:0.3s]" />
                                    </>
                                )}

                                <div className={`z-10 overflow-hidden rounded-[3rem] border-8 shadow-2xl transition-all duration-500 ${speaker === "ai" || speaker === "thinking"
                                    ? "border-emerald-100 scale-105"
                                    : "border-gray-50 scale-100 opacity-80"
                                    }`}>
                                    <Image
                                        src="/ai-avator.jpg"
                                        alt="AI Avatar"
                                        width={240}
                                        height={240}
                                        className="h-[180px] w-[180px] md:h-[240px] md:w-[240px] object-cover"
                                    />
                                </div>
                            </div>

                            <div className="text-center space-y-2">
                                <p className={`text-sm md:text-base font-bold transition-all duration-300 ${speaker === "ai" ? "text-emerald-600" : speaker === "thinking" ? "text-emerald-400" : "text-gray-400"
                                    }`}>
                                    {speaker === "ai" ? "Speaking..." : speaker === "thinking" ? "Processing..." : "Active"}
                                </p>
                                <p className="text-gray-400 text-xs font-medium max-w-[200px]">Your professional AI interviewer is ready</p>
                            </div>
                        </div>
                    </div>

                    {/* Candidate */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-blue-400/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative flex flex-col items-center justify-center rounded-[2.5rem] border border-gray-100 bg-white p-6 md:p-12 shadow-xl shadow-gray-200/40 h-full min-h-[400px]">
                            {/* Status Indicator */}
                            <div className="absolute top-6 left-6 flex items-center gap-2">
                                <span className={`h-2.5 w-2.5 rounded-full ${speaker === 'user' ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}`} />
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Candidate</span>
                            </div>

                            <div className="relative flex items-center justify-center mb-8">
                                {speaker === "user" && (
                                    <>
                                        <div className="absolute h-[240px] w-[240px] md:h-[300px] md:w-[300px] rounded-full bg-blue-400/10 animate-ping" />
                                        <div className="absolute h-[280px] w-[280px] md:h-[350px] md:w-[350px] rounded-full bg-blue-400/5 animate-ping [animation-delay:0.3s]" />
                                    </>
                                )}

                                <div className={`z-10 overflow-hidden rounded-[3rem] border-8 shadow-2xl transition-all duration-500 ${speaker === "user"
                                    ? "border-blue-100 scale-105"
                                    : "border-gray-50 scale-100 opacity-80"
                                    }`}>
                                    <Image
                                        src={user?.picture || "/user.png"}
                                        alt="User Avatar"
                                        width={240}
                                        height={240}
                                        className="h-[180px] w-[180px] md:h-[240px] md:w-[240px] object-cover"
                                    />
                                </div>
                            </div>

                            <div className="text-center space-y-2">
                                <p className={`text-sm md:text-base font-bold transition-all duration-300 ${speaker === "user" ? "text-blue-600" : "text-gray-400"
                                    }`}>
                                    {speaker === "user" ? "Transmitting..." : user?.name || "Guest Candidate"}
                                </p>
                                <p className="text-gray-400 text-xs font-medium max-w-[200px]">Ensure your microphone is clear</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Controls Bar */}
                <div className="flex flex-col items-center justify-center p-6 bg-white rounded-[2rem] border border-gray-100 shadow-md">
                    <div className="flex items-center gap-8">
                        <Button
                            onClick={startInterview}
                            variant="outline"
                            size="icon"
                            disabled={callStatus === "connecting" || callStatus === "active"}
                            className="rounded-2xl h-16 w-16 border-gray-100 hover:border-blue-400 hover:bg-blue-50 transition-all group"
                        >
                            <Mic className={`h-6 w-6 transition-colors ${callStatus === 'active' ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'}`} />
                        </Button>

                        <AleartDialogBox stopInterview={stopInterview}>
                            <Button
                                size="icon"
                                disabled={callStatus === "idle" || callStatus === "ended"}
                                className="rounded-2xl h-16 w-16 bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200 group transition-all"
                            >
                                <PhoneOff className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                            </Button>
                        </AleartDialogBox>
                    </div>

                    <div className="mt-4 px-6 py-2 bg-gray-50 rounded-full">
                        <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest leading-none">
                            {statusLabel}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page