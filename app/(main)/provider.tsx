"use client"
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React, { useState } from 'react'
import Appsidebar from './dashboard/_components/Appsidebar'

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {

    return (
        <SidebarProvider >
            <Appsidebar />
            <div>
                <SidebarTrigger />
                {children}
            </ div>
        </SidebarProvider>
    )
}

export default DashboardProvider