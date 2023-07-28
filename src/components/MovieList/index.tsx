import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import MovieListType from "../../utilities/types/MovieListType";

import MovieCard from "../MovieCard";

import styles from "./index.module.scss";

function MovieList({
  movies,
  isLoading,
  currentPage,
  handleNextPage,
  handlePrevPage,
  moviesPerPage,
}: MovieListType) {
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const hasNextPage = movies.length > endIndex;
  const hasPrevPage = currentPage > 1;
  const noMoviesFound = isLoading ? false : movies.length === 0;

  const sortedMovies = movies.slice().sort((a, b) => {
    const dateA = new Date(a.release_date);
    const dateB = new Date(b.release_date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div>
      {noMoviesFound ? (
        <p>No movies found.</p>
      ) : isLoading ? (
        <div className={styles.search__results_wrapper}>
          <p>Loading movies...</p>
        </div>
      ) : (
        <div className={styles.search__results_wrapper}>
          <ul className={styles.search__results_list}>
            {sortedMovies.slice(startIndex, endIndex).map((movie) => (
              <li key={movie.id}>
                <MovieCard movie={movie} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {movies.length !== 0 && (
        <div className={styles.search__results_buttons}>
          {hasPrevPage && (
            <button
              className={styles.search__results_back_button}
              onClick={handlePrevPage}
              disabled={isLoading}
            >
              <ArrowBackIosIcon />
            </button>
          )}
          {hasNextPage && (
            <button
              className={styles.search__results_forward_button}
              onClick={handleNextPage}
              disabled={isLoading}
            >
              <ArrowForwardIosIcon />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default MovieList;
