import React from 'react'
import DashboardProvider from './provider'


const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <DashboardProvider>
            <div className='p-10'>
                <div>{children}</div>
            </div>
        </DashboardProvider>
    )

}

export default Dashboardlayout