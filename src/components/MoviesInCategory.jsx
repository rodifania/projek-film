import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MoviesInCategory = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMoviesInCategory = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&with_genres=${id}`
        );
        setMovies(response.data.results);
      } catch (error) {
        setError('Error fetching movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesInCategory();
  }, [id]);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Film dalam Kategori</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card p-4 bg-gray-800 text-white rounded-lg shadow-lg">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg"
            />
            <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesInCategory;
