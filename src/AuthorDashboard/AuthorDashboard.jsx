import React from 'react';
import { Outlet } from "react-router-dom"; 
import AuthorSidebar from './AuthorDashboardSection/AuthorSidebar/AuthorSidebar';
import NavBar from '../components/NavBar/NavBar';

const AuthorDashboard = () => {
  return (
    <>
      <NavBar />
      <div className='bg-stone-100'>
        <main className='grid gap-4 p-4 grid-cols-[220px_1fr]'>
          <AuthorSidebar />
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AuthorDashboard;
