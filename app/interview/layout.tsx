"use client"
import { interviewDataContext } from '@/context/interviewDataContext'
import React, { useState } from 'react'
import InterviewHeader from './_components/InterviewHeader'


export default function Layout({ children }: { children: React.ReactNode }) {
    const [interviwQuestions, setInterviwQuestions] = useState([])
    return (
        <interviewDataContext.Provider value={{ interviwQuestions, setInterviwQuestions }}>
            <InterviewHeader />
            <div className=' bg-gray-50'>
                {children}
            </div>
        </interviewDataContext.Provider>

    )
}
