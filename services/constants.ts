import { Layout, Calendar, List, WalletCards, Settings, User, Code, BaggageClaim, LucideLoader } from "lucide-react";

export const sidebarMenu = [
    {
        title: "Dashboard",
        icon: Layout,
        path: "/dashboard",
    },
    {
        title: "Shedule Interview",
        icon: Calendar,
        path: "/interview",
    },
    {
        title: "All Interview",
        icon: List,
        path: "/interview",
    },
    {
        title: "Billing",
        icon: WalletCards,
        path: "/interview",
    },
    {
        title: "Settings",
        icon: Settings,
        path: "/settings",
    },
]

export const interviewType = [
    {
        title: "Technical",
        icon: Code,
    },
    {
        title: "Behavioral",
        icon: User,
    },
    {
        title: "HR",
        icon: User,
    },
    {
        title: "Experience",
        icon: BaggageClaim,
    },
    {
        title: "Problem Solving",
        icon: LucideLoader,
    },
]