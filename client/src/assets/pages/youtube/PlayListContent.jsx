// src/components/Playlist.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PlaylistContent = () => {
  const  playlistId  = useParams(); 
  const pid = playlistId.id;
  console.log(pid);
  
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const API_KEY = 'AIzaSyCAs9y7pWLgU8UDSFzQCNl5OSCxRjv3e4Q';
//   console.log(playlistId);
  

  useEffect(() => {
    if (!playlistId) return;

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
  }, [playlistId, API_KEY]);

  return (
    <div>
      <h1>Playlist Videos</h1>
      <div>
        {selectedVideo && (
          <div className="video-player">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${selectedVideo}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Video Player"
            ></iframe>
          </div>
        )}
        <div className="video-list">
          {videos.length > 0 ? (
            videos.map((video) => (
              <div
                key={video.snippet.resourceId.videoId}
                onClick={() => setSelectedVideo(video.snippet.resourceId.videoId)}
                style={{ cursor: 'pointer', marginBottom: '10px' }}
              >
                <h3>{video.snippet.title}</h3>
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  style={{ width: '100%', maxWidth: '200px' }}
                />
              </div>
            ))
          ) : (
            <p>No videos found for this playlist.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistContent;
