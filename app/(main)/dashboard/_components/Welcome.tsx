"use client"
import { useAuth } from "@/app/provider"
import Image from "next/image"

const Welcome = () => {
    const { user } = useAuth()
    console.log("user", user);


    if (!user) return <p>Loading...</p>

    return (
        <div className="bg-slate-300 rounded-xl py-4 px-6 flex justify-between items-center">
            <div>
                <h2 className="text-xl font-bold">
                    Welcome Back ,{user?.name}
                </h2>
                <p>Ai Driven interviews,Hassel-Free Hiring</p>
            </div>
            <div>
                <Image src={user?.picture} alt={user?.name} width={40} height={40} className="rounded-full" />
            </div>
        </div>
    )
}

export default Welcome