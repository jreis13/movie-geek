import MovieType from "../../utilities/types/MovieType";

interface MovieListType {
  movies: MovieType[];
  isLoading: boolean;
  currentPage: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  moviesPerPage: number;
}

export default MovieListType;
