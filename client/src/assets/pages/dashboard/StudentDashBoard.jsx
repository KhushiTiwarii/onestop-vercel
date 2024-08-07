// src/components/UserApplications.js

import React, { useEffect, useState, useContext } from 'react';
import Sidebar from '../../../components/SideBar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Building, MapPin, Calendar, DollarSign, Badge, CheckCircle, Trash } from 'lucide-react';
import { authContext } from '../../../context/AuthContext'; // Adjust the path as needed

const UserApplications = () => {
  const { user } = useContext(authContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = 'http://localhost:8000/api/v1'; // Update this to your actual base URL

  useEffect(() => {
    if (!user) {
      setError('No user found.');
      setLoading(false);
      return;
    }

    const fetchApplications = async () => {
      try {
        const response = await fetch(`${BASE_URL}/apply/user/${user._id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch job applications.');
        }

        const data = await response.json();
        setApplications(data);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching job applications.');
        toast.error(error.message || 'An error occurred while fetching job applications.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]); // Depend on user

  const deleteApplication = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/apply/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete application.');
      }

      // Update local state
      setApplications((prevApplications) =>
        prevApplications.filter((application) => application._id !== id)
      );
      toast.success('Application deleted successfully.');
    } catch (error) {
      toast.error(error.message || 'An error occurred while deleting the application.');
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (error) return <div className="flex h-screen items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Job Applications</h1>
        {applications.length === 0 ? (
          <p className="text-center">You have not submitted any applications yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {applications.map((application) => (
              <div key={application._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out relative">
                <h2 className="text-xl font-bold mb-2">{application.jobTitle || 'No Title'}</h2>
                <p className="text-gray-700 mb-1">
                  <Calendar className="inline mr-2 text-teal-500" /> Applied on: {new Date(application.appliedAt).toLocaleDateString() || 'N/A'}
                </p>
                <p className="text-gray-700 mb-1">
                  <Badge className="inline mr-2 text-green-500" /> Status: {application.status || 'N/A'}
                </p>
                <button
                  onClick={() => deleteApplication(application._id)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserApplications;
