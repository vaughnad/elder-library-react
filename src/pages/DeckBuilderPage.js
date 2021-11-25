import React, { useState, useMemo } from "react";
import { useDatabase } from "../hooks";

export const DeckBuilderPage = () => {
  const { decks, isEditingDeck, setEditingCardInfo, editingCardInfo, editingCardList, createNewDeck, saveDeck, loadDeck, cryptCards, libraryCards } =
    useDatabase();
  //   const [quickSearch, setQuickSearch] = useState("");

  const deckList = useMemo(() => {
    return Object.values(decks).map((deck) => deck);
  }, [decks]);

  const currentDeckCryptList = useMemo(() => {
    let cardList = {};

    if (isEditingDeck) {
      cardList = Object.values(cryptCards)
        .filter((card) => editingCardList[card.id])
        .map((card) => ({ ...card, amount: editingCardList[card.id].amount }));
    }

    return cardList;
  }, [isEditingDeck, editingCardList, cryptCards]);

  const currentDeckLibraryList = useMemo(() => {
    let cardList = {};

    if (isEditingDeck) {
      cardList = Object.values(libraryCards)
        .filter((card) => editingCardList[card.id])
        .map((card) => ({ ...card, amount: editingCardList[card.id].amount }));
    }

    return cardList;
  }, [isEditingDeck, editingCardList, libraryCards]);

  return (
    <React.Fragment>
      <button onClick={() => createNewDeck()}>New Deck</button>

      <h3>Decks:</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {deckList.map((deck) => (
            <tr key={deck.id}>
              <td onClick={() => loadDeck(deck)}>{deck.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditingDeck && (
        <div>
          <button onClick={() => saveDeck()}>Save Deck</button>
          <h3>Editing Deck: </h3>{" "}
          <input
            className="form-control"
            type="text"
            value={editingCardInfo.name}
            onChange={(e) => setEditingCardInfo({ ...editingCardInfo, name: e.target.value })}
          />
          <table>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Crypt Card Name</th>
              </tr>
            </thead>
            <tbody>
              {currentDeckCryptList.map((card) => (
                <tr key={card.id}>
                  <td>{card.amount}</td>
                  <td>{card.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Library Card Name</th>
              </tr>
            </thead>
            <tbody>
              {currentDeckLibraryList.map((card) => (
                <tr key={card.id}>
                  <td>{card.amount}</td>
                  <td>{card.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </React.Fragment>
  );
};
