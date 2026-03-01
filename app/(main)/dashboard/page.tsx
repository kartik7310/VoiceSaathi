import React from 'react'
import Welcome from './_components/Welcome'
import CreateOptions from './_components/CreateOptions'
import PreviouslyCreatedInterview from './_components/PreviouslyCreatedInterview'

const DashboardPage = () => {
    return (
        <div>
            {/* <Welcome /> */}
            <h2 className='text-2xl font-bold mt-6'>Dashboard</h2>
            <CreateOptions />
            <PreviouslyCreatedInterview />
        </div>
    )
}

export default DashboardPage