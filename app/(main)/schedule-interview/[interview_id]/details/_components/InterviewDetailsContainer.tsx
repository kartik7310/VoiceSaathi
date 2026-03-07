import { Calendar, Clock } from "lucide-react"
import moment from "moment"
import React from "react"

const InterviewDetailsContainer = ({ interview }: { interview: any }) => {
    console.log("interviewDetailsContainer interview", interview);

    // safely parse interview types
    let interviewTypes: string[] = []
    try {
        interviewTypes = interview?.interviewType
            ? JSON.parse(interview.interviewType)
            : []
    } catch {
        interviewTypes = []
    }

    return (
        <div className="mt-6 space-y-6">

            {/* Header */}
            <div >
                <h2 className="text-2xl font-semibold text-gray-800">
                    {interview?.jobPosition}
                </h2>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-3 gap-6 bg-white p-6 rounded-lg shadow-sm border">

                {/* Duration */}
                <div>
                    <p className="text-sm text-gray-500 mb-1">Duration</p>
                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                        <Clock size={18} />
                        {interview?.interviewDuration}
                    </div>
                </div>

                {/* Created On */}
                <div>
                    <p className="text-sm text-gray-500 mb-1">Created On</p>
                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                        <Calendar size={18} />
                        {moment(interview?.created_at).format("MMM DD, YYYY")}
                    </div>
                </div>

                {/* Interview Type */}
                <div>
                    <p className="text-sm text-gray-500 mb-2">Type</p>

                    <div className="flex gap-2 flex-wrap">
                        {interviewTypes.map((type, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
                            >
                                {type}
                            </span>
                        ))}
                    </div>
                </div>

            </div>

            {/* Job Description */}
            <div className="bg-white p-4 rounded-lg ">
                <h3 className="text-xl font-bold mb-1">Job Description</h3>

                <p className="text-gray-600 text-sm leading-relaxed border-b pb-2">
                    {interview?.jobDescription}
                </p>
            </div>

            {/* Questions */}
            <div className="bg-white p-3 rounded-lg -mt-3 ">
                <h3 className="text-xl font-semibold mb-3 border-b pb-2 font-bold ">Interview Questions</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {interview?.questions?.map((q: any, index: number) => (
                        <div
                            key={index}
                            className=" rounded-md"
                        >
                            <p className="text-gray-800 font-medium ">
                                <span className='text-blue-700 font-bold bg-blue-100 p-1 mr-2 rounded-xl'>
                                    {index + 1}.
                                </span>
                                {q.question}
                            </p>

                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default InterviewDetailsContainer