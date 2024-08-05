import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/SideBar';
import { FiPlayCircle } from 'react-icons/fi';

const playlists = [
  // DSA
  {
    title: 'Strivers DSA Playlist',
    no: 1,
    id: 'PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz',
    category: 'DSA',
  },
  {
    title: 'Complete Java DSA by Apna College',
    no: 2,
    id: 'PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop',
    category: 'DSA',
  },
  {
    title: 'DSA Course in C++ - CodeWithHarry',
    no: 3,
    id: 'PLu0W_9lII9agrsyeN3YaT6YccOgvZq0LX',
    category: 'DSA',
  },
  {
    title: 'Advanced Data Structures and Algorithms',
    no: 4,
    id: 'PL2_aWCzGMAwLL-mEB4ef20f3iqWMGWa25',
    category: 'DSA',
  },

  // Web Development
  {
    title: 'ReactJS Tutorial for Beginners - TechWithTim',
    no: 5,
    id: 'PLzMcBGfZo4-kR4QKS0z-Ium3sPKGEkIO1',
    category: 'Web Development',
  },
  {
    title: 'Full Stack Web Development - freeCodeCamp',
    no: 6,
    id: 'PLWKjhJtqVAbnupwRFOq9GmE3ab4epDRtD',
    category: 'Web Development',
  },
  {
    title: 'HTML & CSS Crash Course - Academind',
    no: 7,
    id: 'PLpzy7FIRqpGD0kxI48v8QEVVZd744Phi4',
    category: 'Web Development',
  },
  {
    title: 'JavaScript Full Course - Programming with Mosh',
    no: 8,
    id: 'PLTjRvDozrdlxm-H8XcR1xqS-wxg8N2MWz',
    category: 'Web Development',
  },

  // App Development
  {
    title: 'Flutter Tutorial for Beginners - The Net Ninja',
    no: 9,
    id: 'PL4cUxeGkcC9gFdpX5tGUb5bJ7X0IcfNht',
    category: 'App Development',
  },
  {
    title: 'Android Development for Beginners - CodeWithChris',
    no: 10,
    id: 'PLT6Dbk2RIv32GLgX3J7EwulIEQoEZYU2W',
    category: 'App Development',
  },
  {
    title: 'iOS Development with Swift - Traversy Media',
    no: 11,
    id: 'PLillGF-RfqbbiTGgA77tGO426V3hRF9iE',
    category: 'App Development',
  },
  {
    title: 'React Native Crash Course - Academind',
    no: 12,
    id: 'PLpzy7FIRqpGD0kxI48v8QEVVZd744Phi4',
    category: 'App Development',
  },

  // Web3
  {
    title: 'Blockchain Development - Dapp University',
    no: 13,
    id: 'PLS5SEs8ZftgUtPOlQD0V6sfxrT4_2RrYE',
    category: 'Web3',
  },
  {
    title: 'Ethereum & Solidity - freeCodeCamp',
    no: 14,
    id: 'PLWKjhJtqVAblv09GtABbJOeEoLhWbKTe5',
    category: 'Web3',
  },
  {
    title: 'Building DApps with Ethereum and IPFS',
    no: 15,
    id: 'PLFZf7UYLqAKPGr8nKgtZRzVfuq3xD4fXN',
    category: 'Web3',
  },
  {
    title: 'Solidity Tutorial - Smart Contract Development',
    no: 16,
    id: 'PLS5SEs8ZftgUtPOlQD0V6sfxrT4_2RrYE',
    category: 'Web3',
  },

  // Design
  {
    title: 'UI/UX Design Tutorial - Envato Tuts+',
    no: 17,
    id: 'PLD8nQCAhR3tRDw5m91on96DH2sq6lKI9B',
    category: 'Design',
  },
  {
    title: 'Adobe XD for Beginners - DesignCourse',
    no: 18,
    id: 'PL2SpUuhyN2NR9sPtZISx5HSTlQe-TvUMs',
    category: 'Design',
  },
  {
    title: 'Figma Tutorial for Beginners - The Net Ninja',
    no: 19,
    id: 'PL4cUxeGkcC9jBcyZRQCZg1fq39Tx3x93M',
    category: 'Design',
  },
  {
    title: 'Graphic Design Basics - freeCodeCamp',
    no: 20,
    id: 'PLWKjhJtqVAbkFiqHnNaxpOPhh9tSWMXIF',
    category: 'Design',
  },
];

const categories = [...new Set(playlists.map((playlist) => playlist.category))];

const PlayLists = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredPlaylists = playlists.filter((playlist) => {
    return (
      (selectedCategory === '' || playlist.category === selectedCategory) &&
      playlist.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-semibold mb-6 text-purple-800">Playlists</h1>
        <div className="mb-6 flex justify-between">
          <input
            type="text"
            placeholder="Search playlists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mr-4 flex-1"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {categories.map((category, catIndex) => (
          <div key={catIndex} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-600">{category}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredPlaylists
                .filter((playlist) => playlist.category === category)
                .map((playlist, index) => (
                  <Link to={`/playlist/${playlist.id}`} key={index}>
                    <div className="bg-white rounded-lg shadow-md p-6 h-44 flex flex-col justify-between hover:bg-purple-100 transition-colors duration-300">
                      <div className="flex items-center mb-2">
                        <FiPlayCircle className="text-purple-600 mr-2" size={24} />
                        <h3 className="text-lg font-medium text-gray-900">{playlist.title}</h3>
                      </div>
                      <p className="text-gray-600">Playlist #{playlist.no}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayLists;
