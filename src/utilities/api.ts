import MovieSearchResult from "./types/MovieSearchResultType";
import MovieType from "./types/MovieType";

async function fetchAllMovies(
  apiKey: string,
  searchTerm: string
): Promise<MovieType[]> {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`
    );
    const data: MovieSearchResult = await response.json();

    if (data.Response === "True") {
      return data.Search.sort((a, b) => b.Year.localeCompare(a.Year));
    } else {
      throw new Error("No movies found.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data.");
  }
}

export default fetchAllMovies;
