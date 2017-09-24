const initialState = {
  costs: [
    { type: 'cpu', cost: 0 },
    { type: 'memory', cost: 0 },
    { type: 'storage', cost: 0 },
    { type: 'network', cost: 0 }
  ]
};

export default function cluster(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_CLUSTER_COSTS_SUCCESS':
      return { ...state, costs: action.response };
    case 'FETCH_CLUSTER_COSTS_REQUEST':
    case 'FETCH_CLUSTER_COSTS_FAILURE':
    default:
      return state;
  }
}
