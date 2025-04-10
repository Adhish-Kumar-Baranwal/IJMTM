import React from 'react'
import Dashboard from './Dashboard/Dashboard'
import SideBar from './SideBar/SideBar'

const AdminDashboard = () => {
  return (
    <div className='bg-stone-100'>
        <main className='grid gap-4 p-4 grid-cols-[250px_1fr]'>
            <SideBar />
            <Dashboard />
        </main>
    </div>
  )
}

export default AdminDashboard