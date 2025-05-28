import React from 'react'
import SideBar from './SideBar/SideBar'
import { Outlet } from "react-router-dom";
import NavBar from '../components/sections/NavBar/NavBar';
const AdminDashboard = () => {
  return (
    <>
    <NavBar />
    <div className='bg-stone-100'>
        <main className='grid gap-4 p-4 grid-cols-[220px_1fr]'>
            <SideBar />
            <Outlet />
        </main>
    </div>
    </>
  )
};

export default AdminDashboard;