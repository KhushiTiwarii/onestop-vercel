import React from 'react'
import Sidebar from './SideBar'

const Landing = () => {
  return (
    // <div>
    //   <Sidebar/>
    // </div>
    <div className="h-full relative">
     <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-10 bg-gray-600">
     <Sidebar />
  </div>
    
   </div>
  )
}

export default Landing
