"use client"
import { useRouter } from 'next/navigation'
import { ArrowLeft } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useState } from 'react'
import FormContainer from './_components/FormContainer'
import QuestionsList from './_components/QuestionsList'
import { toast } from 'sonner'
const CreateInterview = () => {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<any>({})
    const router = useRouter()

    const onHandleChangeInput = (fields: any, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [fields]: value,
        }))
    }
    console.log("formData", formData);

    const GoToNextStep = () => {
        if (!formData.jobPosition || !formData.jobDescription || !formData.interviewDuration || !formData.interviewType) {
            toast("Please fill all the fields")
            return
        }
        setStep(step + 1)
    }
    return (
        <div className='mt-5 px-8 md:px-20 lg:px-30 xl:px-40'>
            <div className='flex items-center gap-2 p-5'>
                <ArrowLeft onClick={() => router.back()} className='cursor-pointer' />
                <h2 className='text-xl'>Create Interview</h2>
            </div>
            <Progress value={step * 33} />
            {step == 1 ? <FormContainer onHandleChangeInput={onHandleChangeInput}

                GoToNextStep={GoToNextStep}
            /> :
                step == 2 ? <QuestionsList formData={formData} /> : null

            }

        </div>
    )
}

export default CreateInterview