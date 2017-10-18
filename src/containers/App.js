import React from "react";
import { Route, Switch } from "react-router-dom";

// Using Bulma with extensions so custom build css
import "../styles/bulma.css";
import "font-awesome/css/font-awesome.css";
import "./App.css";

import NavBar from "./NavBar";
import Errors from "./Errors";
import NoMatch from "./NoMatch";

import Overview from "./Overview";
import Reports from "./Reports";
import Forecasts from "./Forecasts";

const App = props => (
  <div>
    <NavBar />
    <Errors errors={props.errors} />

    <Switch>
      <Route exact path="/" component={Overview} />
      <Route exact path="/reports" component={Reports} />
      <Route exact path="/forecasts" component={Forecasts} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default App;
