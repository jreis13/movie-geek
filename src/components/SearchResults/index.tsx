import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import { fetchAllMovies, fetchLatestMovies } from "../../utilities/api";
import MovieType from "../../utilities/types/MovieType";
import MovieCard from "../MovieCard";

import styles from "./index.module.scss";

const MOVIES_PER_PAGE = 3;

interface SearchResultsProps {
  searchTerm: string;
}

function SearchResults({ searchTerm }: SearchResultsProps) {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        if (searchTerm.trim() !== "") {
          const fetchedMovies = await fetchAllMovies(searchTerm);
          setMovies(fetchedMovies);
          setErrorMessage("");
        } else {
          const fetchedLatestMovies = await fetchLatestMovies();
          setMovies(fetchedLatestMovies);
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

    fetchData();
  }, [searchTerm]);

  useEffect(() => {
    async function fetchLatestMovies() {
      try {
        const fetchedMovies = await fetchAllMovies("");
        return fetchedMovies;
      } catch (error: unknown) {
        console.error("Error fetching latest movies:", error);
        return [];
      }
    }

    fetchLatestMovies();
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const sortedMovies = movies.slice().sort((a, b) => {
    const dateA = new Date(a.release_date);
    const dateB = new Date(b.release_date);
    return dateB.getTime() - dateA.getTime();
  });

  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
  const endIndex = startIndex + MOVIES_PER_PAGE;
  const hasNextPage = sortedMovies.length > endIndex;
  const hasPrevPage = currentPage > 1;
  const noMoviesFound = errorMessage === "No movies found.";

  return (
    <div className={styles.search_results}>
      {errorMessage && !noMoviesFound && <p>{errorMessage}</p>}
      {isLoading ? (
        <div className={styles.movie_wrapper}>
          <p>Loading movies...</p>
        </div>
      ) : (
        <div className={styles.movie_wrapper}>
          <ul className={styles.movie_list}>
            {sortedMovies.slice(startIndex, endIndex).map((movie) => (
              <li key={movie.id} className={styles.movie_card}>
                <MovieCard movie={movie} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {sortedMovies.length !== 0 && (
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

export default SearchResults;
