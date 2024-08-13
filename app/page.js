"use client";
import React, { useState } from 'react';
import Mahi from './components/mahi';
import LocalTimeBackground from './components/local_background';
import WorldTimeBackground from './components/world_background';

const Home = () => {
  const [view, setView] = useState('local');

  const handleSelect = (selectedView) => {
    setView(selectedView);
  };

  return (
    <div className="relative">
      <Mahi onSelect={handleSelect} />
      {view === 'local' ? (
        <LocalTimeBackground />
      ) : (
        <WorldTimeBackground />
      )}
    </div>
  );
};

export default Home;