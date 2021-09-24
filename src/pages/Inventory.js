import React, { useState, useMemo } from "react";
import { useDatabase } from "../hooks";

export const Inventory = () => {
  const { addCardInInventory, subCardInInventory, inventory, cryptCards, libraryCards } = useDatabase();
  const [quickSearch, setQuickSearch] = useState("");
  const [showAllCards, setShowAllCards] = useState(true);
  const [showCryptCards, setShowCryptCards] = useState(true);

  const filteredCryptList = useMemo(() => {
    let cardList = Object.values(cryptCards).map((card) => ({ ...card, amount: inventory[card.id] ? inventory[card.id].amount : 0 }));

    if (!showAllCards) cardList = cardList.filter((card) => card.amount > 0);

    return cardList;
  }, [inventory, cryptCards, showAllCards]);

  const filteredLibraryList = useMemo(() => {
    let cardList = Object.values(libraryCards).map((card) => ({ ...card, amount: inventory[card.id] ? inventory[card.id].amount : 0 }));

    if (!showAllCards) cardList = cardList.filter((card) => card.amount > 0);

    return cardList;
  }, [inventory, libraryCards, showAllCards]);

  return (
    <React.Fragment>
      <button onClick={() => setShowAllCards(!showAllCards)}>Show All Cards: {String(showAllCards)}</button>
      <button onClick={() => setShowCryptCards(!showCryptCards)}>Showing {showCryptCards ? "Crypt" : "Library"}</button>
      {showCryptCards && (
        <table>
          <thead>
            <tr>
              <th>Crypt Cards</th>
              <th>Amount</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredCryptList.map((card) => (
              <tr key={card.id}>
                <td>
                  <button onClick={() => addCardInInventory(card.id)}>+</button>
                  <button onClick={() => subCardInInventory(card.id)}>-</button>
                </td>
                <td>{card.amount}</td>
                <td>{card.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!showCryptCards && (
        <table>
          <thead>
            <tr>
              <th>Library Cards</th>
              <th>Amount</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredLibraryList.map((card) => (
              <tr key={card.id}>
                <td>
                  <button onClick={() => addCardInInventory(card.id)}>+</button>
                  <button onClick={() => subCardInInventory(card.id)}>-</button>
                </td>
                <td>{card.amount}</td>
                <td>{card.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </React.Fragment>
  );
};
