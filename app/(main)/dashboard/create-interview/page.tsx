"use client"
import { useRouter } from 'next/navigation'
import { ArrowLeft } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useState } from 'react'
import FormContainer from './_components/FormContainer'
import QuestionsList from './_components/QuestionsList'
import { toast } from 'sonner'
import InterviewLink from './_components/InterviewLink'
const CreateInterview = () => {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<any>({})
    const [interviewId, setInterviewId] = useState<string>("")
    const router = useRouter()

    const onHandleChangeInput = (fields: any, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [fields]: value,
        }))
    }

    const GoToNextStep = () => {
        if (!formData.jobPosition || !formData.jobDescription || !formData.interviewDuration || !formData.interviewType) {
            toast("Please fill all the fields")
            return
        }
        setStep(step + 1)
    }
    const onCreateInterview = (interview_id: string) => {
        setInterviewId(interview_id);
        setStep(step + 1);
    }
    return (
        <div className='mt-5'>
            <div className='flex items-center gap-2 py-5'>
                <ArrowLeft onClick={() => router.back()} className='cursor-pointer hover:text-blue-600 transition-colors' />
                <h2 className='text-xl font-bold'>Create Interview</h2>
            </div>
            <Progress value={step * 33} className="mb-6" />
            {step == 1 ? <FormContainer onHandleChangeInput={onHandleChangeInput}

                GoToNextStep={GoToNextStep}
            /> :
                step == 2 ? <QuestionsList formData={formData} onCreateInterview={(interviewId: string) => onCreateInterview(interviewId)} /> :
                    step == 3 ? <InterviewLink interviewId={interviewId} formData={formData} /> : null

            }

        </div>
    )
}

export default CreateInterview