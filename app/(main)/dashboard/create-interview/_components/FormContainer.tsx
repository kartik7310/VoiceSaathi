"use client"

import React, { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { interviewType } from "@/services/constants"
import { ArrowRight, Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
const FormContainer = ({ onHandleChangeInput, GoToNextStep }: any) => {

    const [selected, setSelected] = useState<string[] | null>([])
    useEffect(() => {
        if (interviewType) {
            onHandleChangeInput('interviewType', selected)
        }

    }, [selected])

    const handleInterviewType = (type: any) => {
        const current = selected ?? []
        const isSelected = current.includes(type)
        if (!isSelected) {
            setSelected([...current, type])
        } else {
            setSelected(current.filter((value) => value !== type))
        }
    }
    return (
        <div className="p-4 md:p-8">
            <div className="space-y-6 md:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Job Position */}
                    <div className="space-y-2.5">
                        <label className="text-sm font-bold text-gray-900 uppercase tracking-tight">
                            Job Position
                        </label>
                        <Input
                            placeholder="e.g. Full Stack Developer"
                            className="h-11 md:h-12 border-gray-200 focus:ring-blue-500 rounded-xl"
                            onChange={(e) => onHandleChangeInput('jobPosition', e.target.value)}
                        />
                    </div>

                    {/* Interview Duration */}
                    <div className="space-y-2.5">
                        <label className="text-sm font-bold text-gray-900 uppercase tracking-tight">
                            Interview Duration
                        </label>
                        <Select onValueChange={(value) => onHandleChangeInput('interviewDuration', value)}>
                            <SelectTrigger className="h-11 md:h-12 border-gray-200 rounded-xl">
                                <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-gray-100">
                                <SelectGroup>
                                    <SelectItem value="5 min">5 min</SelectItem>
                                    <SelectItem value="10 min">10 min</SelectItem>
                                    <SelectItem value="15 min">15 min</SelectItem>
                                    <SelectItem value="20 min">20 min</SelectItem>
                                    <SelectItem value="30 min">30 min</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2.5">
                    <label className="text-sm font-bold text-gray-900 uppercase tracking-tight">
                        Job Description / Skills
                    </label>
                    <Textarea
                        placeholder="Paste the job description or enter required skills (e.g. React, Node.js, System Design)"
                        className="min-h-[140px] border-gray-200 rounded-xl focus:ring-blue-500 resize-none p-4"
                        onChange={(e) => onHandleChangeInput('jobDescription', e.target.value)}
                    />
                </div>

                {/* Interview Type Selection */}
                <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-900 uppercase tracking-tight">
                        Focus Areas (Select one or more)
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                        {interviewType.map((item, index) => {
                            const Icon = item.icon
                            const active = selected?.find((value) => value === item.title)

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleInterviewType(item.title)}
                                    className={`    
                                         flex items-center gap-2.5 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all duration-200
                                         ${active
                                            ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100"
                                            : "bg-white text-gray-600 border-gray-100 hover:border-blue-400 hover:bg-blue-50/50"
                                        }
                                    `}
                                >
                                    <Icon className={`h-4 w-4 ${active ? "text-white" : "text-blue-500"}`} />
                                    {item.title}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 flex flex-col sm:flex-row justify-end gap-3 border-t border-gray-50 mt-8">
                    <Button
                        className="h-12 px-8 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 rounded-xl font-bold group"
                        onClick={() => GoToNextStep()}
                    >
                        Generate Interview Questions
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </div>
    )
}


export default FormContainer