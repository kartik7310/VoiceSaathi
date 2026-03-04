"use client"

import React from "react"
import { CheckCircle, Send } from "lucide-react"
import { useRouter } from "next/navigation"

const InterviewCompleted = () => {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4">
            <CheckCircle className="text-green-500 w-20 h-20" />
            <h1 className="text-4xl font-bold mt-6 text-gray-900">
                Interview Complete!
            </h1>
            <p className="text-gray-500 mt-3 text-center max-w-xl">
                Thank you for participating in the AI-driven interview.
                Your responses have been successfully recorded.
            </p>
            <div className="mt-10 w-full max-w-4xl rounded-2xl overflow-hidden shadow-sm bg-white">
                <img
                    src="https://illustrations.popsy.co/amber/video-call.svg"
                    alt="Interview illustration"
                    className="w-full h-80 object-contain bg-orange-50"
                />
            </div>
            <div className="flex flex-col items-center mt-14 max-w-xl text-center">
                <div className="bg-blue-600 rounded-full p-4 shadow-md">
                    <Send className="text-white w-6 h-6" />
                </div>
                <h2 className="text-2xl font-semibold mt-5">
                    What's Next?
                </h2>
                <p className="text-gray-500 mt-3">
                    Our AI is analyzing your responses and generating detailed feedback.
                    You will be able to review your performance and improvement suggestions shortly.
                </p>

                <button
                    onClick={() => router.push("/dashboard")}
                    className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
                >
                    View Your Results
                </button>

            </div>

        </div>
    )
}

export default InterviewCompleted