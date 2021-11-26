import React, { useState, useMemo } from "react";
import { useDatabase } from "../hooks";
import { Table, Button, Container, Row, Col } from "react-bootstrap";

export const DeckBuilderPage = () => {
  const { decks, isEditingDeck, setEditingCardInfo, editingCardInfo, editingCardList, createNewDeck, saveDeck, loadDeck, cryptCards, libraryCards } =
    useDatabase();
  //   const [quickSearch, setQuickSearch] = useState("");

  const deckList = useMemo(() => {
    return Object.values(decks).map((deck) => deck);
  }, [decks]);

  const currentDeckCryptList = useMemo(() => {
    let cardList = {};

    if (isEditingDeck) {
      cardList = Object.values(cryptCards)
        .filter((card) => editingCardList[card.id])
        .map((card) => ({ ...card, amount: editingCardList[card.id].amount }));
    }

    return cardList;
  }, [isEditingDeck, editingCardList, cryptCards]);

  const currentDeckLibraryList = useMemo(() => {
    let cardList = {};

    if (isEditingDeck) {
      cardList = Object.values(libraryCards)
        .filter((card) => editingCardList[card.id])
        .map((card) => ({ ...card, amount: editingCardList[card.id].amount }));
    }

    return cardList;
  }, [isEditingDeck, editingCardList, libraryCards]);

  return (
    <Container>
      <Row>
        <Col>
          <h3>Decks:</h3>
          <Table striped borderless>
            <tbody>
              {deckList.map((deck) => (
                <tr key={deck.id}>
                  <td onClick={() => loadDeck(deck)}>{deck.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button onClick={() => createNewDeck()}>New Deck</Button>
        </Col>
        <Col>
          {isEditingDeck && (
            <div>
              <h3>Editing Deck: </h3>{" "}
              <input
                className="form-control"
                type="text"
                value={editingCardInfo.name}
                onChange={(e) => setEditingCardInfo({ ...editingCardInfo, name: e.target.value })}
              />
              <Table striped>
                <thead>
                  <tr>
                    <th>Amount</th>
                    <th>Crypt Card Name</th>
                    <th>Cap</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentDeckCryptList.map((card) => (
                    <tr key={card.id}>
                      <td>{card.amount}</td>
                      <td>{card.name}</td>
                      <td>{card.capacity}</td>
                      <td>{card.disciplines}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Table striped>
                <thead>
                  <tr>
                    <th>Amount</th>
                    <th>Library Card Name</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDeckLibraryList.map((card) => (
                    <tr key={card.id}>
                      <td>{card.amount}</td>
                      <td>{card.name}</td>
                      <td>{card.types}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button onClick={() => saveDeck()}>Save Deck</Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};
