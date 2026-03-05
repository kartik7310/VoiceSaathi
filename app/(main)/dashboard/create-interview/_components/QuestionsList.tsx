
"use client"
import { Button } from '@/components/ui/button'
import { extractJSON } from '@/services/constants'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import QuestionContainerList from './QuestionContainerList'
import supabase from '@/services/supabaseClient'
import { useAuth } from '@/app/provider'
import { v4 as uuidv4 } from 'uuid';

const QuestionsList = ({ formData, onCreateInterview }: any) => {
    const [loading, setLoading] = useState(false);
    const [questionsList, setQuestionsList] = useState([]);
    const [savingLoading, setSavingLoading] = useState(false);
    const hasFetched = useRef(false);
    const { user } = useAuth();
    const interviewId = uuidv4();

    useEffect(() => {
        if (formData && !hasFetched.current) {
            hasFetched.current = true;
            GenerateQuesions()
        }
    }, [formData])

    const GenerateQuesions = async () => {
        setLoading(true);
        try {
            const res = await axios.post("/api/ai-model", formData);

            const content = res.data?.content;
            if (!content) throw new Error("Invalid AI response");

            const cleanJSON = extractJSON(content);
            if (!cleanJSON) throw new Error("JSON not found");

            const parsed = JSON.parse(cleanJSON);

            setQuestionsList(parsed?.interviewQuestions ?? []);
        } catch (error) {
            console.log(error);
            toast("Server error");
        } finally {
            setLoading(false);
        }
    };
    const handleFinish = async () => {
        try {
            setSavingLoading(true);
            await supabase.from("Interviews").insert([
                {
                    ...formData,
                    questions: questionsList,
                    userEmail: user?.email,
                    interview_id: interviewId,
                }
            ]);
            onCreateInterview(interviewId);
            setSavingLoading(false);
            toast("Interview created successfully");
        } catch (error: any) {
            console.log(error.message);
            toast("Error creating interview");
        } finally {
            setSavingLoading(false);
        }
    }
    return (
        <div className="w-full">
            {loading ? (
                <div className="py-20 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-6 max-w-sm text-center">
                        <div className="relative">
                            <div className="h-16 w-16 md:h-20 md:w-20 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="h-8 w-8 text-blue-600 animate-pulse" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-xl font-bold text-gray-900">
                                Generating Questions
                            </h2>
                            <p className="text-sm text-gray-500 leading-relaxed px-4">
                                Our AI is analyzing your job description to create the perfect interview questions.
                            </p>
                        </div>
                    </div>
                </div>
            ) : questionsList.length > 0 ? (
                <div className="p-4 md:p-8 space-y-8">
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 md:p-6 flex gap-4 items-start">
                        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-tight">Success</h3>
                            <p className="text-sm text-emerald-700/80 mt-0.5">We've generated {questionsList.length} relevant questions for this role.</p>
                        </div>
                    </div>

                    <QuestionContainerList questionsList={questionsList} />

                    <div className="pt-8 border-t border-gray-50 flex flex-col sm:flex-row justify-end gap-3">
                        <Button
                            className="h-12 px-10 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 rounded-xl font-bold"
                            onClick={handleFinish}
                            disabled={savingLoading}
                        >
                            {savingLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Finish & Generate Interview Link"
                            )}
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                    <div className="h-16 w-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 15.667c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Something went wrong</h3>
                    <p className="text-sm text-gray-500 mt-1">Failed to generate questions. Please try again.</p>
                    <Button variant="outline" className="mt-6 rounded-xl" onClick={GenerateQuesions}>
                        Try Again
                    </Button>
                </div>
            )}
        </div>
    )
}

export default QuestionsList