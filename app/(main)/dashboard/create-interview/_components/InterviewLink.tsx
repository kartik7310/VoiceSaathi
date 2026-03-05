"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    ArrowLeft,
    Calendar,
    List,
    Mail,
    Phone,
    Plus,
    Share,
    Timer,
    Copy,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

const SuccessTick = () => (
    <div className="relative flex items-center justify-center">
        {/* soft glow */}
        <div className="absolute h-24 w-24 rounded-full bg-green-100 blur-xl" />

        {/* circle */}
        <svg
            className="relative h-15 w-15"
            viewBox="0 0 52 52"
        >
            <circle
                cx="26"
                cy="26"
                r="25"
                fill="#22c55e"
            />
            <path
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 27l7 7 17-17"
            />
        </svg>
    </div>
)

const InterviewLink = ({ interviewId, formData, question = [] }: any) => {
    const [copied, setCopied] = useState(false)

    const interviewLink =
        process.env.NEXT_PUBLIC_APP_URL + "/" + interviewId

    const copyLink = async () => {
        await navigator.clipboard.writeText(interviewLink)
        toast("Link copied ")
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }
    const shareToMail = () => {
        window.location.href = `mailto:?subject=Interview Invitation&body=You are invited to an interview. Click the link to join: ${interviewLink}`
    }
    const shareToPhone = () => {
        window.location.href = `tel:?subject=Interview Invitation&body=You are invited to an interview. Click the link to join: ${interviewLink}`
    }
    return (
        <div className="p-4 md:p-8">
            <div className="max-w-xl mx-auto space-y-10">
                <div className="flex flex-col items-center text-center space-y-4 pt-4">
                    <SuccessTick />
                    <div className="space-y-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Interview Ready 🎉
                        </h2>
                        <p className="text-sm md:text-base text-gray-500 leading-relaxed px-4">
                            Your AI interview module has been created successfully.
                            Share the link below with your candidates.
                        </p>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-3xl p-5 md:p-8 space-y-8 border border-gray-100">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                Private Access Link
                            </h3>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                                ACTIVE
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="flex-1 bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 break-all shadow-sm">
                                {interviewLink}
                            </div>
                            <Button
                                onClick={copyLink}
                                className="h-11 sm:h-auto bg-blue-600 hover:bg-blue-700 cursor-pointer shadow-md shadow-blue-50 px-6 rounded-xl transition-all"
                            >
                                {copied ? "Success!" : "Copy Link"}
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center text-center gap-2 shadow-sm">
                            <Timer size={20} className="text-blue-500" />
                            <div className="space-y-0.5">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Duration</p>
                                <p className="text-sm font-bold text-gray-800">{formData?.interviewDuration || "15 min"}</p>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center text-center gap-2 shadow-sm">
                            <List size={20} className="text-blue-500" />
                            <div className="space-y-0.5">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Questions</p>
                                <p className="text-sm font-bold text-gray-800">{question.length || 10} Items</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase cursor-pointer tracking-widest text-center">
                            Fast Share
                        </h3>
                        <div className="flex justify-center gap-4">
                            <button className="h-12 w-12 cursor-pointer rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm" onClick={shareToMail}>
                                <Mail size={20} />
                            </button>
                            <button className="h-12 w-12 cursor-pointer rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-green-50 hover:text-green-600 hover:border-green-100 transition-all shadow-sm" onClick={shareToPhone}>
                                <Phone size={20} />
                            </button>
                            <button onClick={copyLink} className="h-12 w-12 cursor-pointer rounded-full bg-white border border-gray-100 flex  items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm">
                                <Share size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
                    <Link href="/dashboard" className="w-full sm:w-auto order-2 sm:order-1">
                        <Button variant="ghost" className="w-full h-12 rounded-xl font-semibold gap-2">
                            <ArrowLeft size={18} />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <Link href="/dashboard/create-interview" className="w-full sm:w-auto order-1 sm:order-2">
                        <Button
                            className="w-full h-12 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl font-bold gap-2"
                            onClick={() => window.location.reload()}
                        >
                            <Plus size={18} />
                            Create New Template
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default InterviewLink