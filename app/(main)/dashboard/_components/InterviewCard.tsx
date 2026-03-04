import { Button } from '@/components/ui/button'
import { Copy, Send, Video } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'


const InterviewCard = ({ interview, index }: { interview: any, index: any }) => {
    const router = useRouter()
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/${interview.interview_id}`
    const copyToClipboard = () => {
        navigator.clipboard.writeText(url)
        toast("Link copied to clipboard")
    }

    const sendInterviewLink = () => {
        window.location.href =
            `mailto:?subject=Interview Invitation&body=Please attend the interview using this link: ${url}`
    }
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 w-80">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <img
                        src="/google-icon.png"
                        alt="logo"
                        className="w-6 h-6"
                    />
                </div>

                <p className="text-sm text-gray-500">
                    {new Date(interview.created_at).toLocaleDateString()}
                </p>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {interview.jobPosition}
            </h3>
            <p className="text-gray-500 text-sm mt-1">
                {interview.interviewDuration}
            </p>
            <div className="flex gap-3 mt-5">

                <button onClick={copyToClipboard} className="flex items-center cursor-pointer gap-2 border border-gray-300 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">
                    <Copy size={16} />
                    Copy Link
                </button>

                <button onClick={sendInterviewLink} className="flex items-center cursor-pointer gap-2 bg-blue-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-blue-700">
                    <Send size={16} />
                    Send
                </button>

            </div>
        </div>
    )
}

export default InterviewCard