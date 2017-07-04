// @flow

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="block">
          <a className="button is-primary">Primary</a>
          <a className="button is-info">Info</a>
          <a className="button is-success">Success</a>
          <a className="button is-warning">Warning</a>
          <a className="button is-danger">Danger</a>
        </div>
      </div>
    );
  }
}

export default App;
