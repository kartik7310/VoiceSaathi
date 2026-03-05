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
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl py-6 px-6 md:py-8 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4 text-white shadow-lg overflow-hidden relative">
            <div className="z-10 text-center md:text-left">
                <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                    Welcome Back, {user?.name} 👋
                </h2>
                <p className="mt-1 text-blue-50 text-sm md:text-base opacity-90">
                    AI Driven interviews, Hassle-Free Hiring
                </p>
            </div>

            <div className="flex items-center gap-4 z-10">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="relative group cursor-pointer">
                            <Image
                                src={user?.picture}
                                alt={user?.name}
                                width={48}
                                height={48}
                                className="rounded-full border-2 border-white/50 transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 rounded-full bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-48 p-1">
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            My Account
                        </div>
                        <DropdownMenuItem
                            onClick={logout}
                            className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                        >
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Decorative circles */}
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl" />
        </div>
    )
}

export default Welcome