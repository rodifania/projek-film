// src/pages/FavoritesPage.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  const getFavorite = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/account/null/favorite/movies`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGJlOGY1ZWExYmQyY2Q2ZTE5YTQxOTdmZDQyOWM0ZiIsIm5iZiI6MTcyOTQzMTU2OC43NzkwNzMsInN1YiI6IjY3MDQ4MjQ3MzIyZDNlYTgzMTFkMmY4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.67B_PptUL7hQqEgCa9-B6-yiXwigGoTp7htz8_w_Bi4",
          },
        }
      );
      console.log(response.data.results);
      setFavorites(response.data.results);

      // setRatedList(response.data.results);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getFavorite();
  }, []);

  return (
    <div className="container mx-auto bg-white py-8 dark:bg-gray-600">
      <h1 className="text-3xl text-black dark:text-gray-300 font-bold mb-5">Your Favorite Movies</h1>
      {favorites.length === 0 ? (
        <p>No favorite movies yet. Add some!</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {favorites.map((movies, id) => (
            <div key={id} className="card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movies?.poster_path}`}
                alt="Movie Poster"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <h2 className="text-lg font-bold">{movies?.title}</h2>
              <Link to={`/movie/${movies?.id}`}>
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
