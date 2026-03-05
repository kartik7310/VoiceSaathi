"use client"

import React from "react"
import { Video, Phone } from "lucide-react"
import Link from "next/link"
const options = [
    {
        title: "Create New Interview",
        description:
            "Create AI-driven interviews and schedule them with candidates.",
        icon: Video,
        link: "/dashboard/create-interview",
    },
    {
        title: "Schedule Interview",
        description:
            "Plan and manage upcoming interviews with automated workflows.",
        icon: Phone,
        link: "/schedule-interview",
    },
]

const CreateOptions = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6">
            {options.map((item, index) => {
                const Icon = item.icon

                return (
                    <div
                        key={index}
                        className="group flex flex-col items-start rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden"
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                            <Icon className="h-24 w-24" />
                        </div>

                        {/* Icon */}
                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                            <Icon className="h-7 w-7" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 w-full">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">
                                {item.title}
                            </h2>

                            <p className="text-sm text-gray-500 leading-relaxed mb-6">
                                {item.description}
                            </p>

                            <Link href={item.link} className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 group-hover:translate-x-1 transition-all">
                                Get Started
                                <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CreateOptions