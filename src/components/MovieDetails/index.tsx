import placeholder from "../../assets/placeholder.png";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchMovieById } from "../../utilities/api";
import MovieType from "../../utilities/types/MovieType";

import styles from "./index.module.scss";

function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieType>();
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

  if (isLoading) {
    return <p>Loading movie details...</p>;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  return (
    <div className={styles.movie_details}>
      <img
        className={styles.movie_details__poster}
        src={movie.poster || placeholder}
        alt={movie.title}
        onError={(e) => {
          e.currentTarget.src = placeholder;
        }}
      />
      <div className={styles.movie_details__info}>
        <h2>{movie.title}</h2>
        <p>{movie.year}</p>
        <p>{movie.description}</p>
      </div>
    </div>
  );
}

export default MovieDetails;
