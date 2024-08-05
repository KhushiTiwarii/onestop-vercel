
import React from 'react';
import {
  LayoutDashboard,
  File as FileIcon,
  Book as BookIcon,
  Search as SearchIcon,
  Briefcase as BriefcaseIcon,
  Youtube as YoutubeIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

const routes = [
  {
    label: "DASHBOARD",
    icon: LayoutDashboard,
    path: "/",
    color: "text-white-500",
  },
  {
    label: "AI Resume Scanner",
    icon: FileIcon,
    path: "/ats",
    color: "text-green-600",
  },
  {
    label: "Placement Resources",
    icon: BookIcon,
    path: "/resources",
    color: "text-red-500",
  },
  {
    label: "Interview Preparation",
    icon: SearchIcon,
    path: "/interview-prep",
    color: "text-yellow-300",
  },
  {
    label: "Job Search",
    icon: BriefcaseIcon,
    path: "/jobs",
    color: "text-blue-200",
  },
  {
    label: "Popular PlayLists",
    icon: YoutubeIcon,
    path: "/playlist",
    color: "text-red-200",
  },
];

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full bg-purple-950">
      <div className="px-3 py-9 flex-1 space-y-4">
        {routes.map((route) => (
          <Link to={route.path} key={route.path} className="block">
            <div
              className="flex items-center p-4 rounded-md bg-white text-white backdrop-blur-md bg-opacity-20 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl space-x-3"
            >
              <route.icon className={`w-9 h-9 ${route.color}`} />
              <span className="text-white">{route.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
