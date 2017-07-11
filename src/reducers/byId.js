const byId = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_TODOS_SUCCESS":
      const nextState = { ...state };
      action.response.forEach(todo => {
        // This ok because it's shallow copy and we are only modifying 1 level deep
        nextState[todo.id] = todo;
      });
      return nextState;
    default:
      return state;
  }
};

export default byId;

export const getTodo = (state, id) => state[id];
