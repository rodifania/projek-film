// src/pages/beranda/BerandaView.jsx

import React from 'react';
import HeroSection from './HeroSection'; // Import HeroSection

const BerandaView = ({ data, dataPopuler }) => {
  const heroImages = [
    'https://image.tmdb.org/t/p/w500${item.poster_path}',
  ];  

  try {
    return (
      <div className="relative min-h-screen dark:bg-gray-900 bg-slate-500 dark:text-white transition-all">
        <HeroSection images={heroImages} />

        {/* Trending Section */}
        <h2 className="font-bold  text-3xl mt-12">Trending</h2>
        <div className="carousel w-[100%] rounded-box space-x-4 pt-10 ">
          {data?.map((item, index) => (
            <section key={index}>
              <div className="card carousel-item relative mx-2 shadow-xl" style={{ width: '200px', height: '300px' }}>
                <a href={`/detail/${item.id}`} className="h-full w-full block">
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})`,
                      backgroundBlendMode: "overlay",
                      backgroundColor: "rgba(0, 0, 0, 0.5)", // Black transparent overlay
                    }}
                  >
                    <h2 className="text-white text-center absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                      {item.title}
                    </h2>
                  </div>
                </a>
              </div>
            </section>
          ))}
        </div>

        {/* TV Section */}
        <h2 className="font-bold text-black text-3xl mt-12">Populer</h2>
        <div className="pt-12">
          <div className="carousel w-[100%] rounded-box space-x-4">
            {dataPopuler?.map((item, index) => (
              <section key={index}>
                <div className="card carousel-item relative mx-2 shadow-xl" style={{ width: '200px', height: '300px' }}>
                  <a href={`/detail/${item.id}`} className="h-full w-full block">
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})`,
                        backgroundBlendMode: "overlay",
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // Black transparent overlay
                      }}
                    >
                      <h2 className="text-white text-center absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                        {item.title}
                      </h2>
                    </div>
                  </a>
                </div>
              </section>
            ))}
          </div>

          {/* People Section */}
          <h2 className="font-bold text-black text-3xl text-center mt-12 ">TV</h2>
          <div className="flex flex-wrap space-x-4 space-y-4">
  {dataPopuler?.map((item, index) => (
    <div key={index} className="bg-white shadow-lg p-4 rounded-md w-60 h-100">
      <figure className='h-50'>
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt="Poster"
          className="h-40 w-full object-cover rounded-md"
        />
      </figure>
      <a href={`/detail/${item.id}`}>
        <div className="text-center mt-2">
          <h2 className="text-sm font-bold">{item.title}</h2>
        </div>
      </a>
    </div>
  ))}
</div>

      

        </div>
      </div>
    );
  } catch (error) {
    console.log(error.message);
  }
};

export default BerandaView;
