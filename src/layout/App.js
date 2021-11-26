import React, { useState } from "react";
import { Route, Switch, Redirect, Link, useHistory, useLocation } from "react-router-dom";
import { LibraryPage, CryptPage, Inventory, DeckBuilderPage } from "../pages";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const App = () => {
  let history = useHistory();
  let location = useLocation();

  const [currentTab, setCurrentTab] = useState(location.pathname);

  const changeTab = (k) => {
    setCurrentTab(k);
    history.push(k);
  };

  return (
    <div>
      <div>
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3" activeKey={currentTab} onSelect={(k) => changeTab(k)}>
          <Tab eventKey="/crypt" title="Crypt"></Tab>
          <Tab eventKey="/library" title="Library"></Tab>
          <Tab eventKey="/deckbuilder" title="Deck Builder"></Tab>
          <Tab eventKey="/inventory" title="Inventory"></Tab>
        </Tabs>

        {/* <Link to={"/crypt"} className="nav-link">
          <p> Crypt </p>
        </Link>
        <Link to={"/library"} className="nav-link">
          <p> Library </p>
        </Link>
        <Link to={"/deckbuilder"} className="nav-link">
          <p> Deck Builder </p>
        </Link>
        <Link to={"/inventory"} className="nav-link">
          <p> Inventory </p>
        </Link> */}
      </div>
      <div>
        <Switch>
          <Route path={"/crypt"} render={() => <CryptPage />} />
          <Route path={"/library"} render={() => <LibraryPage />} />
          <Route path={"/deckbuilder"} render={() => <DeckBuilderPage />} />
          <Route path={"/inventory"} render={() => <Inventory />} />

          <Route render={() => <Redirect to="/library" />} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
