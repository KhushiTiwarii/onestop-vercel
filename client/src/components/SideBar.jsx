import React, { useState, useContext } from 'react';
import {
  LayoutDashboard,
  File as FileIcon,
  Book as BookIcon,
  Search as SearchIcon,
  Briefcase as BriefcaseIcon,
  Menu as MenuIcon,
  X as CloseIcon,
  LogOut as LogOutIcon
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const routes = [
  { label: "DASHBOARD", icon: LayoutDashboard, path: "/dashboard", color: "text-white-500" },
  { label: "AI Resume Scanner", icon: FileIcon, path: "/ats", color: "text-green-600" },
  { label: "Placement Resources", icon: BookIcon, path: "/playlist", color: "text-red-500" },
  { label: "Interview Preparation", icon: SearchIcon, path: "/interview-prep", color: "text-yellow-300" },
  { label: "Job Search", icon: BriefcaseIcon, path: "/jobs", color: "text-blue-200" }
];

const Sidebar = () => {
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
    <div className={`flex flex-col h-full bg-purple-950 ${isExpanded ? 'w-72' : 'w-20'} transition-width duration-300`}>
      <div className="flex items-center justify-between px-3 py-3">
        {isExpanded && <span className="text-white text-xl"></span>}
        <button onClick={toggleSidebar} className="text-white">
          {isExpanded ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      <div className="flex justify-center items-center p-0">
        <img 
          src="/logo-1.png"
          alt="Logo" 
          className={`${isExpanded ? 'w-32' : 'w-12'} transition-all duration-300 object-contain`}
        />
      </div>
      <div className="px-4 py- flex-1 space-y-4">
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
      <div className="px-16 flex items-center py-4">
        <button
          onClick={handleLogout}
          className={`flex items-center px-4 pt-3 pb-3 mb-8 rounded-md bg-white text-white backdrop-blur-md bg-opacity-20 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl ${!isExpanded ? 'justify-center' : 'space-x-3'}`}
        >
          <LogOutIcon className="text-red-500" size={isExpanded ? 36 : 24} />
          {isExpanded && <span className="text-white">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
