import React, { useState } from 'react';
import Sidebar from '../../components/SideBar';
import { useNavigate } from 'react-router-dom';
import { FaBrain, FaMicrophoneAlt } from 'react-icons/fa';
import Bot from './ChatBot/Bot';

const InterviewPrep = () => {
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    if (buttonName === "MockInterview") {
      navigate('/room');
    } else if (buttonName === "AptitudeTest") {
      navigate('/AptitudeTest');
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-purple-50 to-purple-100">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            How would you like to prepare for the Interview?
          </h1>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <button
              onClick={() => handleButtonClick('AptitudeTest')}
              className={`${
                activeButton === 'AptitudeTest'
                  ? 'bg-purple-700 shadow-lg'
                  : 'bg-purple-400'
              } flex flex-col items-center text-white px-6 py-8 rounded-lg transform transition-all duration-200 ease-in-out hover:bg-purple-600 hover:scale-105 hover:shadow-2xl focus:outline-none`}
            >
              <FaBrain className="text-4xl mb-3"/>
              <span className="text-xl font-semibold">Aptitude Test</span>
              <p className="mt-2 text-center">
                Take a series of quizzes designed to improve your problem-solving skills and prepare you for typical interview questions.
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/AptitudeTest');
                }}
                className="bg-purple-700 text-white px-4 py-2 rounded-lg mt-4 hover:bg-purple-500 transition duration-200"
              >
                Preview
              </button>
            </button>
            <button
              onClick={() => handleButtonClick('MockInterview')}
              className={`${
                activeButton === 'MockInterview'
                  ? 'bg-purple-700 shadow-lg'
                  : 'bg-purple-400'
              } flex flex-col items-center text-white px-6 py-8 rounded-lg transform transition-all duration-200 ease-in-out hover:bg-purple-600 hover:scale-105 hover:shadow-2xl focus:outline-none`}
            >
              <FaMicrophoneAlt className="text-4xl mb-3" />
              <span className="text-xl font-semibold">Mock Interview</span>
              <p className="mt-2 text-center">
                Connect with your peers for a mock interview over a video call and get real-time feedback on your performance.
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/room');
                }}
                className="bg-purple-700 text-white px-4 py-2 rounded-lg mt-4 hover:bg-purple-500 transition duration-200"
              >
                Preview
              </button>
            </button>
          </div>
        </div>
      </div>
      <Bot/>
    </div>
  );
};

export default InterviewPrep;
