import { Heart, House, ListCheck, Star } from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ThemeContext from "./context/ThemeContext";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Navbar() {
  const [getTheme, setTheme] = useContext(ThemeContext);
  const theme = useSelector((state) => state.theme.theme);
  const root = window.document.documentElement;
  const [cari, setCari] = useSearchParams();
  const cariFilm = cari.get("cariFilm");
  const [hasilCari, setHasilCari] = useState([]); // State untuk hasil pencarian

  const handleTheme = () => {
    if (getTheme == "light") {
      setTheme("dark");
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      setTheme("light");
      root.classList.remove("dark");
      root.classList.add("light");
    }
  };

  const ubahCari = useCallback(
    async (input) => {
      setCari({ cariFilm: input }); // Update query parameter di URL

      if (input) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?query=${input}&page=1`,
            {
              headers: {
                Accept: "application/json",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2IzMDA2ZjFlYmNiYzExYjc5MWRmN2VkNjMyMDEwYyIsIm5iZiI6MTcyOTQ5MTczNy4wNDg3MDYsInN1YiI6IjY3MDQ5OTlkNGIwYzViOWQ3MTY5YmIwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6EotfUV1ySjkB1xi5aK34gHxJceSha-SblHBOCHfq1o", // Ganti dengan kunci API Anda
              },
            }
          );
          setHasilCari(response.data.results); // Set hasil pencarian ke state
        } catch (error) {
          console.error("Error fetching search results:", error);
          setHasilCari([]); // Kosongkan hasil jika ada error
        }
      } else {
        setHasilCari([]); // Kosongkan hasil jika input kosong
      }
    },
    [setCari]
  );

  useEffect(() => {
    if (cariFilm) {
      ubahCari(cariFilm);
    }
  }, [cariFilm, ubahCari]);

  return (
    <div>
      <div className="navbar bg-base-100 dark:bg-slate-500 dark:text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/">
                  <House />
                  Homepage
                </Link>
              </li>
              <li>
                <Link to="/favorites">
                  <Heart />
                  Favorit
                </Link>
              </li>
              <li>
                <Link to="/categories">
                  <ListCheck />
                  Kategori
                </Link>
              </li>

              <li>
                <Link to="/rated-movies">
                  <Star />
                  Rating
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <div className="form-control relative">
            <label className="input input-bordered flex items-center dark:bg-gray-700 dark:text-white">
              <input
                type="text"
                placeholder="Search"
                className="grow"
                value={cariFilm || ""} // Menampilkan kata kunci pencarian saat ini
                onChange={(input) => ubahCari(input.target.value)} // Panggil fungsi ubahCari saat input berubah
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70 dark:text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            {/* Menampilkan hasil pencarian */}
            {hasilCari.length > 0 && (
              <ul className="absolute top-12 bg-white dark:bg-gray-800 w-full mt-2 rounded-lg shadow-lg z-10 dark:text-white">
                {hasilCari.map((film) => (
                  <li
                    key={film.id}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white"
                  >
                    <Link to={`/detail/${film.id}`}>{film.title}</Link>
                    {/* Link ke halaman film */}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="navbar-end">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              className="theme-controller"
              value="synthwave"
              onChange={() => handleTheme()}
              checked={getTheme == "dark" ? true : false}
            />

            {/* sun icon */}
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
