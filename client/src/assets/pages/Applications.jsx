import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../config.js';
import SidebarRec from '../../components/SideBarRec';
import { FaCheck, FaTimes } from 'react-icons/fa';

const Applications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch(`${BASE_URL}/apply`);
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      const response = await fetch(`${BASE_URL}/apply/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast.success(`Application ${status} successfully!`);
        fetchApplications();
      } else {
        const result = await response.json();
        toast.error(result.message || `Failed to ${status} application.`);
      }
    } catch (error) {
      console.error(`Error updating application status:`, error);
      toast.error(`An error occurred while updating the application status.`);
    }
  };

  return (
    <div className="flex h-screen">
      <SidebarRec />
      <div className="flex-1 p-8 bg-gray-50 overflow-auto">
        <div className="max-w-4xl mx-auto mt-8">
          <ToastContainer />
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Job Applications</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Job Title</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Phone</th>
                    <th className="py-2 px-4 border-b">Resume</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.filter(app => app.status === 'pending').map((app) => (
                    <tr key={app._id}>
                      <td className="py-2 px-4 border-b">{app.jobTitle}</td>
                      <td className="py-2 px-4 border-b">{app.name}</td>
                      <td className="py-2 px-4 border-b">{app.phone}</td>
                      <td className="py-2 px-4 border-b">
                        <a href={app.resume} target="_blank" rel="noopener noreferrer">
                          View Resume
                        </a>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => updateApplicationStatus(app._id, 'accepted')}
                          className="text-green-500 hover:text-green-700 mx-2"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => updateApplicationStatus(app._id, 'rejected')}
                          className="text-red-500 hover:text-red-700 mx-2"
                        >
                          <FaTimes />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
