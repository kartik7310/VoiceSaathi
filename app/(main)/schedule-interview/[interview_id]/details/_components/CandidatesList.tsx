import { Button } from "@/components/ui/button"
import moment from "moment"
import React from "react"
import CandidateFeedbackDialog from "./CandidateFeedbackDialog"

const CandidatesList = ({ candidateInformation }: { candidateInformation: any }) => {

    return (
        <div className="mt-4 bg-white  ">

            {/* Header */}
            <h2 className="text-lg font-semibold border-b pb-2 mb-3">
                Candidates ({candidateInformation?.length || 0})
            </h2>

            {/* Candidate List */}
            <div className="space-y-3">
                {candidateInformation?.map((user: any) => (
                    <div
                        key={user.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition"
                    >

                        {/* Left Section */}
                        <div className="flex items-center gap-3">

                            {/* Avatar */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 text-white font-semibold">
                                {user?.userName?.[0]?.toUpperCase()}
                            </div>

                            {/* Name */}
                            <div>
                                <p className="font-medium text-gray-800">
                                    {user.userName}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Joined {moment(user.created_at).format("MMM DD, YYYY")}
                                </p>
                            </div>

                        </div>
                        <div className="flex gap-4 items-center ">
                            <h2 className="text-lg text-blue-700 font-semibold ">
                                {(() => {
                                    const rating = user?.feedback?.rating;
                                    if (!rating) return "N/A";
                                    
                                    const scores = [
                                        Number(rating.technicalSkills),
                                        Number(rating.communication),
                                        Number(rating.problemSolving),
                                        Number(rating.experience)
                                    ].filter(n => !isNaN(n));
                                    
                                    if (scores.length === 0) return "N/A";
                                    
                                    const average = scores.reduce((a, b) => a + b, 0) / scores.length;
                                    return `${average.toFixed(1)}/10`;
                                })()}
                            </h2>
                            <CandidateFeedbackDialog candidateInformation={candidateInformation} />

                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default CandidatesList