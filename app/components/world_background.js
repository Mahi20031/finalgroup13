import React from 'react';
import WorldTime from './world-clock';  

const WorldTimeBackground = ({ timezone }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img src="/world_clock.webp" alt="World Clock Background"
           className="absolute inset-0 w-full h-full object-cover z-0" style={{ opacity: 0.3 }} />

      <div className="relative z-15 flex flex-col items-center justify-center w-full h-full">
        <WorldTime timezone={timezone} />
      </div>
    </div>
  );
};

export default WorldTimeBackground;