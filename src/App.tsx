import { useState } from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";

import MovieType from "./utilities/types/MovieType";

import Contacts from "./components/Contacts";
import Favorites from "./components/Favorites";
import MovieDetails from "./components/MovieDetails";
import Navbar from "./components/Navbar";
import Search from "./components/Search";

function App() {
  const initialFavorites = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  const [favorites, setFavorites] = useState<MovieType[]>(initialFavorites);

  const addToFavorites = (movie: MovieType) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, movie];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const removeFromFavorites = (movieId: string) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (movie) => movie.id !== movieId
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Search />} />
          <Route
            path="/movies/:id"
            element={
              <MovieDetails
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                favorites={favorites}
              />
            }
          />
          <Route
            path="/favorites"
            element={<Favorites favorites={favorites} />}
          />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
