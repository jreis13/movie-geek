import Movie from "./Movie";

interface MovieSearchResult {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export default MovieSearchResult;
