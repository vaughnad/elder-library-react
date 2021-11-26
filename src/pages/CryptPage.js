import React from "react";
import { useDatabase } from "../hooks";
import { CryptCardList } from "../components/CryptCardList";
import { useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";

export const CryptPage = () => {
  const { cryptCards } = useDatabase();
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
      <CryptCardList cards={cryptCards} filter={{ quickSearch: quickSearch }} />
    </React.Fragment>
  );
};
