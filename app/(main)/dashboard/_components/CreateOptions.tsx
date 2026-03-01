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
        link: "/dashboard/schedule-interview",
    },
]

const CreateOptions = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {options.map((item, index) => {
                const Icon = item.icon

                return (
                    <div
                        key={index}
                        className="group cursor-pointer rounded-2xl border bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                    >
                        {/* Icon */}
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                            <Icon className="h-6 w-6 text-blue-600" />
                        </div>

                        {/* Content */}
                        <Link href={item.link}>
                            <h2 className="text-lg font-semibold text-gray-900">
                                {item.title}
                            </h2>

                            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                                {item.description}
                            </p>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default CreateOptions