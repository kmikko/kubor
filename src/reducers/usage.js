const initialState = {
  cpu: [],
  network: []
};

export default function usage(state = initialState, action) {
  switch (action.type) {
    case "FETCH_CPU_USAGE_SUCCESS":
      return Object.assign({}, state, { cpu: action.response });
    case "FETCH_NETWORK_USAGE_SUCCESS":
      return Object.assign({}, state, { network: action.response });
    case "FETCH_NETWORK_USAGE_FAILURE":
    case "FETCH_CPU_USAGE_FAILURE":
    default:
      return state;
  }
}
