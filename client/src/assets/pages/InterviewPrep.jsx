import React, { useState } from 'react';
import Sidebar from '../../components/SideBar';
import { useNavigate } from 'react-router-dom';
import { FaBrain, FaMicrophoneAlt } from 'react-icons/fa'; // Assuming you're using react-icons

const InterviewPrep = () => {
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    if (buttonName === "MockInterview") {
      navigate('/room');
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-purple-50 to-purple-100">
      <Sidebar />
      <div className="flex flex-col p-8 w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          How would you like to prepare for the Interview?
        </h1>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <button
              onClick={() => handleButtonClick('AptitudeTest')}
              className={`${
                activeButton === 'AptitudeTest'
                  ? 'bg-purple-700 shadow-lg'
                  : 'bg-purple-400'
              } flex items-center text-white px-6 py-4 rounded-lg transform transition-all duration-200 ease-in-out hover:bg-purple-600 hover:scale-105 hover:shadow-2xl focus:outline-none`}
            >
              <FaBrain className="mr-3" />
              Aptitude Test
            </button>
            <button
              onClick={() => handleButtonClick('MockInterview')}
              className={`${
                activeButton === 'MockInterview'
                  ? 'bg-purple-700 shadow-lg'
                  : 'bg-purple-400'
              } flex items-center text-white px-6 py-4 rounded-lg transform transition-all duration-200 ease-in-out hover:bg-purple-600 hover:scale-105 hover:shadow-2xl focus:outline-none`}
            >
              <FaMicrophoneAlt className="mr-3" />
              Mock Interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;
