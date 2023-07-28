import { useEffect, useState } from "react";

import { fetchAllMovies, fetchLatestMovies } from "../../utilities/api";

import MovieType from "../../utilities/types/MovieType";
import SearchResultsType from "../../utilities/types/SearchResultsType";

import MovieList from "../MovieList";

function SearchResults({ searchTerm }: SearchResultsType) {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        if (searchTerm.trim() !== "") {
          const fetchedMovies = await fetchAllMovies(searchTerm);
          setMovies(fetchedMovies);
        } else {
          const fetchedLatestMovies = await fetchLatestMovies();
          setMovies(fetchedLatestMovies);
        }
        setIsLoading(false);
      } catch (error: unknown) {
        console.error("Error fetching data:", error);
        setMovies([]);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [searchTerm]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const MOVIES_PER_PAGE = window.innerWidth <= 768 ? 1 : 3;

  return (
    <MovieList
      movies={movies}
      isLoading={isLoading}
      currentPage={currentPage}
      handleNextPage={handleNextPage}
      handlePrevPage={handlePrevPage}
      moviesPerPage={MOVIES_PER_PAGE}
    />
  );
}

export default SearchResults;
