"use client "
import { Button } from '@/components/ui/button'
import React from 'react'

const QuestionContainerList = ({ questionsList }: any) => {
    return (
        <div>
            <div className="w-full rounded-2xl border bg-white p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Generated Interview Questions
                    </h2>

                    <span className="text-sm text-gray-500">
                        {questionsList.length} Questions
                    </span>
                </div>
                <div className="space-y-4">
                    {questionsList.map((question: any, index: number) => (
                        <div
                            key={index}
                            className="group rounded-xl border border-gray-200 bg-gray-50/50 p-5 transition-all hover:bg-white hover:shadow-md"
                        >
                            <div className="flex items-start gap-3">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                                    {index + 1}
                                </span>

                                <h3 className="text-sm font-medium text-gray-900 leading-relaxed">
                                    {question.question}
                                </h3>
                            </div>
                            <div className="mt-3 ml-10">
                                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 border border-blue-200">
                                    {question.type}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    )
}

export default QuestionContainerList