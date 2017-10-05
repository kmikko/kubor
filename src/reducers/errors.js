const uuidv4 = require("uuid/v4");

export default (state = { byId: {}, allIds: [] }, action) => {
  const { type, error } = action;

  if (type === "RESET_ERROR_MESSAGE") {
    const { byId, allIds } = state;
    const { id } = action;
    const { [id]: removed, ...rest } = byId;
    return {
      byId: rest,
      allIds: allIds.filter(x => x !== id)
    };
  } else if (error) {
    const id = uuidv4();
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [id]: { id: id, message: error } },
      allIds: allIds.concat(id)
    };
  } else {
    return state;
  }
};

export const getErrors = state =>
  state.errors.allIds.map(id => state.errors.byId[id]);
