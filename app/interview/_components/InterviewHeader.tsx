"use client"

import React, { useContext } from "react"
import { Clock, LogOut } from "lucide-react"
import { interviewDataContext } from "@/context/interviewDataContext"
const InterviewHeader = () => {
    const { interviwQuestions } = useContext(interviewDataContext)
    console.log("interviewQuestion", interviwQuestions);

    return (
        <header className="w-full border-b bg-white px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
                {/* Left Section */}
                <div>
                    <h1 className="text-lg font-semibold text-gray-900">
                        Interview
                    </h1>
                    <p className="text-sm text-gray-500">
                        Candidate: <span className="font-medium">{interviwQuestions?.userName}</span>
                    </p>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-6">
                    {/* Exit Button */}
                    <button

                        className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                    >
                        <LogOut className="h-4 w-4" />
                        Exit
                    </button>
                </div>
            </div>
        </header>
    )
}

export default InterviewHeader