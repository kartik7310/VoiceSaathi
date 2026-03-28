"use client"
import { useAuth } from "@/app/provider"
import InterviewCard from "../dashboard/_components/InterviewCard"
import { useEffect, useState } from "react"
import supabase from "@/services/supabaseClient"
import { Button } from "@/components/ui/button"
import { Video } from "lucide-react"
import Link from "next/link"

const AllInterviews = () => {
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

        if (error) {
            console.log("Supabase error:", error)
            return
        }


        setPreviousInterview(data || [])
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl md:text-3xl font-bold mt-2 text-gray-900">
                    Previously Created Interviews
                </h2>
                <p className="text-sm md:text-base text-gray-500 mt-1">
                    Manage and review all your AI-driven interview modules
                </p>
            </div>

            {previousInterview?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <Video className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                        No interviews created yet
                    </h3>
                    <p className="mt-2 max-w-xs text-sm text-gray-500">
                        Start by creating your first AI-driven interview module to begin evaluating candidates smarter.
                    </p>
                    <Link href="/dashboard/create-interview" className="mt-6">
                        <Button className="bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-100">
                            Create Module
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

export default AllInterviews