
"use client"
import { Button } from '@/components/ui/button'
import { extractJSON } from '@/services/constants'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import QuestionContainerList from './QuestionContainerList'
import supabase from '@/services/superbaseClinet'
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
        <div className="w-full py-12">
            {loading && (
                <div className="flex items-center justify-center">
                    <div className="flex items-center gap-4 rounded-xl border border-blue-200 bg-blue-50 px-6 py-5 shadow-sm">
                        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />

                        <div className="space-y-1">
                            <h2 className="text-sm font-semibold text-blue-900">
                                Generating Interview Questions
                            </h2>
                            <p className="text-sm text-blue-700">
                                Our AI is creating questions based on your job description.
                                This may take a few seconds.
                            </p>
                        </div>
                    </div>
                </div>
            )}
            {!loading && questionsList.length > 0 && (
                <div className="space-y-6">

                    <QuestionContainerList questionsList={questionsList} />
                    <div className="flex justify-end">
                        <Button className="px-6" onClick={handleFinish} disabled={savingLoading}>
                            {savingLoading && <Loader2 className="h-6 w-6 animate-spin text-blue-600" />}
                            Create Interview Link and Finish
                        </Button>
                    </div>

                </div>
            )}

        </div>
    )
}

export default QuestionsList