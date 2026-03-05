"use client"
import React from "react"
import { CreditCard } from "lucide-react"

const Billing = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">

            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                <CreditCard className="text-blue-600" size={28} />
            </div>

            <h2 className="text-2xl font-semibold text-gray-800">
                Billing Coming Soon
            </h2>

            <p className="text-gray-500 mt-2 max-w-md">
                We're currently working on the billing and subscription system.
                This feature will be available soon.
            </p>

        </div>
    )
}

export default Billing