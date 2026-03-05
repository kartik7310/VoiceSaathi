"use client"
import { Button } from '@/components/ui/button'
import { ArrowRight, Copy, Send, Video } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import moment from 'moment'
import Link from 'next/link'

const InterviewCard = ({ interview, index, viewDetails = false }: { interview: any, index: any, viewDetails?: boolean }) => {
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
                    {moment(new Date(interview.created_at)).format('YYYY-MM-DD')}
                </p>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {interview.jobPosition}

            </h3>


            <div className='flex justify-between'>
                <p className="text-gray-500 text-sm ">
                    {interview.interviewDuration}
                </p>
                <span className='text-green font-semibold text-green-500'>{interview?.Feedback?.length} Candidates</span>
            </div>

            {!viewDetails ? <div className="flex gap-3 mt-5">

                <button onClick={copyToClipboard} className="flex items-center cursor-pointer gap-2 border border-gray-300 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">
                    <Copy size={16} />
                    Copy Link
                </button>

                <button onClick={sendInterviewLink} className="flex items-center cursor-pointer gap-2 bg-blue-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-blue-700">
                    <Send size={16} />
                    Send
                </button>

            </div> : <div>
                <Link href={`/schedule-interview/${interview.interview_id}/details`}>
                    <Button className='w-full mt-2 cursor-pointer' variant={"outline"}>View Details<ArrowRight /></Button>
                </Link>
            </div>}

        </div>
    )
}

export default InterviewCard