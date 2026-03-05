"use client"
import { useAuth } from '@/app/provider'
import supabase from '@/services/superbaseClinet'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import InterviewDetailsContainer from './_components/InterviewDetailsContainer'
import CandidatesList from './_components/CandidatesList'

const InterviewDetails = () => {
    const { interview_id } = useParams()
    const { user } = useAuth()
    const [interview, setInterview] = useState<any>(null)
    useEffect(() => {
        getInterviewDetails()
    }, [user])

    const getInterviewDetails = async () => {
        const { data, error } = await supabase
            .from("Interviews")
            .select("jobPosition, interviewDuration,interviewType ,interview_id ,questions,created_at ,Feedback(*)")
            .eq("userEmail", user?.email)
            .eq("interview_id", interview_id)

        console.log("interviewDetails data into details page", data);
        if (data) {
            setInterview(data[0])
        } else {
            return <p>No interview found</p>
        }

    }
    return (
        <div>
            <h2 className='text-2xl font-semibold border-b pb-2'>Interview Details</h2>
            <InterviewDetailsContainer interview={interview} />
            <CandidatesList candidateInformation={interview?.Feedback} />
        </div>
    )
}

export default InterviewDetails