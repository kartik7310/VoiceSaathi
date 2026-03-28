"use client"
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Appsidebar from './dashboard/_components/Appsidebar'
import Welcome from './dashboard/_components/Welcome'

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

    return (
        <SidebarProvider >
            <Appsidebar />
            <div className='w-full'>
                <div className='p-4 md:p-8'>
                    <SidebarTrigger className='mb-4 md:hidden' />
                    {pathname !== '/profile' && <Welcome />}
                    {children}
                </div>
            </ div>
        </SidebarProvider>
    )
}

export default DashboardProvider