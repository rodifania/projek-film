import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Undo2Icon } from "lucide-react"; // Menggunakan icon dari lucide-react
import { useSelector } from "react-redux";

const MovieDetail = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const getFilm = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGJlOGY1ZWExYmQyY2Q2ZTE5YTQxOTdmZDQyOWM0ZiIsIm5iZiI6MTcyOTQzMTU2OC43NzkwNzMsInN1YiI6IjY3MDQ4MjQ3MzIyZDNlYTgzMTFkMmY4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.67B_PptUL7hQqEgCa9-B6-yiXwigGoTp7htz8_w_Bi4",
        },
      });
      const data = await response.json();
      setFilm(data);

      // Cek jika film sudah di-rating oleh pengguna
      const ratedMovies = JSON.parse(localStorage.getItem("ratedMovies")) || [];
      const ratedMovie = ratedMovies.find((m) => m.id === data.id);
      if (ratedMovie) {
        setUserRating(ratedMovie.userRating);
      }
    } catch (error) {
      console.error("Error fetching film data:", error);
    }
  };

  const handleCancelRating = () => {
    let ratedMovies = JSON.parse(localStorage.getItem("ratedMovies")) || [];
    ratedMovies = ratedMovies.filter((m) => m.id !== film.id);
    localStorage.setItem("ratedMovies", JSON.stringify(ratedMovies));
    setUserRating(0); // Reset rating
  };

  useEffect(() => {
    getFilm();
  }, [id]);

  if (!film) {
    return <div className="text-center text-gray-400">Loading...</div>;
  }

  const posterUrl = `https://image.tmdb.org/t/p/w500${film.poster_path}`;

  return (
    <div className={`flex justify-center items-center min-h-screen  ${
      isDarkMode ? "bg-gray-900" : "bg-gray-500"
    } transition-all duration-1000`}>
      <div className="card bg-gray-800 max-w-sm w-full h-full shadow-xl border border-purple-600 rounded-lg transition-transform transform hover:scale-105">
        <figure>
          <img
            className="w-full h-48 object-cover rounded-t-lg"
            src={posterUrl}
            alt={film.title}
          />
        </figure>
        <div className="card-body p-4 flex flex-col justify-between h-full">
          <h2 className="card-title text-purple-400 text-lg">{film.title}</h2>
          <p className="line-clamp-2 text-gray-300 mb-4">{film.overview}</p>
          <div className="flex justify-between mb-4">
            <div className="badge badge-outline text-purple-600">
              {film.release_date}
            </div>
            <div className="badge badge-outline text-purple-600">
              ⭐ {film.vote_average}
            </div>
          </div>

          {/* Batalkan Rating Section */}
          {userRating > 0 ? (
            <div className="flex items-center mb-4">
              <button
                className="bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-110 flex items-center space-x-2"
                onClick={handleCancelRating}
              >
                <Undo2Icon className="w-5 h-5" /> {/* Icon untuk Batalkan */}
                <span>Batalkan Rating</span>
              </button>
            </div>
          ) : (
            <div className="text-gray-400">Anda belum memberi rating film ini.</div>
          )}

          <button className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 rounded-full transition-transform transform hover:scale-105">
            Tonton
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;