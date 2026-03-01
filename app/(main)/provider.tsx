"use client"
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React, { useState } from 'react'
import Appsidebar from './dashboard/_components/Appsidebar'
import Welcome from './dashboard/_components/Welcome'

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {

    return (
        <SidebarProvider >
            <Appsidebar />
            <div className=' w-full p-8'>
                {/* <SidebarTrigger /> */}
                <Welcome />
                {children}
            </ div>
        </SidebarProvider>
    )
}

export default DashboardProvider