"use client"

import { useAuth } from "@/app/provider"
import Image from "next/image"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Welcome = () => {
    const { user, logout } = useAuth()

    if (!user) return <p>Loading...</p>

    return (
        <div className="bg-slate-300 rounded-xl py-4 px-6 flex justify-between items-center">
            <div>
                <h2 className="text-xl font-bold">
                    Welcome Back, {user?.name}
                </h2>
                <p>AI Driven interviews, Hassle-Free Hiring</p>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Image
                        src={user?.picture}
                        alt={user?.name}
                        width={40}
                        height={40}
                        className="rounded-full cursor-pointer"
                    />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem
                        onClick={logout}
                        className="cursor-pointer"
                    >
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default Welcome