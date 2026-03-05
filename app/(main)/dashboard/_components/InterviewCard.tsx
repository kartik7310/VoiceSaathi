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
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 md:p-5 flex flex-col gap-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gray-50 rounded-md border border-gray-100">
                        <img
                            src="/google-icon.png"
                            alt="logo"
                            className="w-5 h-5 md:w-6 md:h-6"
                        />
                    </div>
                    <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                        Google
                    </span>
                </div>

                <p className="text-xs md:text-sm text-gray-400 font-medium">
                    {moment(new Date(interview.created_at)).format('MMM DD, YYYY')}
                </p>
            </div>

            <div className="space-y-1">
                <h3 className="text-base md:text-lg font-bold text-gray-900 line-clamp-1">
                    {interview.jobPosition}
                </h3>
                <div className='flex items-center gap-2'>
                    <span className="text-xs text-gray-500 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                        {interview.interviewDuration} min
                    </span>
                    <span className='text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full'>
                        {interview?.Feedback?.length || 0} Candidates
                    </span>
                </div>
            </div>


            {!viewDetails ? (
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                    <button
                        onClick={copyToClipboard}
                        className="flex-1 flex items-center justify-center cursor-pointer gap-2 border border-gray-200 rounded-lg py-2.5 text-xs md:text-sm font-medium text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    >
                        <Copy size={16} />
                        Copy Link
                    </button>

                    <button
                        onClick={sendInterviewLink}
                        className="flex-1 flex items-center justify-center cursor-pointer gap-2 bg-blue-600 text-white rounded-lg py-2.5 text-xs md:text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm shadow-blue-100"
                    >
                        <Send size={16} />
                        Send Link
                    </button>
                </div>
            ) : (
                <div className="mt-2">
                    <Link href={`/schedule-interview/${interview.interview_id}/details`} className="w-full">
                        <Button className='w-full cursor-pointer h-10 md:h-11 font-semibold group' variant={"outline"}>
                            View Details
                            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            )}

        </div>
    )
}

export default InterviewCard