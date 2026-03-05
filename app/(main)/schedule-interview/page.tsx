"use client"
import { useAuth } from '@/app/provider'
import { Button } from '@/components/ui/button'
import supabase from '@/services/superbaseClinet'
import { Video } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard'

const ScheduleInterview = () => {
    const { user } = useAuth()
    const [interview, setInterview] = useState<any[] | null>(null)
    useEffect(() => {
        if (user?.email) {
            fetchInterviewData()
        }
    }, [user])
    const fetchInterviewData = async () => {
        const { data, error } = await supabase
            .from("Interviews")
            .select("jobPosition, interviewDuration, interview_id,created_at ,Feedback(*)")
            .eq("userEmail", user.email)
            .order("created_at", { ascending: false })

        setInterview(data)
    }

    return (
        <div>
            <div >
                <h2 className='text-2xl font-bold mb-3 text-gray-700'>Scheduled Interviews</h2>

            </div>
            {interview?.length === 0 ? (
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
                    {interview?.map((interview, index) => (
                        <InterviewCard
                            key={interview.id}
                            interview={interview}
                            index={index}
                            viewDetails={true}
                        />
                    ))}
                </div>
            )}

        </div>
    )
}

export default ScheduleInterview