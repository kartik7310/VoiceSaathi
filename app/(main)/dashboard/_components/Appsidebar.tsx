"use client"

import Link from "next/link"
import { Mic, Plus, Video } from "lucide-react"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import { sidebarMenu } from "@/services/constants"

type MenuItem = {
    title: string
    path: string
    icon: React.ElementType
}

const AppSidebar = () => {
    const pathname = usePathname()

    return (
        <Sidebar className="border-r border-gray-100 bg-white/50 backdrop-blur-xl">
            <SidebarHeader className="p-6 space-y-6">
                <div className="flex items-center gap-3 px-2">
                    <div className="h-10 w-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                        <Mic className="text-white h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
                        VoiceSaathi
                    </h2>
                </div>

                <Link href="/dashboard/create-interview" className="block">
                    <Button className="w-full h-12 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-100 font-bold transition-all hover:scale-[1.02] active:scale-[0.98]">
                        <Plus size={18} strokeWidth={3} />
                        New Interview
                    </Button>
                </Link>
            </SidebarHeader>

            <SidebarContent className="px-4">
                <SidebarGroup>
                    <SidebarMenu className="space-y-1.5">
                        {(sidebarMenu as MenuItem[]).map((item, index) => {
                            const Icon = item.icon
                            const isActive = pathname === item.path

                            return (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive}
                                        className={`
                                            h-11 rounded-xl transition-all duration-200 px-4
                                            ${isActive
                                                ? "bg-blue-50 text-blue-600 shadow-sm"
                                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                            }
                                        `}
                                    >
                                        <Link
                                            href={item.path}
                                            className="flex items-center gap-3 w-full"
                                        >
                                            <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-blue-600" : "text-gray-400"} />
                                            <span className="font-semibold text-sm">
                                                {item.title}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-6 border-t border-gray-50">
                <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Platform</p>
                    <p className="text-xs font-semibold text-gray-500">© 2024 AIcruiter v2.0</p>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar