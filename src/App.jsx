import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Beranda from "./pages/beranda/Beranda";
import DetailBeranda from "./pages/DetailBeranda";
import ThemeContext from "./components/context/ThemeContext";
import { Provider } from "react-redux";
import store from "./store/store";
import Favorites from "./components/Favorit";
import RatedMovies from "./pages/rating/RateMovie";
import SearchPage from "./pages/SearchPage";
import CategoryPage from "./pages/CategoryPage";
import MoviesInCategory from "./components/MoviesInCategory";

function App() {
  const theme = useState("light");
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeContext.Provider value={theme}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="detail/:id" element={<DetailBeranda />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/movie/:id" element={<DetailBeranda />} />
            <Route path="/rated-movies" element={<RatedMovies />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/category/:id" element={<MoviesInCategory />} />
          </Routes>
        </ThemeContext.Provider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
