import React from "react";
import { useDatabase } from "../hooks";
import { LibraryCardList } from "../components/LibraryCardList";
import { useState } from "react";

export const LibraryPage = () => {
  const { libraryCards } = useDatabase();
  const [quickSearch, setQuickSearch] = useState("");

  return (
    <React.Fragment>
      <input className="form-control" type="text" value={quickSearch} onChange={(e) => setQuickSearch(e.target.value)} />
      <LibraryCardList cards={libraryCards} filter={{ quickSearch: quickSearch }} />
    </React.Fragment>
  );
};
