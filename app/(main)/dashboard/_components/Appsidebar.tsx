"use client"

import Link from "next/link"
import { Plus } from "lucide-react"
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

function AppSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar className="border-r">
            <SidebarHeader className="space-y-4">
                <h2 className="text-xl font-semibold tracking-tight px-2">
                    VoiceSaathi
                </h2>

                <Button className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                    <Plus size={18} />
                    Create New Interview
                </Button>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {(sidebarMenu as MenuItem[]).map((item, index) => {
                            const Icon = item.icon
                            const isActive = pathname === item.path

                            return (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive}
                                    >
                                        <Link
                                            href={item.path}
                                            className="flex items-center gap-3"
                                        >
                                            <Icon size={18} />
                                            <span className={`text-[16px] ${pathname === item.path ? "text-blue-600" : "text-gray-600"}`}>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            {/* ---------- FOOTER ---------- */}
            <SidebarFooter className="p-2 text-xs text-muted-foreground">
                © {new Date().getFullYear()} VoiceSaathi
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar