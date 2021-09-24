import React from "react";
import { useDatabase } from "../hooks";
import { CryptCardList } from "../components/CryptCardList";
import { useState } from "react";

export const CryptPage = () => {
  const { cryptCards } = useDatabase();
  const [quickSearch, setQuickSearch] = useState("");

  return (
    <React.Fragment>
      <input className="form-control" type="text" value={quickSearch} onChange={(e) => setQuickSearch(e.target.value)} />
      <CryptCardList cards={cryptCards} filter={{ quickSearch: quickSearch }} />
    </React.Fragment>
  );
};
