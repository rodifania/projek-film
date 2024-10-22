import axios from "axios";
import { useEffect } from "react";
import BerandaView from "./BerandaView";
import { useDispatch, useSelector } from "react-redux";
import {
  setpeople,
  setpopuler,
  settrending,
} from "../../store/action/berandaAction";

const Beranda = () => {
  const data = useSelector((state) => state.beranda);
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.theme);
  console.log(theme);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const ambilFilmTrending = async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/day",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGJlOGY1ZWExYmQyY2Q2ZTE5YTQxOTdmZDQyOWM0ZiIsIm5iZiI6MTcyODM1ODA5My4yNDQ5NzgsInN1YiI6IjY3MDQ4MjQ3MzIyZDNlYTgzMTFkMmY4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QcfckMfJrYcxjqMiMYCc1LBKcF7Tf5KETUk-op1zhXg",
        },
      }
    );
    const data = await response.data;
    dispatch(settrending(data.results));
    // console.log(data);
  };

  const ambilFilmPopuler = async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGJlOGY1ZWExYmQyY2Q2ZTE5YTQxOTdmZDQyOWM0ZiIsIm5iZiI6MTcyODM1ODA5My4yNDQ5NzgsInN1YiI6IjY3MDQ4MjQ3MzIyZDNlYTgzMTFkMmY4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QcfckMfJrYcxjqMiMYCc1LBKcF7Tf5KETUk-op1zhXg",
        },
      }
    );
    const data = await response.data;
    dispatch(setpopuler(data.results));
    // console.log(data);
  };

  const ambilFilmPeople = async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/trending/tv/day",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGJlOGY1ZWExYmQyY2Q2ZTE5YTQxOTdmZDQyOWM0ZiIsIm5iZiI6MTcyOTQzMTU2OC43NzkwNzMsInN1YiI6IjY3MDQ4MjQ3MzIyZDNlYTgzMTFkMmY4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.67B_PptUL7hQqEgCa9-B6-yiXwigGoTp7htz8_w_Bi4",
        },
      }
    );
    const data = await response.data;
    dispatch(setpeople(data.results));
    // console.log(data);
  };

  useEffect(() => {
    ambilFilmPopuler();
    ambilFilmTrending();
    ambilFilmPeople();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <BerandaView
      dataPopuler={data.populer}
      data={data.trending}
      datapeople={data.people}
    />
  );
};

export default Beranda;
