import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import "bulma/css/bulma.css";
import "./App.css";
//import "font-awesome/css/font-awesome.min.css";

import TopBar from "./TopBar";
import SideBar from "./SideBar";
import MainContent from "./MainContent";

import Dashboard from "./Dashboard";
import About from "./About";
import Topics from "./Topics";
import NoMatch from "./NoMatch";

const App = () =>
  <Router>
    <div>
      <TopBar />

      <div className="columns is-marginless is-maincontent">
        <SideBar />

        <MainContent>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} />
            <Route component={NoMatch} />
          </Switch>
        </MainContent>
      </div>
    </div>
  </Router>;

export default App;
