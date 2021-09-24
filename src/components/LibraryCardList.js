import React, { useMemo } from "react";
import { useDatabase } from "../hooks";

export const LibraryCardList = ({ cards, filter }) => {
  const cardsFiltered = useMemo(() => {
    return Object.values(cards).filter((card) => card.name.toLowerCase().includes(filter.quickSearch.toLowerCase()));
  }, [cards, filter]);

  const { addCardInInventory, subCardInInventory } = useDatabase();

  return (
    <table>
      <thead>
        <tr>
          <th>Inventory</th>
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
          <tr key={card.Id}>
            <td>
              <button onClick={() => addCardInInventory(card.id)}>+</button>
              <button onClick={() => subCardInInventory(card.id)}>-</button>
            </td>
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
  );
};
