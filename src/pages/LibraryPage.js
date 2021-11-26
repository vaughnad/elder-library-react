import React from "react";
import { useDatabase } from "../hooks";
import { LibraryCardList } from "../components/LibraryCardList";
import { useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";

export const LibraryPage = () => {
  const { libraryCards } = useDatabase();
  const [quickSearch, setQuickSearch] = useState("");

  return (
    <React.Fragment>
      <InputGroup className="mb-3">
        <InputGroup.Text id="search">Search:</InputGroup.Text>
        <FormControl
          placeholder="Card Name..."
          aria-label="Search"
          aria-describedby="Search"
          value={quickSearch}
          onChange={(e) => setQuickSearch(e.target.value)}
        />
      </InputGroup>
      {/* Search: <input className="form-control" type="text" value={quickSearch} onChange={(e) => setQuickSearch(e.target.value)} /> */}
      <LibraryCardList cards={libraryCards} filter={{ quickSearch: quickSearch }} />
    </React.Fragment>
  );
};
