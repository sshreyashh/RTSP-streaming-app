import React, { useRef, useEffect, useState } from 'react';
import Overlay from './Overlay';
import './App.css';

const LivestreamPlayer = () => {
  const videoRef = useRef(null);
  const [overlays, setOverlays] = useState([]);

  // Fetch overlays from backend on component mount
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/overlays`)
      .then(response => response.json())
      .then(data => setOverlays(data))
      .catch(error => console.error('Error fetching overlays:', error));
  }, []);


  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleVolumeChange = (e) => {
    videoRef.current.volume = e.target.value;
  };

  const createOverlay = async () => {
    const newOverlay = {
      content: 'Your Overlay Content',
      position: { top: 50, left: 50 },
      size: { width: 100, height: 50 },
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/overlays`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOverlay),
      });

      if (response.ok) {
        const data = await response.json();
        setOverlays([...overlays, data]);
        console.log('Overlay created successfully:', data);
      } else {
        console.error('Failed to create overlay:', response.status);
      }
    } catch (error) {
      console.error('Error during overlay creation:', error);
    }
  };

  return (
    <div className="centered-container">
      <div className="video-container">
        <video ref={videoRef} controls>
          <source src="rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov" type="application/x-rtsp" />
          Your browser does not support the video tag.
        </video>
        {overlays.map((overlay) => (
          <Overlay key={overlay.id} {...overlay} />
        ))}
      </div>
      <div className="button-container">
        <button onClick={handlePlayPause}>Play/Pause</button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={videoRef.current ? videoRef.current.volume : 0}
          onChange={handleVolumeChange}
        />
        <button onClick={createOverlay}>Add Overlay</button>
      </div>
    </div>
  );
};

export default LivestreamPlayer;



