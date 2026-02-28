import { Layout, Calendar, List, WalletCards } from "lucide-react";

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
        icon: "Settings",
        path: "/settings",
    },
]