
"use client"
import React, { useContext, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useAuth } from "@/app/provider"
import { Button } from "@/components/ui/button"
import { Clock, Mic, PhoneOff } from "lucide-react"
import Vapi from "@vapi-ai/web"
import { interviewDataContext } from "@/context/interviewDataContext"
import AleartDialogBox from "./_components/AleartDialogBox"
import { toast } from "sonner"
import axios from "axios"
import supabase from "@/services/superbaseClinet"
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
        <div className="min-h-screen bg-gray-50 p-5">
            <div className="flex justify-between mx-16 mb-4">
                <h2 className="text-slate-500 font-semibold text-lg">AI Interview Session</h2>
                <div className="flex items-center gap-2">
                    <Clock className="text-blue-500 h-5 w-5" />
                    <p className="font-bold text-blue-500">5:00</p>
                </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">

                {/* AI Interviewer */}
                <div className="flex flex-col items-center justify-center rounded-2xl border bg-white p-8 shadow-sm">
                    <h2 className="mb-5 text-lg font-semibold text-gray-800">
                        AI Interviewer
                    </h2>

                    <div className="relative flex items-center justify-center">
                        {(speaker === "ai" || speaker === "thinking") && (
                            <>
                                <span className="absolute inline-flex h-[220px] w-[220px] rounded-full bg-green-400 opacity-20 animate-ping" />
                                <span className="absolute inline-flex h-[240px] w-[240px] rounded-full bg-green-400 opacity-10 animate-ping [animation-delay:0.3s]" />
                                <span className="absolute inline-flex h-[260px] w-[260px] rounded-full bg-green-400 opacity-5 animate-ping [animation-delay:0.6s]" />
                            </>
                        )}

                        <div
                            className={`overflow-hidden rounded-full border-4 shadow-md transition-all duration-300 ${speaker === "ai" || speaker === "thinking"
                                ? "border-green-400 shadow-green-200 shadow-lg"
                                : "border-gray-200"
                                }`}
                        >
                            <Image
                                src="/ai-avator.jpg"
                                alt="AI Avatar"
                                width={200}
                                height={200}
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <p
                        className={`mt-4 text-sm font-medium transition-all duration-300 ${speaker === "ai"
                            ? "text-green-500"
                            : speaker === "thinking"
                                ? "text-green-400"
                                : "text-gray-400"
                            }`}
                    >
                        {speaker === "ai"
                            ? "🎙️ Speaking..."
                            : speaker === "thinking"
                                ? "🤖 Thinking..."
                                : "Listening..."}
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl border bg-white p-8 shadow-sm">
                    <h2 className="mb-6 text-lg font-semibold text-gray-800">
                        You
                    </h2>

                    <div className="relative flex items-center justify-center">
                        {speaker === "user" && (
                            <>
                                <span className="absolute inline-flex h-[220px] w-[220px] rounded-full bg-blue-400 opacity-20 animate-ping" />
                                <span className="absolute inline-flex h-[240px] w-[240px] rounded-full bg-blue-400 opacity-10 animate-ping [animation-delay:0.3s]" />
                                <span className="absolute inline-flex h-[260px] w-[260px] rounded-full bg-blue-400 opacity-5 animate-ping [animation-delay:0.6s]" />
                            </>
                        )}

                        <div
                            className={`overflow-hidden rounded-full border-4 shadow-md transition-all duration-300 ${speaker === "user"
                                ? "border-blue-400 shadow-blue-200 shadow-lg"
                                : "border-gray-200"
                                }`}
                        >
                            <Image
                                src={user?.picture || "/user.png"}
                                alt="User Avatar"
                                width={200}
                                height={200}
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <p
                        className={`mt-4 text-sm font-medium transition-all duration-300 ${speaker === "user" ? "text-blue-500" : "text-gray-400"
                            }`}
                    >
                        {speaker === "user"
                            ? "🎙️ Speaking..."
                            : user?.name || "Guest User"}
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center justify-center mt-10">
                <div className="flex items-center justify-center gap-6">
                    <Button
                        onClick={startInterview}
                        variant="outline"
                        size="icon"
                        disabled={callStatus === "connecting" || callStatus === "active"}
                        className="rounded-full h-14 w-14"
                    >
                        <Mic className="h-5 w-5" />
                    </Button>

                    <AleartDialogBox stopInterview={stopInterview}>
                        <Button
                            size="icon"
                            disabled={callStatus === "idle" || callStatus === "ended"}
                            className="rounded-full h-14 w-14 bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
                        >
                            <PhoneOff className="h-5 w-5" />
                        </Button>
                    </AleartDialogBox>
                </div>
                <p className="text-sm font-medium text-gray-600 mt-4">{statusLabel}</p>
            </div>
        </div>
    )
}

export default Page