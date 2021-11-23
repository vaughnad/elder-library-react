import React, { useMemo, useState } from "react";
import { useDatabase } from "../hooks";
import { CardViewer } from "./CardViewer";

export const CryptCardList = ({ cards, filter }) => {
  const { addCardInInventory, subCardInInventory, inventory } = useDatabase();

  const cardsFiltered = useMemo(() => {
    return Object.values(cards)
      .filter((card) => card.name.toLowerCase().includes(filter.quickSearch.toLowerCase()))
      .map((card) => ({ ...card, amount: inventory[card.id] ? inventory[card.id].amount : 0 }));
  }, [cards, filter, inventory]);

  const [displayedCard, setDisplayedCard] = useState();

  return (
    <div>
      <div style={{ width: "calc(100% - 360px)", height: "calc(100vh - 190px)", display: "inline-block", overflow: "scroll" }}>
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
              <tr key={card.id} onMouseEnter={() => setDisplayedCard(card)}>
                <td>
                  <button onClick={() => addCardInInventory(card.id)}>+</button>
                  {card.amount}
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
      </div>
      <div style={{ width: "360px", display: "inline-flex", position: "fixed" }}>{displayedCard !== null && <CardViewer card={displayedCard} />}</div>
    </div>
  );
};
