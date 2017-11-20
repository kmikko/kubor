const initialState = {
  costs: []
};

export default function cluster(state = initialState, action) {
  switch (action.type) {
    case "FETCH_CLUSTER_COSTS_SUCCESS":
      return { ...state, costs: action.response };
    case "FETCH_CLUSTER_COSTS_REQUEST":
    case "FETCH_CLUSTER_COSTS_FAILURE":
    default:
      return state;
  }
}
