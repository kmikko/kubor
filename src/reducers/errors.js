const uuidv4 = require("uuid/v4");

export default (state = { errors: {}, byId: [] }, action) => {
  const { type, error } = action;

  if (type === "RESET_ERROR_MESSAGE") {
    const { errors, byId } = state;
    const { id } = action;
    const { [id]: removed, ...rest } = errors;
    return {
      errors: rest,
      byId: byId.filter(x => x !== id)
    };
  } else if (error) {
    const id = uuidv4();
    const { errors, byId } = state;
    return {
      errors: { ...errors, [id]: { id: id, message: error } },
      byId: byId.concat(id)
    };
  } else {
    return state;
  }
};

export const getErrors = state =>
  state.errors.byId.map(id => state.errors.errors[id]);
