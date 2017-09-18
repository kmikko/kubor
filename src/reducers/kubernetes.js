const initialState = {
  namespaces: []
};

export default function kubernetes(state = initialState, action) {
  switch (action.type) {
    case "FETCH_KUBERNETES_NAMESPACES_SUCCESS":
      return Object.assign(...state, { namespaces: action.response });
    case "FETCH_KUBERNETES_NAMESPACES_FAILURE":
    default:
      return state;
  }
}
