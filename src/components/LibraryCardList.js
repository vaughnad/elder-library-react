import React, { useMemo, useState } from "react";
import { useDatabase } from "../hooks";
import { CardViewer } from "./CardViewer";

export const LibraryCardList = ({ cards, filter }) => {
  const { addCardToInventory, subCardFromInventory, inventory, isEditingDeck, editingCardList, addCardToCurrentDeck, subCardFromCurrentDeck } =
    useDatabase();

  const cardsFiltered = useMemo(() => {
    return Object.values(cards)
      .filter((card) => card.name.toLowerCase().includes(filter.quickSearch.toLowerCase()))
      .map((card) => ({
        ...card,
        inventoryAmount: inventory[card.id] ? inventory[card.id].amount : 0,
        deckAmount: isEditingDeck && editingCardList[card.id] ? editingCardList[card.id].amount : 0,
      }));
  }, [cards, filter, inventory, isEditingDeck, editingCardList]);

  const [displayedCard, setDisplayedCard] = useState();

  return (
    <div>
      <div style={{ width: "calc(100% - 360px)", height: "calc(100vh - 190px)", display: "inline-block", overflow: "scroll" }}>
        <table>
          <thead>
            <tr>
              <th>Inventory</th>
              {isEditingDeck && <th>Current Deck</th>}
              <th>Name</th>
              <th>Type</th>
              <th>Requires</th>
              <th>Cost</th>
              <th>Card Text</th>
              <th>Set</th>
              <th>Flavor Text</th>
              <th>Artist</th>
            </tr>
          </thead>
          <tbody>
            {cardsFiltered.map((card) => (
              <tr key={card.id} onMouseEnter={() => setDisplayedCard(card)}>
                <td>
                  <button onClick={() => addCardToInventory(card.id)}>+</button>
                  {card.inventoryAmount}
                  <button onClick={() => subCardFromInventory(card.id)}>-</button>
                </td>
                {isEditingDeck && (
                  <td>
                    <button onClick={() => addCardToCurrentDeck(card.id)}>+</button>
                    {card.deckAmount}
                    <button onClick={() => subCardFromCurrentDeck(card.id)}>-</button>
                  </td>
                )}
                <td>{card.name}</td>
                <td>{card.types}</td>
                <td>{card.requires}</td>
                <td>{card.cost}</td>
                <td>{card.cardText}</td>
                <td>{card.set}</td>
                <td>{card.flavorText}</td>
                <td>{card.artist}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ width: "360px", display: "inline-flex", position: "fixed" }}>{displayedCard !== null && <CardViewer card={displayedCard} />}</div>
    </div>
  );
};
