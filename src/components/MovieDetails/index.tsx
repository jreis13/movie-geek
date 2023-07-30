import {
  CalendarMonth,
  Favorite,
  FavoriteBorder,
  Star,
} from "@mui/icons-material";
import placeholder from "../../assets/placeholder.png";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchMovieById } from "../../utilities/api";
import MovieDetailsType from "../../utilities/types/MovieDetailsType";
import MovieType from "../../utilities/types/MovieType";

import styles from "./index.module.scss";

function MovieDetails({
  addToFavorites,
  removeFromFavorites,
  favorites,
}: MovieDetailsType) {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        if (id) {
          const fetchedMovie = await fetchMovieById(id);
          setMovie(fetchedMovie);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleAddToFavorites = () => {
    if (movie) {
      addToFavorites(movie);
    }
  };

  const handleRemoveFromFavorites = () => {
    if (movie) {
      removeFromFavorites(movie.id);
    }
  };

  if (isLoading) {
    return <p>Loading movie details...</p>;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  const isFavorite = favorites.some(
    (favMovie: MovieType) => favMovie.id === movie.id
  );

  return (
    <div className={styles.movie__details_wrapper}>
      <div className={styles.movie__details_poster_wrapper}>
        <img
          className={styles.movie__details_poster}
          src={movie.poster || placeholder}
          alt={movie.title}
          onError={(e) => {
            e.currentTarget.src = placeholder;
          }}
        />
        {isFavorite ? (
          <button onClick={handleRemoveFromFavorites}>
            <Favorite />
          </button>
        ) : (
          <button onClick={handleAddToFavorites}>
            <FavoriteBorder />
          </button>
        )}
      </div>
      <div className={styles.movie__details_info}>
        <h2>{movie.title}</h2>
        <div className={styles.movie__details_item}>
          <CalendarMonth /> {movie.year}
        </div>
        <div className={styles.movie__details_item}>
          <Star /> {movie.rating}
        </div>
        <p className={styles.movie__details_description}>{movie.description}</p>
      </div>
    </div>
  );
}

export default MovieDetails;
