import debounce from "lodash.debounce";
import { useState } from "react";

import styles from "./index.module.scss";

interface SearchBoxProps {
  onSearch: (searchTerm: string) => void;
}

function SearchBox({ onSearch }: SearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = debounce(onSearch, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <form>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search"
        className={styles.search_input}
      />
    </form>
  );
}

export default SearchBox;
