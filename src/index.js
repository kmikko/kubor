import React from "react";
import ReactDOM from "react-dom";
//import configureStore from "./configureStore";
import App from "./containers/App";

//import registerServiceWorker from "./registerServiceWorker";

//const store = configureStore();

const rootEl = document.getElementById("root");

ReactDOM.render(<App />, rootEl);
//ReactDOM.render(<Root store={store} />, document.getElementById("root"));
//registerServiceWorker();
