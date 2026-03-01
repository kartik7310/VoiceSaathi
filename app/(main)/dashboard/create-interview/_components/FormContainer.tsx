"use client"

import React from "react"
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
const FormContainer = () => {
    const [selected, setSelected] = useState<string | null>(null)
    return (
        <div>
            <div className="mt-4 rounded-2xl border bg-white p-8 shadow-sm">
                <div className="space-y-5">
                    {/* Job Position */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Job Position
                        </label>
                        <Input placeholder="e.g. Full Stack Developer" className="mt-2" />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Job Description
                        </label>
                        <Textarea
                            placeholder="Enter details about the job, responsibilities, and required skills..."
                            className="min-h-[120px] mt-2"
                        />
                    </div>

                    {/* Interview Type */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Interview Mode
                        </label>
                        <Select>
                            <SelectTrigger className="w-full mt-2">
                                <SelectValue placeholder="Select interview Duration" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="15 min">15 min</SelectItem>
                                    <SelectItem value="30 min">30 min</SelectItem>
                                    <SelectItem value="45 min">45 min</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Interview Types
                        </label>

                        <div className="flex flex-wrap gap-2">
                            {interviewType.map((item, index) => {
                                const Icon = item.icon
                                const active = selected === item.title

                                return (
                                    <button
                                        key={index}
                                        onClick={() => setSelected(item.title)}
                                        className={`
                                             flex items-center gap-2 rounded-full border px-4 py-2 text-sm
                                             transition-all
                                             ${active
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-400"
                                            }
                                            `}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {item.title}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </div>
            <div className="flex justify-end mt-3">
                <Button className="bg-blue-600">Generate Interview <ArrowRight /></Button>
            </div>
        </div>
    )
}

export default FormContainer