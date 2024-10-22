import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setData } from "../store/action/detailAction";
import { FaHeart } from "react-icons/fa";

const DetailBeranda = () => {
  const { id } = useParams();
  const item = useSelector((state) => state.detail);
  const dispatchRedux = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [ratedList, setRatedList] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);

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

      //
      //   `Fetching from URL: https://api.themoviedb.org/3/movie/${id}`
      // );

      dispatchRedux(setData(response.data)); // Gunakan response.data, bukan response.json()
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getRated = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/account/null/rated/movies`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGJlOGY1ZWExYmQyY2Q2ZTE5YTQxOTdmZDQyOWM0ZiIsIm5iZiI6MTcyOTQzMTU2OC43NzkwNzMsInN1YiI6IjY3MDQ4MjQ3MzIyZDNlYTgzMTFkMmY4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.67B_PptUL7hQqEgCa9-B6-yiXwigGoTp7htz8_w_Bi4",
          },
        }
      );

      setRatedList(response.data.results);
    } catch (error) {
      console.error(error.message);
    }
  };

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
      console.log(response.data);
      setFavoriteList(response.data.results);

      // setRatedList(response.data.results);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getCurrentMovieRatings = () => {
    const index = ratedList.findIndex((movie) => movie.id == id);
    if (!ratedList[index]) {
      return;
    }
    setUserRating(ratedList[index].rating);
  };

  const getCurrentMovieFavorite = () => {
    const index = favoriteList.findIndex((movie) => movie.id == id);
    if (!favoriteList[index]) {
      setIsFavorite(false);
      return;
    }
    setIsFavorite(true);
    // setIsFavorite(favoriteList[index].rating);
  };

  const postRating = async (valueRating) => {
    try {
      await axios.post(
        `https://api.themoviedb.org/3/movie/${id}/rating`,
        { value: valueRating },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGJlOGY1ZWExYmQyY2Q2ZTE5YTQxOTdmZDQyOWM0ZiIsIm5iZiI6MTcyOTQzMTU2OC43NzkwNzMsInN1YiI6IjY3MDQ4MjQ3MzIyZDNlYTgzMTFkMmY4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.67B_PptUL7hQqEgCa9-B6-yiXwigGoTp7htz8_w_Bi4",
          },
        }
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const postFavorite = async (boolean) => {
    try {
      const favoriteData = {
        media_type: "movie",
        media_id: Number(id),
        favorite: boolean,
      };
      console.log(favoriteData);
      const response = await axios.post(
        `https://api.themoviedb.org/3/account/null/favorite`,
        favoriteData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGJlOGY1ZWExYmQyY2Q2ZTE5YTQxOTdmZDQyOWM0ZiIsIm5iZiI6MTcyOTQzMTU2OC43NzkwNzMsInN1YiI6IjY3MDQ4MjQ3MzIyZDNlYTgzMTFkMmY4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.67B_PptUL7hQqEgCa9-B6-yiXwigGoTp7htz8_w_Bi4",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleFavoriteToggle = () => {
    postFavorite(!isFavorite);
    setIsFavorite(!isFavorite);
  };

  const handleRating = (rating) => {
    setUserRating(rating);
    postRating(rating);
  };

  useEffect(() => {
    if (!ratedList) {
      return;
    }
    getCurrentMovieRatings();
  }, [ratedList]);

  useEffect(() => {
    if (!favoriteList) {
      return;
    }
    getCurrentMovieFavorite();
  }, [favoriteList]);

  useEffect(() => {
    getData();
    getRated();
    getFavorite();
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
      <div className="relative card-body text-white bg-black bg-opacity-70 rounded-lg p-5 min-h-screen">
        <div className="flex items-start mt-16 mx-12">
          {/* Image */}
          <img
            src={`https://image.tmdb.org/t/p/w500${item?.data?.poster_path}`}
            alt="Movie Poster"
            className="w-[300px] h-auto rounded-lg shadow-lg"
          />
          <div className="flex flex-col space-y-12 ml-6">
            <div className="">
              <h2 className="card-title text-2xl font-bold">
                {item?.data?.title}
              </h2>
              <p className="mt-6 w-[400px] text-justify">
                {item?.data?.overview}
              </p>
            </div>
            <div className="flex space-y-4 flex-col">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border-2 space-x-2 px-3 py-4 badge badge-outline text-purple-600">
                  <span>⭐</span>
                  <span>{item?.data?.vote_average}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <span
                      key={rating}
                      className={`cursor-pointer transition-all text-xl ${
                        userRating >= rating
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }`}
                      onClick={() => handleRating(rating)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex pl-2 items-center">
                <FaHeart
                  className={`text-3xl transition-all cursor-pointer ${
                    isFavorite ? "text-pink-500" : "text-white"
                  }`}
                  onClick={handleFavoriteToggle} // Toggle favorite and redirect
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card-actions justify-end mt-5">
          <button className="btn btn-primary">Tonton</button>
        </div>
      </div>
    </div>
  );
};

export default DetailBeranda;
