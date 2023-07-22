import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import fetchAllMovies from "../../utilities/api";
import MovieType from "../../utilities/types/MovieType";
import MovieCard from "../MovieCard";

import styles from "./index.module.scss";

const MOVIES_PER_PAGE = 3;

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const apiKey = import.meta.env.VITE_OMDB_API_KEY;
        if (searchTerm.trim() !== "") {
          const fetchedMovies = await fetchAllMovies(apiKey, searchTerm);
          setMovies(fetchedMovies);
          setErrorMessage("");
        } else {
          setMovies([]);
          setErrorMessage("");
        }
        setIsLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setMovies([]);
          setErrorMessage(error.message);
        } else {
          console.error("Error fetching data:", error);
          setMovies([]);
          setErrorMessage("");
        }
        setIsLoading(false);
      }
    }

    if (searchTerm.trim() !== "") {
      fetchData();
    } else {
      setMovies([]);
      setErrorMessage("");
    }
  }, [searchTerm]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
  const endIndex = startIndex + MOVIES_PER_PAGE;

  const hasNextPage = movies.length > endIndex;
  const hasPrevPage = currentPage > 1;
  const noMoviesFound = errorMessage === "No movies found.";

  return (
    <div className={styles.search_wrapper}>
      <form>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          className={styles.search_input}
        />
      </form>
      {errorMessage && !noMoviesFound && <p>{errorMessage}</p>}
      {isLoading ? (
        <div className={styles.movie_wrapper}>
          <p>Loading movies...</p>
        </div>
      ) : (
        <div className={styles.movie_wrapper}>
          <ul className={styles.movie_list}>
            {movies.slice(startIndex, endIndex).map((movie) => (
              <li key={movie.imdbID} className={styles.movie_card}>
                <MovieCard movie={movie} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {movies.length !== 0 && (
        <div className={styles.arrows_container}>
          {hasPrevPage && (
            <button
              className={styles.arrow_button}
              onClick={handlePrevPage}
              disabled={isLoading}
              style={{ left: "-134px" }}
            >
              <ArrowBackIosIcon />
            </button>
          )}
          {hasNextPage && (
            <button
              className={styles.arrow_button}
              onClick={handleNextPage}
              disabled={isLoading}
              style={{ right: "-134px" }}
            >
              <ArrowForwardIosIcon />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
