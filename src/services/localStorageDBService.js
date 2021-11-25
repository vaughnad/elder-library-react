let localStorage = window.localStorage;
const deckListStorageKey = "OFelDB_DeckList";
const inventoryStorageKey = "OFelDB_Inventory";

export const getInventory = () => {
  let localInventory = getFromDB(inventoryStorageKey);

  if (localInventory) return localInventory;
  else return new Map();
};

export const updateInventory = (inventory) => {
  updateDB(inventoryStorageKey, inventory);
};

export const getDecks = () => {
  let localDeckList = getFromDB(deckListStorageKey);

  if (localDeckList) return localDeckList;
  else return new Map();
};

export const updateDecks = (decks) => {
  updateDB(deckListStorageKey, decks);
};

const getFromDB = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const updateDB = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
