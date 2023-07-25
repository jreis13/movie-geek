import axios from "axios";
import MovieType from "./types/MovieType";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;
const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface MovieResult {
  title: string;
  release_date: string;
  year: string;
  overview: string;
  poster_path: string;
  id: number;
  vote_average: number;
}

export async function fetchAllMovies(searchTerm: string): Promise<MovieType[]> {
  try {
    const response = await axios.get(`${TMDB_API_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query: searchTerm,
      },
    });

    const movies: MovieType[] = response.data.results.map(
      (movieResult: MovieResult) => ({
        title: movieResult.title,
        release_date: movieResult.release_date,
        year: movieResult.release_date.substring(0, 4),
        id: movieResult.id.toString(),
        poster: movieResult.poster_path
          ? `${TMDB_IMAGE_BASE_URL}${movieResult.poster_path}`
          : "",
      })
    );

    return movies;
  } catch (error) {
    throw new Error("Error fetching data from The Movie Database.");
  }
}

export async function fetchLatestMovies(): Promise<MovieType[]> {
  try {
    const response = await axios.get(`${TMDB_API_BASE_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });

    console.log(response.data.results);

    const movies: MovieType[] = response.data.results.map(
      (movieResult: MovieResult) => ({
        title: movieResult.title,
        release_date: movieResult.release_date,
        year: movieResult.release_date.substring(0, 4),
        id: movieResult.id.toString(),
        poster: movieResult.poster_path
          ? `${TMDB_IMAGE_BASE_URL}${movieResult.poster_path}`
          : "",
      })
    );

    return movies;
  } catch (error) {
    throw new Error("Error fetching data from The Movie Database.");
  }
}

export async function fetchMovieById(id: string): Promise<MovieType> {
  try {
    const response = await axios.get(`${TMDB_API_BASE_URL}/movie/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });

    const movieResult: MovieResult = response.data;

    const movie: MovieType = {
      title: movieResult.title,
      release_date: movieResult.release_date,
      year: movieResult.release_date.substring(0, 4),
      id: movieResult.id.toString(),
      poster: movieResult.poster_path
        ? `${TMDB_IMAGE_BASE_URL}${movieResult.poster_path}`
        : "",
      description: movieResult.overview,
      rating: movieResult.vote_average.toFixed(1),
    };

    return movie;
  } catch (error) {
    throw new Error("Error fetching movie details from The Movie Database.");
  }
}
