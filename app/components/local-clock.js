import React, { useEffect, useState } from 'react';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date()); 
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date()); 
    };
    updateTime(); 
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const dateString = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="text-7x2 tabular-nums font-semibold text-white">
        {timeString}
      </div>
      <div className="text-4x2 text-white">
        {dateString}
      </div>
    </div>
  );
};

export default Clock;