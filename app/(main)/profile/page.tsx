"use client"

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/app/provider'
import supabase from '@/services/supabaseClient'
import moment from 'moment'
import {
    User,
    Mail,
    Calendar,
    Video,
    Award,
    ChevronRight,
    Briefcase,
    MessageSquare,
    TrendingUp,
    ShieldCheck
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import InterviewCard from '../dashboard/_components/InterviewCard'
import CandidateFeedbackDialog from '../schedule-interview/[interview_id]/details/_components/CandidateFeedbackDialog'

const ProfilePage = () => {
    const { user } = useAuth()
    const [createdInterviews, setCreatedInterviews] = useState<any[]>([])
    const [performanceFeedbacks, setPerformanceFeedbacks] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<'interviews' | 'feedback'>('interviews')

    useEffect(() => {
        if (user?.email) {
            fetchData()
        }
    }, [user])

    const fetchData = async () => {
        setLoading(true)
        try {
            // Fetch created interviews
            const { data: interviews, error: intError } = await supabase
                .from('Interviews')
                .select('*, Feedback(*)')
                .eq('userEmail', user.email)
                .order('created_at', { ascending: false })

            if (intError) console.error('Error fetching interviews:', intError)
            else setCreatedInterviews(interviews || [])

            // Fetch performance feedbacks (where user was the candidate)
            const { data: feedbacks, error: fbError } = await supabase
                .from('Feedback')
                .select('*, Interviews(jobPosition, interviewType)')
                .eq('userEmail', user.email)
                .order('created_at', { ascending: false })

            if (fbError) console.error('Error fetching feedbacks:', fbError)
            else setPerformanceFeedbacks(feedbacks || [])

        } catch (error) {
            console.error('Error in fetchData:', error)
        } finally {
            setLoading(false)
        }
    }

    if (!user && !loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <p className="text-gray-500">Please log in to view your profile.</p>
        </div>
    )

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12">
            {/* Profile Header */}
            <div className="relative overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mt-2 md:p-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-40 -ml-16 -mb-16" />

                <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
                    <div className="relative group">
                        {loading ? (
                            <Skeleton className="w-32 h-32 rounded-full" />
                        ) : (
                            <div className="relative">
                                <Image
                                    src={user?.picture || '/user.png'}
                                    alt={user?.name || 'User'}
                                    width={128}
                                    height={128}
                                    className="rounded-full border-4 border-white shadow-xl"
                                />
                                <div className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full border-2 border-white shadow-lg">
                                    <ShieldCheck className="w-4 h-4 text-white" />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-4">
                        <div className="space-y-1">
                            {loading ? (
                                <Skeleton className="h-10 w-64 mx-auto md:mx-0" />
                            ) : (
                                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                                    {user?.name}
                                </h1>
                            )}
                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-gray-500">
                                <div className="flex items-center gap-1.5 text-sm font-medium">
                                    <Mail className="w-4 h-4 text-blue-500" />
                                    {user?.email}
                                </div>
                                <div className="flex items-center gap-1.5 text-sm font-medium">
                                    <Calendar className="w-4 h-4 text-blue-500" />
                                    Joined {moment(user?.created_at).format('MMMM YYYY')}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                            <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 text-center min-w-[120px]">
                                <p className="text-2xl font-bold text-gray-900">{createdInterviews.length}</p>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Interviews</p>
                            </div>
                            <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 text-center min-w-[120px]">
                                <p className="text-2xl font-bold text-gray-900">{performanceFeedbacks.length}</p>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Feedbacks</p>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <Link href="/dashboard/create-interview">
                            <Button className="rounded-xl px-6 h-12 bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-100">
                                Create New Interview
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-col space-y-6">
                <div className="flex items-center gap-1 p-1 bg-gray-100/80 rounded-2xl w-fit">
                    <button
                        onClick={() => setActiveTab('interviews')}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 ${activeTab === 'interviews' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Briefcase className="w-4 h-4" />
                        My Interviews
                    </button>
                    <button
                        onClick={() => setActiveTab('feedback')}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 ${activeTab === 'feedback' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Award className="w-4 h-4" />
                        My Feedbacks
                    </button>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => <Skeleton key={i} className="h-64 rounded-2xl" />)}
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {activeTab === 'interviews' ? (
                            createdInterviews.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {createdInterviews.map((interview, index) => (
                                        <InterviewCard
                                            key={interview.id}
                                            interview={interview}
                                            index={index}
                                            viewDetails={true}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 text-center px-6">
                                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                        <Video className="w-8 h-8 text-blue-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">No interviews created</h3>
                                    <p className="text-gray-500 mt-2 max-w-xs">You haven't created any interview modules yet. Start by creating one to invite candidates.</p>
                                    <Link href="/dashboard/create-interview" className="mt-6">
                                        <Button variant="outline" className="rounded-xl px-8 border-blue-200 text-blue-600 hover:bg-blue-50">
                                            Create First Module
                                        </Button>
                                    </Link>
                                </div>
                            )
                        ) : (
                            performanceFeedbacks.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {performanceFeedbacks.map((fb, index) => (
                                        <FeedbackItem key={fb.id} feedback={fb} />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 text-center px-6">
                                    <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                                        <Award className="w-8 h-8 text-indigo-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">No feedback sessions found</h3>
                                    <p className="text-gray-500 mt-2 max-w-xs">You haven't participated in any interview sessions yet. Join an interview to get AI-powered feedback.</p>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

const FeedbackItem = ({ feedback }: { feedback: any }) => {
    const rawFeedback = feedback.feedback
    const rating = rawFeedback?.rating
    const avgRating = rating ? (
        (Number(rating.technicalSkills) +
            Number(rating.communication) +
            Number(rating.problemSolving) +
            Number(rating.experience)) / 4
    ).toFixed(1) : '0.0'

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {feedback.Interviews?.jobPosition || 'General Interview'}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">
                        {moment(feedback.created_at).format('MMM DD, YYYY • hh:mm A')}
                    </p>
                </div>
                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                    {avgRating}/10
                </div>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                    <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            <span>Technical</span>
                            <span>{rating?.technicalSkills}/10</span>
                        </div>
                        <Progress value={(Number(rating?.technicalSkills) || 0) * 10} className="h-1.5" />
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            <span>Communication</span>
                            <span>{rating?.communication}/10</span>
                        </div>
                        <Progress value={(Number(rating?.communication) || 0) * 10} className="h-1.5" />
                    </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-start gap-3">
                        <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                        <p className="text-sm text-gray-600 line-clamp-2 italic leading-relaxed">
                            {rawFeedback?.summary}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${rawFeedback?.Recommendation === 'Recommended'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-rose-50 text-rose-700'
                        }`}>
                        <TrendingUp className="w-3.5 h-3.5" />
                        {rawFeedback?.Recommendation}
                    </div>

                    <CandidateFeedbackDialog candidateInformation={[feedback]} />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
