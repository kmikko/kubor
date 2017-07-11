import { combineReducers } from "redux";

import todos, * as fromTodos from "./todos";
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

// From combineReducers we know that state.todos is available
// This way components won't rely on state shape
export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);
