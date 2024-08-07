import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/SideBar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Building, MapPin, Calendar, DollarSign, Badge, CheckCircle } from 'lucide-react';
import uploadFileToCloudinary from '../../utils/uploadCloudinary';

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    resume: null,
    jobId: '',
    jobTitle: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resumeURL, setResumeURL] = useState('');
  const BASE_URL = 'http://localhost:8000/api/v1'; // Update this to your actual base URL

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/jobs`);
        if (!response.ok) {
          throw new Error('Failed to fetch jobs.');
        }
        const result = await response.json();
        setJobs(result);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching jobs.');
        toast.error(error.message || 'An error occurred while fetching jobs.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setFormData(prevState => ({
      ...prevState,
      jobId: job._id,
      jobTitle: job.position
    }));
  };

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
        const file = files[0];
        const data = await uploadFileToCloudinary(file); // Updated function
        setResumeURL(data.url);
        console.log("Resume URL:", data.url); // Print the URL to the console
        setFormData(prevState => ({
            ...prevState,
            [name]: data.url
        }));
    } else {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = {
      name: formData.name,
      phone: formData.phone,
      resume: resumeURL, // Use resumeURL directly
      jobId: formData.jobId,
      jobTitle: formData.jobTitle
    };
  
    console.log('Form data to send:', formDataToSend);
  
    try {
      const response = await fetch(`${BASE_URL}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
        },
        body: JSON.stringify(formDataToSend), // Send JSON string
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit application.');
      }
  
      toast.success('Application submitted successfully!');
      setFormData({ name: '', phone: '', resume: null, jobId: '', jobTitle: '' });
      setSelectedJob(null);
    } catch (error) {
      toast.error(error.message || 'An error occurred while submitting the application.');
    }
  };
  

  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (error) return <div className="flex h-screen items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Job Search</h1>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by job title, company, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none hover:border-purple-600 focus:border-purple-600 transition-colors duration-300"
          />
          <span className="absolute top-1/2 right-10 transform -translate-y-1/2 text-gray-500">
            <i className="fas fa-search"></i> {/* Add FontAwesome or similar icon here */}
          </span>
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500">
              <i className="fas fa-times"></i> {/* Add FontAwesome or similar icon here */}
            </button>
          )}
        </div>
        {jobs.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="border-t-4 border-purple-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredJobs.slice(0, 12).map((job) => (
              <div key={job._id} className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => handleApplyClick(job)}
                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors duration-300 ease-in-out"
                  >
                    Apply
                  </button>
                </div>
                <div className="flex flex-col flex-grow">
                  <h2 className="text-xl font-bold mb-2 flex items-center">
                    <Badge className="mr-2 text-purple-500" /> {job.position}
                  </h2>
                  <p className="text-gray-500 mb-1 flex items-center">
                    <Building className="mr-2 text-blue-500" /> <span className="font-semibold">{job.company}</span>
                  </p>
                  <p className="text-gray-700 mb-1 flex items-center">
                    <MapPin className="mr-2 text-red-500" /> <span className="font-semibold">Location:</span> {job.location}
                  </p>
                  <p className="text-gray-700 mb-1 flex items-center">
                    <Badge className="mr-2 text-green-500" /> <span className="font-semibold">Type:</span> {job.type}
                  </p>
                  <p className="text-gray-700 mb-1 flex items-center">
                    <DollarSign className="mr-2 text-yellow-500" /> <span className="font-semibold">Salary:</span> {job.salary}
                  </p>
                  <p className="text-gray-700 mb-1 flex items-center">
                    <Calendar className="mr-2 text-teal-500" /> <span className="font-semibold">Date:</span> {new Date(job.date).toLocaleDateString()}
                  </p>
                  <div className="mt-4">
                    <h3 className="font-semibold">Skills:</h3>
                    <ul className="list-disc list-inside">
                      {job.skills.map((skill, index) => (
                        <li key={index} className="text-gray-700 flex items-center">
                          <CheckCircle className="mr-2 text-indigo-500" /> {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-gray-600 mt-4 flex-grow">{job.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedJob && (
          <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm">
              <h2 className="text-xl font-bold mb-4">Apply for {selectedJob.position}</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Resume:</label>
                  <input
                    type="file"
                    name="resume"
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Job Title:</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    readOnly
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSearch;
