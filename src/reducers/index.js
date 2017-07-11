import { combineReducers } from "redux";

import todos from "./todos";
import visibilityFilter from "./visibilityFilter";

const app = combineReducers({
  todos,
  visibilityFilter
});

/*
Above is equivalent to:
export default function app(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}
*/

export default app;
