"use client"
import { useAuth } from '@/app/provider'
import { Button } from '@/components/ui/button'
import supabase from '@/services/supabaseClient'
import { Video } from 'lucide-react'
import Link from 'next/link'
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
        <div className="space-y-6">
            <div>
                <h2 className='text-2xl md:text-3xl font-bold text-gray-900'>Scheduled Interviews</h2>
                <p className='text-sm md:text-base text-gray-500 mt-1'>View and track interviews scheduled with candidates</p>
            </div>

            {interview?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <Video className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                        No scheduled interviews
                    </h3>
                    <p className="mt-2 max-w-xs text-sm text-gray-500">
                        You haven't scheduled any interviews yet. Start by inviting candidates to your created interview modules.
                    </p>
                    <Link href="/dashboard" className="mt-6">
                        <Button className="bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-100">
                            Go to Dashboard
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {interview?.map((interview, index) => (
                        <InterviewCard
                            key={interview.interview_id}
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