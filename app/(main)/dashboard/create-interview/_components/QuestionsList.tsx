import axios from 'axios'
import React, { useEffect } from 'react'

const QuestionsList = ({ formData }: any) => {
    useEffect(() => {
        if (formData) {
            GenerateQuesions()
        }
    }, [formData])
    const GenerateQuesions = async () => {
        const res = await axios.post("/api/ai-model", ...formData);
        console.log(res.data.data);
    }
    return (
        <div>
            QuestionList
        </div>
    )
}

export default QuestionsList