import { Link } from "react-router-dom";

import placeholder from "../../assets/placeholder.png";

import MovieCardType from "../../utilities/types/MovieCardType";

import styles from "./index.module.scss";

function MovieCard({ movie }: MovieCardType) {
  return (
    <Link to={`/movies/${movie.id}`} className={styles.movie__card}>
      <img
        className={styles.movie__card_poster}
        src={movie.poster || placeholder}
        alt={movie.title}
        onError={(e) => {
          e.currentTarget.src = placeholder;
        }}
      />
      <div>
        <h3>{movie.title}</h3>
        <p>{movie.year}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
