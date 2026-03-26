import React from 'react'
import DashboardProvider from './provider'


const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <DashboardProvider>
            {children}
        </DashboardProvider>
    )
}

export default Dashboardlayout