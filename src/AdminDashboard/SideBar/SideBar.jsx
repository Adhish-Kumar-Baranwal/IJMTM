import React from 'react'
import AccountToggle from './AccountToggle/AccountToggle'

const SideBar = () => {
  return (
    <div className='bg-stone-100'>
        <div className='sticky top-4 h-[96vh]'>
            <AccountToggle />
        </div>
    </div>
  )
}

export default SideBar