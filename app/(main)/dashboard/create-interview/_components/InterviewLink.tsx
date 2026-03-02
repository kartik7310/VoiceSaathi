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

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-3 bg-gray-50 mt-10">
            <div className="w-full max-w-2xl space-y-8">

                <div className="flex flex-col items-center text-center space-y-3">
                    <SuccessTick />

                    <h2 className="text-2xl font-semibold text-gray-900">
                        Interview Ready 🎉
                    </h2>

                    <p className="text-gray-500 max-w-md">
                        Your AI interview has been created successfully.
                        Share the link below with your candidate to begin.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border p-5 space-y-4">

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-medium text-gray-600">
                                Interview Link
                            </h2>
                            <p className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-lg">30 days valid</p>
                        </div>

                        <div className="flex gap-2 mt-4">
                            <input
                                value={interviewLink}
                                readOnly
                                className="flex-1 rounded-lg border px-4 py-3 bg-gray-50 text-sm"
                            />

                            <Button onClick={copyLink} className="flex gap-2 cursor-pointer">
                                <Copy size={16} />
                                {copied ? "Copied" : "Copy"}
                            </Button>
                        </div>
                    </div>
                    <div className="flex gap-2">

                        <div className="flex items-center justify-center gap-2 bg-gray-50 rounded-xl py-3 px-4">
                            <Timer size={18} className="text-gray-600" />
                            <p className="text-sm font-medium">
                                {formData?.interviewDuration}
                            </p>
                        </div>

                        <div className="flex items-center justify-center gap-2 bg-gray-50 rounded-xl py-3 px-4">
                            <List size={18} className="text-gray-600" />
                            <p className="text-sm font-medium">
                                {question.length ? question.length : 10} Questions
                            </p>
                        </div>

                    </div>
                    <div className="space-y-3">
                        <h3 className="font-semibold text-gray-700">
                            Share Interview
                        </h3>

                        <div className="flex flex-wrap gap-3">
                            <Button variant="outline" className="flex gap-2">
                                <Mail size={16} /> Email
                            </Button>

                            <Button variant="outline" className="flex gap-2">
                                <Phone size={16} /> WhatsApp
                            </Button>

                            <Button
                                variant="outline"
                                onClick={copyLink}
                                className="flex gap-2"
                            >
                                <Share size={16} /> Copy Link
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between ">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="flex gap-2 cursor-pointer">
                            <ArrowLeft size={16} />
                            Dashboard
                        </Button>

                    </Link>
                    <Link href="/dashboard/create-interview">
                        <Button className="flex gap-2 cursor-pointer">
                            <Plus size={16} />
                            New Interview
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default InterviewLink