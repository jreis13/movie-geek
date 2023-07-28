import { useEffect, useState } from "react";
import MovieType from "../../utilities/types/MovieType";
import MovieList from "../MovieList";

interface FavoritesProps {
  favorites: MovieType[];
}

function Favorites({ favorites }: FavoritesProps) {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setMovies(favorites);
    setIsLoading(false);
  }, [favorites]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const FAVORITES_PER_PAGE = window.innerWidth <= 768 ? 1 : 3;

  return (
    <div>
      <MovieList
        movies={movies}
        isLoading={isLoading}
        currentPage={currentPage}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        moviesPerPage={FAVORITES_PER_PAGE}
      />
    </div>
  );
}

export default Favorites;
