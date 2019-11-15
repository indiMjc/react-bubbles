import React from "react";
import { Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";

function App() {
  return (
    <div className="App">
      <Link to="protected">Bubbles Page</Link>
      <Route exact path="/" component={Login} />
      <Switch>
        <PrivateRoute path="/protected">
          <BubblePage />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
