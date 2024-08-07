import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../config.js';
import SidebarRec from '../../components/SideBarRec';
import { FaTrash } from 'react-icons/fa';

const skillsOptions = [
  'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'PHP', 'HTML', 'CSS', 'TypeScript', 
  'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Linux', 
  'Git', 'DevOps', 'Agile', 'Scrum', 'Project Management', 'Machine Learning', 'Data Science', 
  'Artificial Intelligence', 'Deep Learning', 'NLP', 'TensorFlow', 'Keras', 'PyTorch', 'Data Analysis', 
  'Big Data', 'Hadoop', 'Spark', 'Tableau', 'Power BI', 'Business Intelligence', 'Cybersecurity', 
  'Blockchain', 'IoT', 'Mobile Development', 'Android Development', 'iOS Development', 'UI/UX Design', 
  'Figma', 'Swift'
].map(skill => ({ value: skill, label: skill }));

const typeOptions = [
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Internship', label: 'Internship' }
];

const locationOptions = [
  { value: 'Remote', label: 'Remote' },
  { value: 'On-site', label: 'On-site' },
  { value: 'Hybrid', label: 'Hybrid' }
];

const AddJobForm = () => {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    type: null,
    location: null,
    skills: [],
    experience: '',
    salary: ''
  });
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${BASE_URL}/jobs`);
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTypeChange = (option) => {
    setFormData({ ...formData, type: option || null });
  };

  const handleLocationChange = (option) => {
    setFormData({ ...formData, location: option || null });
  };

  const handleSkillsChange = (options) => {
    setFormData({ ...formData, skills: options.map(option => option.value) });
  };

  const validateForm = () => {
    if (!formData.company || !formData.position || !formData.type || !formData.location || formData.skills.length === 0 || !formData.experience || !formData.salary) {
      toast.error('Please fill out all fields.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const response = await fetch(`${BASE_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: formData.type ? formData.type.value : null,
          location: formData.location ? formData.location.value : null
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Job added successfully!');
        setFormData({
          company: '',
          position: '',
          type: null,
          location: null,
          skills: [],
          experience: '',
          salary: ''
        });
        fetchJobs();
      } else {
        toast.error(result.message || 'Failed to add job.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while adding the job.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/jobs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Job deleted successfully!');
        fetchJobs();
      } else {
        toast.error('Failed to delete job.');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('An error occurred while deleting the job.');
    }
  };

  return (
    <div className="flex h-screen">
      <SidebarRec />
      <div className="flex-1 p-8 bg-gray-50 overflow-auto">
        <div className="max-w-4xl mx-auto mt-8">
          <ToastContainer />
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Job</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Company:</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  placeholder="Enter company name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Position:</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  placeholder="Enter job position"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Type:</label>
                <Select
                  name="type"
                  options={typeOptions}
                  className="w-full"
                  classNamePrefix="select"
                  value={formData.type}
                  onChange={handleTypeChange}
                  placeholder="Select type"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Location:</label>
                <Select
                  name="location"
                  options={locationOptions}
                  className="w-full"
                  classNamePrefix="select"
                  value={formData.location}
                  onChange={handleLocationChange}
                  placeholder="Select location"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Skills:</label>
                <Select
                  isMulti
                  name="skills"
                  options={skillsOptions}
                  className="w-full"
                  classNamePrefix="select"
                  value={formData.skills.map(skill => ({ value: skill, label: skill }))}
                  onChange={handleSkillsChange}
                  placeholder="Select skills"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Experience:</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  placeholder="Enter experience required"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Salary:</label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  placeholder="Enter salary"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 mt-4"
            >
              Add Job
            </button>
          </form>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Job Listings</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Company</th>
                    <th className="py-2 px-4 border-b">Position</th>
                    <th className="py-2 px-4 border-b">Type</th>
                    <th className="py-2 px-4 border-b">Location</th>
                    <th className="py-2 px-4 border-b">Skills</th>
                    <th className="py-2 px-4 border-b">Experience</th>
                    <th className="py-2 px-4 border-b">Salary</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job._id}>
                      <td className="py-2 px-4 border-b">{job.company}</td>
                      <td className="py-2 px-4 border-b">{job.position}</td>
                      <td className="py-2 px-4 border-b">{job.type}</td>
                      <td className="py-2 px-4 border-b">{job.location}</td>
                      <td className="py-2 px-4 border-b">{job.skills.join(', ')}</td>
                      <td className="py-2 px-4 border-b">{job.experience}</td>
                      <td className="py-2 px-4 border-b">{job.salary}</td>
                      <td className="py-2 px-4 border-b">
                        <button onClick={() => handleDelete(job._id)} className="text-red-500 hover:text-red-700">
                          <FaTrash />
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

export default AddJobForm;