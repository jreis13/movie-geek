import MovieType from "./MovieType";

interface MovieDetailsType {
  addToFavorites: (movie: MovieType) => void;
  removeFromFavorites: (movieId: string) => void;
  favorites: MovieType[];
}

export default MovieDetailsType;
