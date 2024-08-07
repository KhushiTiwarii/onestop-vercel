import React, { useState, useContext } from 'react';
import { LayoutDashboard, Briefcase as BriefcaseIcon, Menu as MenuIcon, X as CloseIcon, LogOut as LogOutIcon, FileText as DocumentIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const routes = [
  { label: "DASHBOARD", icon: LayoutDashboard, path: "/", color: "text-white-500" },
  { label: "Add Job", icon: BriefcaseIcon, path: "/add-job", color: "text-blue-200" },
  { label: "Applications", icon: DocumentIcon, path: "/applications", color: "text-blue-200" }
];

const SidebarRec = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.success("Logged out");
    navigate('/login');
  };

  return (
    <div className={`flex flex-col h-full bg-purple-950 ${isExpanded ? 'w-64' : 'w-20'} transition-width duration-300`}>
      <div className="flex items-center justify-between px-3 py-3">
        {isExpanded && <span className="text-white text-xl">Logo</span>}
        <button onClick={toggleSidebar} className="text-white">
          {isExpanded ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      <div className="px-3 py-9 flex-1 space-y-4">
        {routes.map((route) => (
          <Link to={route.path} key={route.path} className="block">
            <div
              className={`flex items-center p-4 rounded-md bg-white text-white backdrop-blur-md bg-opacity-20 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl ${!isExpanded ? 'justify-center' : 'space-x-3'}`}
            >
              <route.icon className={`${route.color}`} size={isExpanded ? 36 : 24} />
              {isExpanded && <span className="text-white">{route.label}</span>}
            </div>
          </Link>
        ))}
      </div>
      <div className="px-3 py-3 mt-auto">
      <button
      onClick={handleLogout}
      className="flex items-center p-4 rounded-md border-2 border-purple-600 bg-white hover:bg-purple-600 transition-colors duration-300 text-purple-600 hover:text-white w-full shadow-md hover:shadow-lg font-semibold"
      >
      <LogOutIcon size={isExpanded ? 36 : 24} className={`${isExpanded ? 'mr-3' : ''}`} />
      {isExpanded && <span className="text-lg">Logout</span>}
      </button>
      </div>
    </div>
  );
};

export default SidebarRec;
