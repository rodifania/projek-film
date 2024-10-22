// src/pages/FavoritesPage.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const favorites = useSelector((state) => state.detail.favorites);
  const movies = useSelector((state) => state.detail.data);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-5">Your Favorite Movies</h1>
      {favorites.length === 0 ? (
        <p>No favorite movies yet. Add some!</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {favorites.map((id) => (
            <div key={id} className="card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movies?.poster_path}`}
                alt="Movie Poster"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <h2 className="text-lg font-bold">{movies?.title}</h2>
              <Link to={`/movie/${id}`}>
                <button className="btn btn-primary">View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
