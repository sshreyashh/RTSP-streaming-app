// src/Overlay.js
import React from 'react';

const Overlay = ({ content, position, size }) => {
  const overlayStyle = {
    position: 'absolute',
    top: `${position.top}px`,
    left: `${position.left}px`,
    width: `${size.width}px`,
    height: `${size.height}px`,
    border: '1px solid black',
    padding: '5px',
  };

  return <div style={overlayStyle}>{content}</div>;
};

export default Overlay;
