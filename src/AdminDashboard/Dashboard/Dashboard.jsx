import React from 'react'
import "./Dashboard.css";
import TopBar from './TopBar/TopBar';
import Grid from './Grid/Grid';

const Dashboard = () => {
  return (
    <div className='main-dashboard shadow'>
      <TopBar />
      <Grid />
    </div>
  )
}

export default Dashboard