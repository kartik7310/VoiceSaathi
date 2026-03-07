"use client"
import React, { useContext, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, Building2, Video, Settings, Loader2 } from "lucide-react"
import { useParams } from "next/navigation"
import supabase from "@/services/supabaseClient"
import { toast } from "sonner"
import { interviewDataContext } from "@/context/interviewDataContext"
import { useRouter } from "next/navigation"
export default function JoinInterviewPage() {
    const router = useRouter()
    const { interview_id } = useParams()
    const [interview, setInterview] = useState<any>()
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const { interviwQuestions, setInterviwQuestions } = useContext(interviewDataContext)
    console.log("interviwQuestions", interviwQuestions);
    useEffect(() => {
        interview_id && getInterviewDetails()
    }, [interview_id])
    const getInterviewDetails = async () => {
        try {
            setLoading(true)
            let { data, error } = await supabase.from("Interviews").select("jobDescription,interviewDuration,jobPosition,interviewType").eq("interview_id", interview_id)
            if (data?.length == 0) {
                toast("invalid interview link")
                return
            }
            if (data) {
                setInterview(data[0])
            }
        } catch (error: any) {
            console.log(error.message);
            toast("invalid interview link")
        } finally {
            setLoading(false)
        }
    }
    const onJoinInterview = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('Interviews')
                .select("questions")
                .eq('interview_id', interview_id)
            if (data) {
                setInterviwQuestions({
                    questionList: data[0],
                    userName: userName,
                    userEmail: userEmail
                })
            }
            setLoading(false)
            router.push(`/interview/${interview_id}/start`)
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setLoading(false)
        }
    }
    return (
        <div >
            {/* Card */}
            <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center px-4 ">
                <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border p-4 space-y-2">
                    {/* Header */}
                    <div className="text-center space-y-1">
                        <h1 className="text-xl font-semibold text-blue-600">
                            AIcruiter
                        </h1>
                        <p className="text-sm text-gray-500">
                            AI-Powered Interview Platform
                        </p>
                    </div>
                    {/* Illustration */}
                    <div className="flex justify-center">
                        {/* Replace with your image */}
                        <img
                            src="/interview.png"
                            alt="Interview"
                            width={300}
                            height={300}
                        />
                    </div>
                    {/* Interview Title */}
                    <div className="text-center space-y-2">
                        <h2 className="text-lg font-semibold">
                            {interview?.jobPosition}
                        </h2>
                        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <Building2 size={16} />
                                {interview?.jobPosition}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock size={16} />
                                {interview?.interviewDuration}
                            </span>
                        </div>
                    </div>
                    {/* Name Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Enter your full name
                        </label>
                        <Input placeholder="e.g., John Smith" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        <label className="text-sm font-medium text-gray-700">
                            Enter your Email
                        </label>
                        <Input placeholder="e.g., John Smith" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                    </div>
                    {/* Instructions Box */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm">
                        <p className="font-medium text-blue-700 mb-2">
                            Before you begin
                        </p>
                        <ul className="space-y-1 text-blue-700 list-disc pl-5">
                            <li>Ensure you have a stable internet connection</li>
                            <li>Test your camera and microphone</li>
                            <li>Find a quiet place for the interview</li>
                        </ul>
                    </div>
                    {/* Actions */}
                    <div className="space-y-3">
                        <Button className="w-full flex gap-2" disabled={loading || !userName} onClick={onJoinInterview}>
                            <Video size={18} />
                            {loading && <Loader2 className="animate-spin" />}
                            Join Interview
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full flex gap-2"
                        >
                            <Settings size={18} />
                            Test Audio & Video
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
