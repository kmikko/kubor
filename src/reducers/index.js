import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import counter from "./counter";
import usage from "./usage";
import kubernetes from "./kubernetes";

export default combineReducers({
  router: routerReducer,
  counter,
  usage,
  kubernetes
});

export const makeIncrement = () => dispatch => {
  dispatch({
    type: "counter/INCREMENT_REQUESTED"
  });

  setTimeout(() => {
    dispatch({
      type: "counter/INCREMENT"
    });
  }, 3000);
};

/*
import byId, * as fromById from "./byId";
import createList, * as fromList from "./createList";

const listByFilter = combineReducers({
  all: createList("all"),
  active: createList("active"),
  completed: createList("completed")
});

const todos = combineReducers({
  byId,
  listByFilter
});

// TOOD: Name this to rootReducer, not necessary but makes more sense
export default todos;

export const getVisibleTodos = (state, filter) => {
  const ids = fromList.getIds(state.listByFilter[filter]);
  return ids.map(id => fromById.getTodo(state.byId, id));
};

export const getIsFetching = (state, filter) =>
  fromList.getIsFetching(state.listByFilter[filter]);

export const getErrorMessage = (state, filter) =>
  fromList.getErrorMessage(state.listByFilter[filter]);
*/
