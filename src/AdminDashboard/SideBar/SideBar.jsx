import React from 'react'
import AccountToggle from './AccountToggle/AccountToggle'
import RouteSelect from './RouteSelect/RouteSelect'

const SideBar = () => {
  return (
    <div className='bg-stone-100'>
        <div className='sticky top-4 h-[94vh]'>
            <AccountToggle />
            <RouteSelect />
        </div>
    </div>
  )
}

export default SideBar