import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import app from "./reducers";

const configureStore = () => {
  const middlewares = [thunk];

  if (process.env.NODE_ENV !== "production") {
    middlewares.push(createLogger());
  }

  return createStore(
    app,
    //persistedState,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;
