import React from 'react'
import './VolumesCreate.css'
import TopBar from '../../Dashboard/TopBar/TopBar'
import VolumesCreateForm from './VolumesCreateForm/VolumesCreateForm'

const VolumesCreate = () => {
  return (
    <div className='volumes-create-container shadow'>
        <TopBar />
        <div className="px-5">
            <VolumesCreateForm />
        </div>
    </div>
  )
}

export default VolumesCreate