import React, { useState, createContext, useContext } from "react";
import * as databaseService from "../services/databaseService";

const DatabaseContext = createContext();

export const useDatabase = () => {
  const [
    libraryCards,
    cryptCards,
    inventory,
    setCardInInventory,
    addCardInInventory,
    subCardInInventory,
    decks,
    saveDeck,
    currentDeck,
    setCurrentDeck,
  ] = useContext(DatabaseContext);

  return {
    libraryCards,
    cryptCards,
    inventory,
    setCardInInventory,
    addCardInInventory,
    subCardInInventory,
    decks,
    saveDeck,
    currentDeck,
    setCurrentDeck,
  };
};

export const DatabaseProvider = (props) => {
  const libraryCards = databaseService.getLibrary();
  const cryptCards = databaseService.getCrypt();

  const [inventory, setInventory] = useState(databaseService.getInventory());
  const [decks, setDecks] = useState(databaseService.getDecks());
  const [currentDeck, setCurrentDeck] = useState();

  const saveDeck = (deckname, deckinfo) => {
    // setDecks(new Map(decks.set(deckname, deckinfo)));
  };

  const setCardInInventory = (cardId, amount) => {
    setInventory({ ...inventory, [cardId]: { id: cardId, amount: amount } });
  };

  const addCardInInventory = (cardId) => {
    setInventory({ ...inventory, [cardId]: { id: cardId, amount: inventory[cardId] ? inventory[cardId].amount + 1 : 1 } });
  };

  const subCardInInventory = (cardId) => {
    let card = inventory[cardId];

    if (card)
      if (card.amount > 1) setInventory({ ...inventory, [cardId]: { id: cardId, amount: inventory[cardId].amount - 1 } });
      else {
        let { [cardId]: deleted, ...newInventory } = inventory;
        setInventory(newInventory);
      }
  };

  // const setCardInInventory = (cardId, amount) => {
  //   if (inventory.find((card) => card.Id === cardId))
  //     setInventory(inventory.map((card) => (card.Id === cardId ? { ...card, amount: amount } : card)));
  //   else setInventory(inventory.concat({ Id: cardId, amount: amount }));
  // };

  // const addCardInInventory = (cardId) => {
  //   if (inventory.find((card) => card.Id === cardId))
  //     setInventory(inventory.map((card) => (card.Id === cardId ? { ...card, amount: card.amount + 1 } : card)));
  //   else setInventory(inventory.concat({ Id: cardId, amount: 1 }));
  // };

  // const subCardInInventory = (cardId) => {
  //   let card = inventory.find((card) => card.Id === cardId);

  //   if (card)
  //     if (card.amount > 1) setInventory(inventory.map((card) => (card.Id === cardId ? { ...card, amount: card.amount - 1 } : card)));
  //     else setInventory(inventory.filter((card) => card.Id !== cardId));
  // };

  return (
    <DatabaseContext.Provider
      value={[
        libraryCards,
        cryptCards,
        inventory,
        setCardInInventory,
        addCardInInventory,
        subCardInInventory,
        decks,
        saveDeck,
        currentDeck,
        setCurrentDeck,
      ]}
    >
      {props.children}
    </DatabaseContext.Provider>
  );
};
