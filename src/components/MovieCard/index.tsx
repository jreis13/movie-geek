import placeholder from "../../assets/placeholder.png";
import MovieCardType from "../../utilities/types/MovieCardType";

import styles from "./index.module.scss";

function MovieCard({ movie }: MovieCardType) {
  return (
    <div className={styles.movie_card}>
      <img
        className={styles.movie_card__poster}
        src={movie.Poster || placeholder}
        alt={movie.Title}
        onError={(e) => {
          e.currentTarget.src = placeholder;
        }}
      />
      <div className={styles.movie_card__content}>
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </div>
  );
}

export default MovieCard;
