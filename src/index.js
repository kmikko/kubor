import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import store, { history } from "./store";
import App from "./containers/App";
//import registerServiceWorker from "./registerServiceWorker";

const rootEl = document.getElementById("root");

console.log(store.getState());

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  rootEl
);

//registerServiceWorker();
