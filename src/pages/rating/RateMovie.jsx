import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Import Link dari react-router-dom

const RatedMovies = () => {
  const [ratedMovies, setRatedMovies] = useState([]);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  // Ambil daftar film yang di-rating dari localStorage saat komponen di-mount
  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("ratedMovies")) || [];
    console.log(movies);
    setRatedMovies(movies);
  }, []);

  if (ratedMovies.length === 0) {
    return (
      <div className="text-center text-gray-400">
        Belum ada film yang di-rating.
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-10 ${
      isDarkMode ? "bg-gray-900" : "bg-slate-500"
    } text-white transition-all duration-1000`}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8">
        {ratedMovies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={`${movie.id}-${movie.userRating}`}
>
            <div
              className="relative bg-black rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent opacity-70"></div>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-semibold text-white">
                  {movie.title}
                </h3>
                <p className="text-sm text-gray-300">
                  Rating Anda:{" "}
                  <span className="text-purple-400">{movie.userRating} / 5</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RatedMovies;