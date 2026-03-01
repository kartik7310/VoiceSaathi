"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Video } from "lucide-react"

const PreviouslyCreatedInterview = () => {
    const [previousInterview] = useState([])

    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm mt-5">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                    Previously Created Interviews
                </h2>
                <p className="text-sm text-gray-500">
                    Manage and review your past interview sessions.
                </p>
            </div>

            {/* Empty State */}
            {previousInterview.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                    {/* Icon */}
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
                        <Video className="h-7 w-7 text-blue-600" />
                    </div>

                    {/* Text */}
                    <h3 className="text-base font-medium text-gray-900">
                        No interviews created yet
                    </h3>

                    <p className="mt-2 max-w-sm text-sm text-gray-500">
                        Start by creating your first AI-driven interview and invite
                        candidates effortlessly.
                    </p>

                    {/* Action */}
                    <Button className="mt-6">
                        Create New Interview
                    </Button>
                </div>
            )}
        </div>
    )
}

export default PreviouslyCreatedInterview