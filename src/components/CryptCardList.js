import React, { useMemo, useState } from "react";
import { useDatabase } from "../hooks";
import { CardViewer } from "./CardViewer";
import { Table, Button } from "react-bootstrap";
// import { Table, Typography } from "antd";

export const CryptCardList = ({ cards, filter }) => {
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

  //cryptDisplayOptions
  const cryptDisplayOptions = { title: true, group: true, cartText: true, set: false, artist: false };

  return (
    <div>
      <div style={{ width: "calc(100% - 360px)", height: "calc(100vh - 100px)", display: "inline-block", overflow: "scroll" }}>
        <Table striped borderless>
          <thead style={{ position: "sticky", top: 0, backgroundColor: "#dfabab" }}>
            <tr>
              <th>Inventory</th>
              {isEditingDeck && <th>Current Deck</th>}
              <th>Name</th>
              <th>Capacity</th>
              <th>Disciplines</th>
              <th>Clan</th>
              {cryptDisplayOptions.title && <th>Title</th>}
              {cryptDisplayOptions.group && <th>Group</th>}
              {cryptDisplayOptions.cartText && <th>CardText</th>}
              {cryptDisplayOptions.set && <th>Set</th>}
              {cryptDisplayOptions.artist && <th>Artist</th>}
            </tr>
          </thead>
          <tbody>
            {cardsFiltered.map((card) => (
              <tr key={card.id} onMouseEnter={() => setDisplayedCard(card)}>
                <td>
                  <Button variant="secondary" onClick={() => addCardToInventory(card.id)}>
                    +
                  </Button>
                  {card.inventoryAmount}
                  <Button variant="secondary" onClick={() => subCardFromInventory(card.id)}>
                    -
                  </Button>
                </td>
                {isEditingDeck && (
                  <td>
                    <Button variant="secondary" onClick={() => addCardToCurrentDeck(card.id)}>
                      +
                    </Button>
                    {card.deckAmount}
                    <Button variant="secondary" onClick={() => subCardFromCurrentDeck(card.id)}>
                      -
                    </Button>
                  </td>
                )}
                <td>{card.displayName}</td>
                <td>{card.capacity}</td>
                <td>{card.disciplines}</td>
                <th>{card.clan}</th>
                {cryptDisplayOptions.title && <td>{card.title}</td>}
                {cryptDisplayOptions.group && <td>{card.group}</td>}
                {cryptDisplayOptions.cartText && <td>{card.cardTextTrim}</td>}
                {cryptDisplayOptions.set && <td>{card.set}</td>}
                {cryptDisplayOptions.artist && <td>{card.artist}</td>}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div style={{ width: "360px", display: "inline-flex", position: "fixed" }}>{displayedCard !== null && <CardViewer card={displayedCard} />}</div>
    </div>
  );
};
