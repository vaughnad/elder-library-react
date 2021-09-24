import React, { useState, useMemo } from "react";
import { useDatabase } from "../hooks";

export const DeckBuilderPage = () => {
  const { decks, deck } = useDatabase();
  //   const [quickSearch, setQuickSearch] = useState("");

  const deckList = useMemo(() => {
    return Object.values(decks).map((deck) => deck);
  }, [decks]);

  return (
    <React.Fragment>
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {deckList.map((deck) => (
            <tr key={deck.name}>
              <td>{deck.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};
