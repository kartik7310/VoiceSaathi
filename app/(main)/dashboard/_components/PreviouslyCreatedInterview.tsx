"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Video } from "lucide-react"
import Link from "next/link"
import supabase from "@/services/supabaseClient"
import { useAuth } from "@/app/provider"
import InterviewCard from "./InterviewCard"

const PreviouslyCreatedInterview = () => {
    const { user } = useAuth()

    const [previousInterview, setPreviousInterview] = useState<any[]>([])
    useEffect(() => {
        if (user?.email) {
            getAllInterviewList()
        }
    }, [user])

    const getAllInterviewList = async () => {
        const { data, error } = await supabase
            .from("Interviews")
            .select("*")
            .eq("userEmail", user.email)
            .order("created_at", { ascending: false })
            .limit(6)

        if (error) {
            console.log("Supabase error:", error)
            return
        }

        console.log("prevInterview", data)
        setPreviousInterview(data || [])
    }

    return (
        <div className="mt-8 md:mt-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        Previously Created Interviews
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Review and manage your past interview setups
                    </p>
                </div>
                {previousInterview?.length > 0 && (
                    <Link href="/all-interviews">
                        <Button variant="outline" size="sm" className="w-full sm:w-auto font-semibold">
                            View All
                        </Button>
                    </Link>
                )}
            </div>

            {previousInterview?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <Video className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                        No interviews yet
                    </h3>
                    <p className="mt-2 max-w-xs text-sm text-gray-500">
                        Create your first AI-driven interview template to get started with smart hiring.
                    </p>
                    <Link href="/dashboard/create-interview" className="mt-6">
                        <Button className="bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-100 px-8">
                            Create Now
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {previousInterview.map((interview, index) => (
                        <InterviewCard
                            key={interview.id}
                            interview={interview}
                            index={index}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default PreviouslyCreatedInterview