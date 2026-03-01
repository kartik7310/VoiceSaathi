"use client"
import { useRouter } from 'next/navigation'
import { ArrowLeft } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useState } from 'react'
import FormContainer from './_components/FormContainer'
const CreateInterview = () => {
    const [step, setStep] = useState(1)
    const router = useRouter()
    return (
        <div className='mt-5 px-8 md:px-20 lg:px-30 xl:px-40'>
            <div className='flex items-center gap-2 p-5'>
                <ArrowLeft onClick={() => router.back()} className='cursor-pointer' />
                <h2 className='text-xl'>Create Interview</h2>
            </div>
            <Progress value={step * 33} />
            <FormContainer />

        </div>
    )
}

export default CreateInterview