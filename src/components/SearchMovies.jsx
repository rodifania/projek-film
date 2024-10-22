import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchMovies = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${query}`
      );
      setResults(response.data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Cari film..."
        className="input-search"
      />
      <button onClick={handleSearch} className="btn-search">
        Cari
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="results">
        {results.length > 0 ? (
          results.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <h3 className="movie-title">{movie.title}</h3>
            </div>
          ))
        ) : (
          <p>Tidak ada hasil ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default SearchMovies;
