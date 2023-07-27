import { useState } from "react";

import SearchBox from "../SearchBox";
import SearchResults from "../SearchResults";

import styles from "./index.module.scss";

function MovieList() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className={styles.movie__list_wrapper}>
      <SearchBox onSearch={handleSearch} />
      <SearchResults searchTerm={searchTerm} />
    </div>
  );
}

export default MovieList;