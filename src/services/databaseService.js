import { library, crypt, metadata, sets } from "../assets/data";

export const getCrypt = () => {
  return crypt.reduce((acc, card) => {
    acc[card.Id] = {
      id: card.Id,
      name: card.Name,
      type: card.Type,
      clan: card.Clan,
      adv: card.Adv === "Advanced",
      group: card.Group,
      capacity: card.Capacity,
      disciplines: card.Disciplines,
      disciplinesList: card.Disciplines.split(" "),
      cardText: card.CardText,
      set: card.Set,
      title: card.Title,
      banned: card.Banned !== "",
      artist: card.Artist,
      imgName: getImageName(card),
    };

    return acc;
  }, {});
};

export const getLibrary = () => {
  return library.reduce((acc, card) => {
    //TODO ADD TITLES REQUERIMENTS
    const costs = getCost(card);

    acc[card.Id] = {
      id: card.Id,
      name: card.Name,
      types: card.Type,
      typesList: card.Type.split("/"),
      requires: joinNotEmpty([card.Discipline, card.Clan]),
      cost: costs.text,
      costAmount: costs.amount,
      costType: costs.type,
      burnOption: card.BurnOption === "Y",
      cardText: card.CardText,
      flavorText: card.FlavorText,
      set: card.Set,
      banned: card.Banned !== "",
      artist: card.Artist,
      capacity: card.Capacity,
      imgName: getImageName(card),
    };

    return acc;
  }, {});
};

export const getInventory = () => new Map();

export const saveInventory = () => {};

export const getDecks = () => ({
  deckOne: { name: "deckOne", deckList: {} },
});

export const saveDecks = () => {};

const joinNotEmpty = (array) => {
  return array.filter((item) => item !== "").join(", ");
};

const getCost = (card) => {
  if (card.PoolCost !== "") return { amount: card.PoolCost, type: "Pool", text: `${card.PoolCost}  Pool` };

  if (card.BloodCost !== "") return { amount: card.BloodCost, type: "Blood", text: `${card.BloodCost} Blood` };

  if (card.ConvictionCost !== "") return { amount: card.ConvictionCost, type: "Conviction", text: `${card.ConvictionCost} Conviction` };

  return { amount: null, type: null, text: "" };
};

const getImageName = (card) => {
  return (
    card.Name.replace(/[\s,'-/."]/g, "")
      .replace(/[áàâãÁÀÂÃ]/g, "a")
      .replace(/[éèêÉÈÊ]/g, "e")
      .replace(/[íìîÍÌÎ]/g, "i")
      .replace(/[óòôõÓÒÔÕ]/g, "o")
      .replace(/[úùûÚÙÛ]/g, "u")
      .toLowerCase() + (card.Adv === "Advanced" ? "adv" : "")
  );
};
