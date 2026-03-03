"use client"

import React from "react"
import Image from "next/image"
import { useAuth } from "@/app/provider"
import { Button } from "@/components/ui/button"
import { Clock, Mic, PhoneOff } from "lucide-react"

const Page = () => {
    const { user } = useAuth()

    return (
        <div className="min-h-screen bg-gray-50 p-5">
            <div className="flex justify-between mr-17 ml-17 mb-2">
                <h2 className=" text-slate-500 font-semibold text-lg">AI Interview Session</h2>
                <div className="flex items-center gap-2">
                    <Clock className="text-blue-500 h-5 w-5" />
                    <p className="font-bold text-blue-500">5:00</p>
                </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
                <div className="flex flex-col items-center justify-center rounded-2xl border bg-white p-8 shadow-sm">
                    <h2 className="mb-5 text-lg font-semibold text-gray-800">
                        AI Interviewer
                    </h2>

                    <div className="overflow-hidden rounded-full border shadow-md">
                        <Image
                            src="/ai-avator.jpg"
                            alt="AI Interviewer Avatar"
                            width={200}
                            height={200}
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl border bg-white p-8 shadow-sm">
                    <h2 className="mb-6 text-lg font-semibold text-gray-800">
                        You
                    </h2>

                    <div className="overflow-hidden rounded-full border shadow-md">
                        <Image
                            src={user?.picture}
                            alt="User Avatar"
                            width={200}
                            height={200}
                            className="object-cover"
                        />
                    </div>

                    <p className="mt-4 text-sm font-medium text-gray-600">
                        {user?.name || "Guest User"}
                    </p>
                </div>

            </div>
            <div className="flex items-center justify-center gap-6 mt-6">
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-14 w-14 cursor-pointer"
                >
                    <Mic className="h-5 w-5" />
                </Button>
                <Button
                    size="icon"
                    className="rounded-full h-14 w-14 bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                >
                    <PhoneOff className="h-5 w-5" />
                </Button>

            </div>
        </div>
    )
}

export default Page