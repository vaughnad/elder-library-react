import React, { useMemo } from "react";
import { useDatabase } from "../hooks";

export const CryptCardList = ({ cards, filter }) => {
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
          <th>Capacity</th>
          <th>Disciplines</th>
          <th>Clan</th>
          <th>Title</th>
          <th>Group</th>
          <th>CardText</th>
          <td>Set</td>
          <th>Artist</th>
        </tr>
      </thead>
      <tbody>
        {cardsFiltered.map((card) => (
          <tr key={card.id}>
            <td>
              <button onClick={() => addCardInInventory(card.id)}>+</button>
              <button onClick={() => subCardInInventory(card.id)}>-</button>
            </td>
            <td>{card.name}</td>
            <td>{card.capacity}</td>
            <td>{card.disciplines}</td>
            <th>{card.clan}</th>
            <td>{card.title}</td>
            <td>{card.group}</td>
            <td>{card.cardText}</td>
            <td>{card.set}</td>
            <td>{card.artist}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
