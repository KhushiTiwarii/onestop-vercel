import React, { useState } from 'react';
import Sidebar from '../../components/SideBar';
import { useNavigate } from 'react-router-dom';

const InterviewPrep = () => {
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    if(buttonName==="MockInterview"){
      navigate('/room')
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col p-4">
        <div className="mt-4 flex gap-4">
          <button
            onClick={() => handleButtonClick('AptitudeTest')}
            className={`${
              activeButton === 'AptitudeTest'
                ? 'bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg'
                : 'bg-gradient-to-r from-purple-300 to-purple-400'
            } text-white px-6 py-3 rounded-lg transform transition-transform duration-200 ease-in-out hover:scale-105 focus:scale-95 focus:outline-none`}
          >
            Aptitude Test
          </button>
          <button
            onClick={() => handleButtonClick('MockInterview')}
            className={`${
              activeButton === 'MockInterview'
                ? 'bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg'
                : 'bg-gradient-to-r from-purple-300 to-purple-400'
            } text-white px-6 py-3 rounded-lg transform transition-transform duration-200 ease-in-out hover:scale-105 focus:scale-95 focus:outline-none`}
          >
            Mock Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;