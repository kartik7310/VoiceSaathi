import React from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import moment from "moment"

const CandidateFeedbackDialog = ({ candidateInformation }: { candidateInformation: any }) => {
    console.log("candidateInformation", candidateInformation)
    const candidate = candidateInformation?.[0]
    const feedback = candidate?.feedback
    const rating = feedback?.rating

    if (!candidate) return null

    return (
        <Dialog>

            <DialogTrigger asChild>
                <Button variant="outline" className="bg-blue-500 cursor-pointer text-white hover:bg-blue-600">
                    View Report
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-xl">

                <DialogHeader>
                    <DialogTitle>Candidate Feedback</DialogTitle>
                </DialogHeader>

                {/* Candidate Info */}
                <div className="flex items-center gap-3 border-b pb-4">

                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 text-white font-semibold">
                        {candidate?.userName?.[0]?.toUpperCase()}
                    </div>

                    <div>
                        <p className="font-medium">{candidate.userName}</p>
                        <p className="text-sm text-gray-500">
                            Joined {moment(candidate.created_at).format("MMM DD, YYYY")}
                        </p>
                    </div>

                </div>

                {/* Skills Assessment */}
                <div className="mt-5">
                    <h3 className="font-semibold mb-3">Skills Assessment</h3>

                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <p className="flex justify-between text-sm">
                                Technical Skills
                                <span className="text-blue-700 font-semibold">
                                    {rating?.technicalSkills}/10
                                </span>
                            </p>
                            <Progress value={(Number(rating?.technicalSkills) || 0) * 10} />
                        </div>

                        <div>
                            <p className="flex justify-between text-sm">
                                Communication
                                <span className="text-blue-700 font-semibold">
                                    {rating?.communication}/10
                                </span>
                            </p>
                            <Progress value={(Number(rating?.communication) || 0) * 10} />
                        </div>

                        <div>
                            <p className="flex justify-between text-sm">
                                Problem Solving
                                <span className="text-blue-700 font-semibold">
                                    {rating?.problemSolving}/10
                                </span>
                            </p>
                            <Progress value={(Number(rating?.problemSolving) || 0) * 10} />
                        </div>

                        <div>
                            <p className="flex justify-between text-sm">
                                Experience
                                <span className="text-blue-700 font-semibold">
                                    {rating?.experience}/10
                                </span>
                            </p>
                            <Progress value={(Number(rating?.experience) || 0) * 10} />
                        </div>

                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="font-semibold mb-2">Performance Summary</h3>

                    <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-7 rounded-md">
                        {feedback?.summary}
                    </p>
                </div>
                <div
                    className={`p-4 rounded-md flex justify-between items-center ${feedback?.Recommendation === "Recommended"
                        ? "bg-green-100"
                        : "bg-red-100"
                        }`}
                >
                    <div>
                        <h2 className="font-semibold">{feedback?.Recommendation} For Hire</h2>
                        <p>{feedback?.RecommendationMsg}</p>
                    </div>

                </div>

            </DialogContent>

        </Dialog>
    )
}

export default CandidateFeedbackDialog