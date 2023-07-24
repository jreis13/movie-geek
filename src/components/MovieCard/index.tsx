import placeholder from "../../assets/placeholder.png";
import MovieCardType from "../../utilities/types/MovieCardType";

import styles from "./index.module.scss";

function MovieCard({ movie }: MovieCardType) {
  return (
    <div className={styles.movie_card}>
      <img
        className={styles.movie_card__poster}
        src={movie.poster || placeholder}
        alt={movie.title}
        onError={(e) => {
          e.currentTarget.src = placeholder;
        }}
      />
      <div className={styles.movie_card__content}>
        <h3>{movie.title}</h3>
        <p>{movie.year}</p>
      </div>
    </div>
  );
}

export default MovieCard;
