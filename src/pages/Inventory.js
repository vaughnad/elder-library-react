import React, { useState, useMemo } from "react";
import { useDatabase } from "../hooks";
import { Table, Button, Container, Row, Col } from "react-bootstrap";

export const Inventory = () => {
  const { addCardToInventory, subCardFromInventory, inventory, cryptCards, libraryCards } = useDatabase();
  const [quickSearch, setQuickSearch] = useState("");
  const [showAllCards, setShowAllCards] = useState(true);
  const [showCryptCards, setShowCryptCards] = useState(true);

  const filteredCryptList = useMemo(() => {
    let cardList = Object.values(cryptCards).map((card) => ({ ...card, amount: inventory[card.id] ? inventory[card.id].amount : 0 }));

    if (!showAllCards) cardList = cardList.filter((card) => card.amount > 0);

    return cardList;
  }, [inventory, cryptCards, showAllCards]);

  const filteredLibraryList = useMemo(() => {
    let cardList = Object.values(libraryCards).map((card) => ({ ...card, amount: inventory[card.id] ? inventory[card.id].amount : 0 }));

    if (!showAllCards) cardList = cardList.filter((card) => card.amount > 0);

    return cardList;
  }, [inventory, libraryCards, showAllCards]);

  return (
    <Container>
      <Row>
        <Col>
          <Button variant="primary" onClick={() => setShowAllCards(!showAllCards)}>
            Show All Cards: {String(showAllCards)}
          </Button>
        </Col>{" "}
      </Row>

      <Row>
        {/* <Button variant="primary" onClick={() => setShowCryptCards(!showCryptCards)}>
        Showing {showCryptCards ? "Crypt" : "Library"}
      </Button> */}
        <Col>
          {/* {showCryptCards && ( */}
          <div style={{ height: "calc(100vh - 100px)", overflow: "scroll" }}>
            <Table striped borderless>
              <thead style={{ position: "sticky", top: 0, backgroundColor: "#dfabab" }}>
                <tr>
                  <th>Crypt Cards</th>
                  <th>Amount</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {filteredCryptList.map((card) => (
                  <tr key={card.id}>
                    <td>
                      <Button variant="secondary" onClick={() => addCardToInventory(card.id)}>
                        +
                      </Button>
                      <Button variant="secondary" onClick={() => subCardFromInventory(card.id)}>
                        -
                      </Button>
                    </td>
                    <td>{card.amount}</td>
                    <td>{card.name}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {/* )} */}
        </Col>
        <Col>
          {/* {!showCryptCards && ( */}
          <div style={{ height: "calc(100vh - 100px)", overflow: "scroll" }}>
            <Table striped borderless>
              <thead style={{ position: "sticky", top: 0, backgroundColor: "#dfabab" }}>
                <tr>
                  <th>Library Cards</th>
                  <th>Amount</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {filteredLibraryList.map((card) => (
                  <tr key={card.id}>
                    <td>
                      <Button variant="secondary" onClick={() => addCardToInventory(card.id)}>
                        +
                      </Button>
                      <Button variant="secondary" onClick={() => subCardFromInventory(card.id)}>
                        -
                      </Button>
                    </td>
                    <td>{card.amount}</td>
                    <td>{card.name}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {/* )} */}
        </Col>
      </Row>
    </Container>
  );
};
