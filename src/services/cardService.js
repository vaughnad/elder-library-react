import { library, crypt, metadata, sets } from "../assets/data";

export const getCrypt = () => {
  return crypt.reduce((acc, card) => {
    acc[card.Id] = {
      id: card.Id,
      name: card.Name,
      displayName: getDisplayName(card),
      type: card.Type,
      clan: card.Clan,
      adv: card.Adv === "Advanced",
      group: card.Group,
      capacity: card.Capacity,
      disciplines: card.Disciplines,
      disciplinesList: card.Disciplines.split(" "),
      cardText: card.CardText,
      cardTextTrim: getTrimmedText(card.CardText, 120),
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
      cardTextTrim: getTrimmedText(card.CardText, 120),
      flavorText: card.FlavorText,
      flavorTextTrim: getTrimmedText(card.FlavorText, 35),
      set: card.Set,
      banned: card.Banned !== "",
      artist: card.Artist,
      capacity: card.Capacity,
      imgName: getImageName(card),
    };

    return acc;
  }, {});
};

const joinNotEmpty = (array) => {
  return array.filter((item) => item !== "").join(", ");
};

const getCost = (card) => {
  if (card.PoolCost !== "") return { amount: card.PoolCost, type: "Pool", text: `${card.PoolCost}  Pool` };

  if (card.BloodCost !== "") return { amount: card.BloodCost, type: "Blood", text: `${card.BloodCost} Blood` };

  if (card.ConvictionCost !== "") return { amount: card.ConvictionCost, type: "Conviction", text: `${card.ConvictionCost} Conviction` };

  return { amount: null, type: null, text: "" };
};

const getDisplayName = (card) => {
  return card.Name + (card.Adv === "Advanced" ? " (ADV)" : "");
};

const getTrimmedText = (text, length = 50) => {
  return text.length > length ? text.substring(0, length - 3) + "..." : text;
};

const getImageName = (card) => {
  return (
    card.Name.replace(/[\s,'-/."]/g, "")
      .replace(/[????????????????]/g, "a")
      .replace(/[????????????]/g, "e")
      .replace(/[????????????]/g, "i")
      .replace(/[????????????????]/g, "o")
      .replace(/[????????????]/g, "u")
      .toLowerCase() + (card.Adv === "Advanced" ? "adv" : "")
  );
};
