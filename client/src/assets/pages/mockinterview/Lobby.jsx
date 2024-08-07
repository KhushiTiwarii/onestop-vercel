import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Lobby = () => {
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  const handleJoinRoom = useCallback(() => {
    if (value.trim()) {
      navigate(`/room/${value}`);
    }
  }, [navigate, value]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-600 to-purple-900">
      <h1 className="text-4xl font-bold text-white mb-8">OneStop Meeting</h1>
      <div className="w-80">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Enter Room Code"
          className="w-full p-3 rounded-lg text-purple-800 placeholder-purple-400 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 mb-4"
        />
        <button
          onClick={handleJoinRoom}
          className="w-full p-3 bg-white text-purple-800 font-semibold rounded-lg hover:bg-purple-700 hover:text-white transition-colors duration-300"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Lobby;
