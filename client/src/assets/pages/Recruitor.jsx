import React from 'react'
import SidebarRec from '../../components/SideBarRec'


const Recruitor = () => {
  return (
    <div className="flex h-screen">
      <SidebarRec />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-semibold mb-6 text-purple-800">Recruitor Page</h1>
      </div>
    </div>
  );
};

export default Recruitor
