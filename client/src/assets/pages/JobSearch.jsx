import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/SideBar';
import { toast } from 'react-toastify';

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const BASE_URL = 'http://localhost:8000/api/v1'; // Update this to your actual base URL

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/jobs`);
        const result = await response.json();
        if (response.ok) {
          setJobs(result);
        } else {
          toast.error(result.message || 'Failed to fetch jobs.');
        }
      } catch (error) {
        toast.error('An error occurred while fetching jobs.');
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Job Search</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">{job.position}</h2>
              <p className="text-gray-700 mb-1">Company: {job.company}</p>
              <p className="text-gray-700 mb-1">Location: {job.location}</p>
              <p className="text-gray-700 mb-1">Type: {job.type}</p>
              <p className="text-gray-700 mb-1">Experience: {job.experience}</p>
              <p className="text-gray-700 mb-2">Salary: {job.salary}</p>
              <div className="mb-4">
                <h3 className="font-semibold">Skills:</h3>
                <ul className="list-disc list-inside">
                  {job.skills.map((skill, index) => (
                    <li key={index} className="text-gray-700">{skill}</li>
                  ))}
                </ul>
              </div>
              <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                Apply
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobSearch;

