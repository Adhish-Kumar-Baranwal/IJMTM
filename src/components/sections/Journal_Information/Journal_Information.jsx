import React from 'react'
import "./Journal_Information.css"
import NavBar from '../../NavBar/NavBar'

const Journal_Information = () => {
  return (
    <>
        <NavBar />

          <div  className='info-container'>
            <h2 className='info-header'>Journal Information</h2>

              <div className='info-sub-container'>

                <h3 className='info-header-2'>Aim & Scope</h3>
                <p className='info-para'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab quae at alias nemo asperiores quis recusandae distinctio deleniti corporis dignissimos ipsum, eligendi dolor, rem excepturi itaque aliquid inventore maxime tempora dolorum totam. Provident vero magnam culpa sed voluptates amet officia praesentium iure, illo neque! Doloremque aspernatur ut dignissimos libero facilis.</p>

              </div>

              <div className='info-sub-container' >

                <h3 className='info-header-2'><em>IJMTM</em>'s Mission</h3>
                <p className='info-para'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab quae at alias nemo asperiores quis recusandae distinctio deleniti corporis dignissimos ipsum, eligendi dolor, rem excepturi itaque aliquid inventore maxime tempora dolorum totam. Provident vero magnam culpa sed voluptates amet officia praesentium iure, illo neque! Doloremque aspernatur ut dignissimos libero facilis.</p>

              </div>

              <div className='info-sub-container' >

                <h3 className='info-header-2'>About the Reviewers</h3>
                <p className='info-para'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab quae at alias nemo asperiores quis recusandae distinctio deleniti corporis dignissimos ipsum, eligendi dolor, rem excepturi itaque aliquid inventore maxime tempora dolorum totam. Provident vero magnam culpa sed voluptates amet officia praesentium iure, illo neque! Doloremque aspernatur ut dignissimos libero facilis.</p>

              </div>

          </div>

    </>
  )
}

export default Journal_Information