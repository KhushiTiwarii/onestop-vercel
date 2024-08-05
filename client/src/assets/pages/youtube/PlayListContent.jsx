import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../../components/SideBar';

const PlaylistContent = () => {
  const { id: pid } = useParams(); // Extract the playlist ID from the URL parameters
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const API_KEY = 'AIzaSyCAs9y7pWLgU8UDSFzQCNl5OSCxRjv3e4Q'; // Replace with your YouTube API key
  useEffect(() => {
    if (!pid) return;

    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${pid}&key=${API_KEY}`
        );
        const data = await response.json();
        setVideos(data.items || []); // Set empty array if no items found
        setSelectedVideo(data.items?.[0]?.snippet.resourceId.videoId || null);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [pid, API_KEY]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-semibold mb-6 text-purple-800">Playlist Videos</h1>

        {/* Intro Video Section */}
        <div className="intro-video mb-6">
          {selectedVideo ? (
            <div className="w-full" style={{ height: '500px', backgroundColor: 'black' }}>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Intro Video"
              ></iframe>
            </div>
          ) : (
            <p className="text-center text-gray-500">Select a video from the list below</p>
          )}
        </div>

        {/* Playlist Videos Section */}
        <div className="video-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {videos.length > 0 ? (
            videos.map((video) => (
              <div
                key={video.snippet.resourceId.videoId}
                onClick={() => setSelectedVideo(video.snippet.resourceId.videoId)}
                className="bg-white p-4 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105"
              >
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  className="w-full rounded-md mb-2"
                />
                <h3 className="text-lg font-medium text-gray-800">{video.snippet.title}</h3>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No videos found for this playlist.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistContent;
