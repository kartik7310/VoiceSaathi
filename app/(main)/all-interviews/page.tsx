"use client"
import { useAuth } from "@/app/provider"
import InterviewCard from "../dashboard/_components/InterviewCard"
import { useEffect, useState } from "react"
import supabase from "@/services/superbaseClinet"
import { Button } from "@/components/ui/button"
import { Video } from "lucide-react"

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

        console.log("prevInterview ", data)
        setPreviousInterview(data || [])
    }

    return (
        <div className="mt-6">

            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-700">
                    Previously Created Interviews
                </h2>

            </div>

            {/* Empty State */}
            {previousInterview?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">

                    {/* Icon */}
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
                        <Video className="h-7 w-7 text-blue-600" />
                    </div>

                    {/* Text */}
                    <h3 className="text-base font-medium text-gray-900">
                        No interviews created yet
                    </h3>

                    <p className="mt-2 max-w-sm text-sm text-gray-500">
                        Start by creating your first AI-driven interview and invite
                        candidates effortlessly.
                    </p>

                    {/* Button */}
                    <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                        Create New Interview
                    </Button>
                </div>
            ) : (
                /* Interview Grid */
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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