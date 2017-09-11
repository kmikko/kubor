import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import createHistory from "history/createBrowserHistory";
import rootReducer from "./reducers";

//import app from "./reducers";

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middlewares = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.devToolsExtension;

  // Chrome dev tools
  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }

  // redux-logger
  middlewares.push(createLogger());
}

const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers
);

const store = createStore(
  rootReducer,
  initialState, // e.g. persisted state
  composedEnhancers
);

export default store;
