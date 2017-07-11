import { v4 } from "node-uuid";
/*
 * action types
 */

export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";

/*
 * action creators
 */

export const addTodo = text => ({
  type: ADD_TODO,
  id: v4(),
  text
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id
});
