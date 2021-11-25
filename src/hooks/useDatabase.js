import React, { useState, createContext, useContext } from "react";
import * as DBService from "../services/localStorageDBService";
import * as cardService from "../services/cardService";

const DatabaseContext = createContext();

export const useDatabase = () => {
  const [
    libraryCards,
    cryptCards,
    inventory,
    setCardInInventory,
    addCardToInventory,
    subCardFromInventory,
    decks,
    saveDeck,
    loadDeck,
    isEditingDeck,
    editingCardList,
    setEditingCardList,
    editingCardInfo,
    setEditingCardInfo,
    createNewDeck,
    setCardInCurrentDeck,
    addCardToCurrentDeck,
    subCardFromCurrentDeck,
  ] = useContext(DatabaseContext);

  return {
    libraryCards,
    cryptCards,
    inventory,
    setCardInInventory,
    addCardToInventory,
    subCardFromInventory,
    decks,
    saveDeck,
    loadDeck,
    isEditingDeck,
    editingCardList,
    setEditingCardList,
    editingCardInfo,
    setEditingCardInfo,
    createNewDeck,
    setCardInCurrentDeck,
    addCardToCurrentDeck,
    subCardFromCurrentDeck,
  };
};

export const DatabaseProvider = (props) => {
  const libraryCards = cardService.getLibrary();
  const cryptCards = cardService.getCrypt();

  const [inventory, setInventory] = useState(DBService.getInventory());
  const [decks, setDecks] = useState(DBService.getDecks());
  const [isEditingDeck, setIsEditingDeck] = useState(false);
  const [editingCardList, setEditingCardList] = useState({});
  const [editingCardInfo, setEditingCardInfo] = useState({});

  const updateDecks = (decks) => {
    DBService.updateDecks(decks);
    setDecks(decks);
  };
  const updateInventory = (inventory) => {
    DBService.updateInventory(inventory);
    setInventory(inventory);
  };

  const saveDeck = () => {
    updateDecks({ ...decks, [editingCardInfo.id]: { ...editingCardInfo, cardList: editingCardList } });
    setEditingCardInfo({});
    setEditingCardList({});
    setIsEditingDeck(false);
  };

  const loadDeck = (deck) => {
    setEditingCardInfo({ name: deck.name, id: deck.id });
    setEditingCardList(deck.cardList);
    setIsEditingDeck(true);
  };

  const createNewDeck = () => {
    let newId =
      Object.values(decks).length > 0
        ? Math.max.apply(
            Math,
            Object.values(decks).map((deck) => deck.id)
          ) + 1
        : 1;
    setEditingCardInfo({ name: `New Deck`, id: newId });
    setEditingCardList({});
    setIsEditingDeck(true);
  };

  const setCardInCurrentDeck = (cardId, amount) => {
    setCard(cardId, amount, editingCardList, setEditingCardList);
  };

  const addCardToCurrentDeck = (cardId) => {
    addCard(cardId, editingCardList, setEditingCardList);
  };

  const subCardFromCurrentDeck = (cardId) => {
    subCard(cardId, editingCardList, setEditingCardList);
  };

  const setCardInInventory = (cardId, amount) => {
    setCard(cardId, amount, inventory, updateInventory);
  };

  const addCardToInventory = (cardId) => {
    addCard(cardId, inventory, updateInventory);
  };

  const subCardFromInventory = (cardId) => {
    subCard(cardId, inventory, updateInventory);
  };

  const setCard = (cardId, amount, targetList, setState) => {
    setState({ ...targetList, [cardId]: { id: cardId, amount: amount } });
  };

  const addCard = (cardId, targetList, setState) => {
    setState({ ...targetList, [cardId]: { id: cardId, amount: targetList[cardId] ? targetList[cardId].amount + 1 : 1 } });
  };

  const subCard = (cardId, targetList, setState) => {
    let card = targetList[cardId];

    if (card)
      if (card.amount > 1) setState({ ...targetList, [cardId]: { id: cardId, amount: targetList[cardId].amount - 1 } });
      else {
        let { [cardId]: deleted, ...newList } = targetList;
        setState(newList);
      }
  };

  return (
    <DatabaseContext.Provider
      value={[
        libraryCards,
        cryptCards,
        inventory,
        setCardInInventory,
        addCardToInventory,
        subCardFromInventory,
        decks,
        saveDeck,
        loadDeck,
        isEditingDeck,
        editingCardList,
        setEditingCardList,
        editingCardInfo,
        setEditingCardInfo,
        createNewDeck,
        setCardInCurrentDeck,
        addCardToCurrentDeck,
        subCardFromCurrentDeck,
      ]}
    >
      {props.children}
    </DatabaseContext.Provider>
  );
};
