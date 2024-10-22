import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setData, toggleFavorite } from "../store/action/detailAction";
import { FaHeart } from "react-icons/fa";

const DetailBeranda = () => {
  const { id } = useParams();
  const item = useSelector((state) => state.detail);
  const favorites = useSelector((state) => state.detail.favorites);
  const dispatchRedux = useDispatch();
  const navigation = useNavigate();

  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    // console.log("Redux state:", item);
  }, [item]);

  useEffect(() => {
    console.log(item);
  }, [item]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGJlOGY1ZWExYmQyY2Q2ZTE5YTQxOTdmZDQyOWM0ZiIsIm5iZiI6MTcyOTQzMTU2OC43NzkwNzMsInN1YiI6IjY3MDQ4MjQ3MzIyZDNlYTgzMTFkMmY4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.67B_PptUL7hQqEgCa9-B6-yiXwigGoTp7htz8_w_Bi4",
          },
        }
      );

      // console.log(
      //   `Fetching from URL: https://api.themoviedb.org/3/movie/${id}`
      // );

      console.log(response.data);
      dispatchRedux(setData(response.data)); // Gunakan response.data, bukan response.json()
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFavoriteToggle = () => {
    dispatchRedux(toggleFavorite(id));
    navigation('/favorites');
  };

  const handleRating = (rating) => {
    console.log("Rating diberikan:", rating); // Cek log
    const ratedMovie = { ...item, userRating: rating };
    let ratedMovies = JSON.parse(localStorage.getItem("ratedMovies")) || [];

    const movieIndex = ratedMovies.findIndex((m) => m.id === item.id);
    if (movieIndex !== -1) {
      ratedMovies[movieIndex].userRating = rating;
    } else {
      ratedMovies.push(ratedMovie);
    }

    localStorage.setItem("ratedMovies", JSON.stringify(ratedMovies));
    setUserRating(rating);
    console.log("Daftar film yang di-rating:", ratedMovies);
  }
  const isFavorite = favorites.includes(id);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item?.data?.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Card dengan transparansi */}
      <div className="relative card-body text-white bg-black bg-opacity-70 rounded-lg p-5  min-h-screen">
        <div className="flex items-start mt-16">
          {/* Image */}
          <img
            src={`https://image.tmdb.org/t/p/w500${item?.data?.poster_path}`}
            alt="Movie Poster"
            className="w-[300px] h-auto rounded-lg shadow-lg"
          />
            <div className="ml-6">
              <h2 className="card-title text-2xl font-bold">
                {item?.data?.title}
              </h2>
              <p className="mt-6 w-[400px] text-justify">
                {item?.data?.overview}
              </p>
            </div>
        </div>
        <FaHeart
          className={`text-3xl cursor-pointer ml-5 mt-2 ${
            isFavorite ? 'text-pink-500' : 'text-white'
          }`}
          onClick={handleFavoriteToggle} // Toggle favorite and redirect
        />

<div className="flex items-center mb-4">
<div className="badge badge-outline text-purple-600">
              ⭐ {item.vote_average}
            </div>
            {[1, 2, 3, 4, 5].map((rating) => (
              <span
                key={rating}
                className={`cursor-pointer text-xl ${
                  userRating >= rating ? "text-yellow-400" : "text-gray-400"
                }`}
                onClick={() => handleRating(rating)}
              >
                ★
              </span>
            ))}
          </div>
        <div className="card-actions justify-end mt-5">
          <button className="btn btn-primary">Tonton</button>
        </div>
      </div>
    </div>
  );
};

export default DetailBeranda;
