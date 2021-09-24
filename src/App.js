import { HashRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import { LibraryPage, CryptPage, Inventory, DeckBuilderPage } from "./pages";

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Link to={"/crypt"} className="nav-link">
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
          </Link>
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
      </Router>
    </div>
  );
};

export default App;
