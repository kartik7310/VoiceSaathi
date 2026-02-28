import React from 'react'
import DashboardProvider from './provider'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <DashboardProvider>
            <div>{children}</div>
        </DashboardProvider>
    )
}

export default layout