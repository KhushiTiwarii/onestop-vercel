import React, { useState } from 'react';
import Select from 'react-select';

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
  { value: 'fulltime', label: 'Full-time' },
  { value: 'parttime', label: 'Part-time' }
];

const locationOptions = [
  { value: 'remote', label: 'Remote' },
  { value: 'onsite', label: 'Onsite' },
  { value: 'hybrid', label: 'Hybrid' }
];

const AddJobForm = () => {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    type: '',
    location: '',
    skills: [],
    experience: '',
    salary: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTypeChange = (value) => {
    setFormData({ ...formData, type: value });
  };

  const handleLocationChange = (value) => {
    setFormData({ ...formData, location: value });
  };

  const handleSkillsChange = (values) => {
    setFormData({ ...formData, skills: values });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Here, you can add the logic to send formData to your backend API
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
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
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              classNamePrefix="select"
              value={typeOptions.find(option => option.value === formData.type)}
              onChange={handleTypeChange}
              placeholder="Select type"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Location:</label>
            <Select
              name="location"
              options={locationOptions}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              classNamePrefix="select"
              value={locationOptions.find(option => option.value === formData.location)}
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
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              classNamePrefix="select"
              value={formData.skills}
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
    </div>
  );
};

export default AddJobForm;
