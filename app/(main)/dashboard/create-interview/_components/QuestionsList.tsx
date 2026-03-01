
"use client"
import { Button } from '@/components/ui/button'
import { extractJSON } from '@/services/constants'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import QuestionContainerList from './QuestionContainerList'

const QuestionsList = ({ formData }: any) => {
    const [loading, setLoading] = useState(false);
    const [questionsList, setQuestionsList] = useState([]);
    console.log("questionsList", questionsList);
    const hasFetched = useRef(false);
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
    return (
        <div className="flex items-center justify-center w-full py-12">
            {loading && (
                <div className="flex items-center gap-4 rounded-xl border border-blue-200 bg-blue-50 px-6 py-5 shadow-sm">
                    <div className="flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                    </div>
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
            )}
            {questionsList.length > 0 && (
                <QuestionContainerList questionsList={questionsList} />
            )}

        </div>
    )
}

export default QuestionsList