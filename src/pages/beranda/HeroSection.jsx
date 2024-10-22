// src/pages/beranda/HeroSection.jsx

import React, { useEffect, useState } from 'react';

const HeroSection = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  return (
    <div className="relative h-64">
      <div
        className="absolute inset-0 bg-cover bg-center transition duration-700"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          height: '100%',
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay */}
      <div className="relative flex items-center h-full justify-center z-10 text-white text-center p-4">
        <h2 className="text-3xl font-bold">Welcome to the Movie Hub!</h2>
      </div>
    </div>
  );
};

export default HeroSection;
