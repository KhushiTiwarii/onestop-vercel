import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/SideBar';
import { FiPlayCircle } from 'react-icons/fi';

const playlists = [
  // DSA (Data Structures and Algorithms)
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
    title: 'DSA Course in Java - Kunal Kushwaha',
    no: 3,
    id: 'PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ',
    category: 'DSA',
  },
  {
    title: 'Advanced Data Structures and Algorithms',
    no: 4,
    id: 'PL2_aWCzGMAwLL-mEB4ef20f3iqWMGWa25',
    category: 'DSA',
  },

  // Web3
  {
    title: 'Intro to Web3 Course',
    no: 5,
    id: 'PLuPvKxJFzkLEFEJTm7DAIsmOUox-61tV0',
    category: 'Web3',
  },
  {
    title: 'Blockchain Development - Dapp University',
    no: 6,
    id: 'PL5dTjWUk_cPbviyfuJiBNnvguVboDAIgT',
    category: 'Web3',
  },
  {
    title: 'Coding a Decentralised Exchange in Node.js',
    no: 7,
    id: 'PLVKLWop9wWA9n9NQZ2GURoB_a1gOezN_e',
    category: 'Web3',
  },
  {
    title: 'Code Your Own Cryptocurrency - Dapp University',
    no: 8,
    id: 'PLS5SEs8ZftgWFuKg2wbm_0GLV0Tiy1R-n',
    category: 'Web3',
  },

  // Design

  
  {
    title: 'Photoshop for Beginners: Complete Course',
    no: 9,
    id: 'PLLlSBGLVsEPIFGSGw2zJ2K43V5vxMMMTE',
    category: 'Design',
    playlistTopic: 'Photoshop for Beginners: Complete Course',
    channelName: 'YouTube Channel Name'
  },
  {
    title: 'Figma Tutorials',
    no: 10,
    id: 'PLcfaF9xpcRDDPkDhwb1lEZkDUHKklfipL',
    category: 'Design',
    playlistTopic: 'Figma Tutorials',
    channelName: 'YouTube Channel Name'
  },
  {
    title: 'UI Design Tutorials',
    no: 11,
    id: 'PLERed4ILxkJ2dCoBhBXZrbVP5eGwSy1lb',
    category: 'Design',
    playlistTopic: 'UI Design Tutorials',
    channelName: 'YouTube Channel Name'
  },
  {
    title: 'Pro Logo Design',
    no: 12,
    id: 'PLYfCBK8IplO6eQSxf_9rhEXQhAHwOujcY',
    category: 'Design',
    playlistTopic: 'Pro Logo Design',
    channelName: 'YouTube Channel Name'
  },


  // App Development
  {
    title: 'Android App Development Course in 2024 | Saumya Singh',
    no: 13,
    id: 'PL6Q9UqV2Sf1gHCHOKYLDofElSvxtRRXOR',
    category: 'App Development',
    playlistTopic: 'Android App Development Course in 2024',
    channelName: 'Saumya Singh'
  },
  {
    title: 'Android Development Tutorials in Hindi',
    no: 14,
    id: 'PLTV_nsuD2lf4UCTV6xwvNPvFdmCNKyhc8',
    category: 'App Development',
    playlistTopic: 'Android Development Tutorials in Hindi',
    channelName: 'YouTube Channel Name'
  },
  {
    title: 'Android Development Tutorials in Hindi',
    no: 15,
    id: 'PLu0W_9lII9aiL0kysYlfSOUgY5rNlOhUd',
    category: 'App Development',
    playlistTopic: 'Android Development Tutorials in Hindi',
    channelName: 'YouTube Channel Name'
  },
  {
    title: 'Flutter Tutorial for Beginners',
    no: 16,
    id: 'PL4cUxeGkcC9jLYyp2Aoh6hcWuxFDX6PBJ',
    category: 'App Development',
    playlistTopic: 'Flutter Tutorial for Beginners',
    channelName: 'YouTube Channel Name'
  },
  // Web Development
  {
    title: 'HTML, CSS, JavaScript, Project, Git & GitHub',
    no: 17,
    id: 'PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i',
    category: 'Web Development',
    playlistTopic: 'HTML, CSS, JavaScript, Project, Git & GitHub',
    channelName: 'YouTube Channel Name'
  },
  {
    title: 'Complete Web Dev using MERN stack || Love Babbar',
    no: 18,
    id: 'PLDzeHZWIZsTo0wSBcg4-NMIbC0L8evLrD',
    category: 'Web Development',
    playlistTopic: 'Complete Web Dev using MERN stack',
    channelName: 'Love Babbar'
  },
  {
    title: 'Web Development Course',
    no: 19,
    id: 'PLfqMhTWNBTe3H6c9OGXb5_6wcc1Mca52n',
    category: 'Web Development',
    playlistTopic: 'Web Development Course',
    channelName: 'YouTube Channel Name'
  },
  {
    title: 'Sigma Web Development Course - Web Development Tutorials in Hindi 🗿',
    no: 20,
    id: 'PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w',
    category: 'Web Development',
    playlistTopic: 'Sigma Web Development Course',
    channelName: 'YouTube Channel Name'
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