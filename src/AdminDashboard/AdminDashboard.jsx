import React from 'react'
import Dashboard from './Dashboard/Dashboard'
import SideBar from './SideBar/SideBar'
import { Routes, Route, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className='bg-stone-100'>
        <main className='grid gap-4 p-4 grid-cols-[220px_1fr]'>
            <SideBar />
            <Outlet />
        </main>
    </div>
  )
}

export default AdminDashboard