const initialState = {
  cpu: [],
  memory: [],
  network: [],
  storage: []
};

export default function total(state = initialState, action) {
  switch (action.type) {
    case "FETCH_CPU_TOTAL_SUCCESS":
      return { ...state, cpu: action.response };
    case "FETCH_MEMORY_TOTAL_SUCCESS":
      return { ...state, memory: action.response };
    case "FETCH_NETWORK_TOTAL_SUCCESS":
      return { ...state, network: action.response };
    case "FETCH_STORAGE_TOTAL_SUCCESS":
      return { ...state, storage: action.response };
    case "FETCH_STORAGE_TOTAL_REQUEST":
    case "FETCH_STORAGE_TOTAL_FAILURE":
    case "FETCH_NETWORK_TOTAL_REQUEST":
    case "FETCH_NETWORK_TOTAL_FAILURE":
    case "FETCH_MEMORY_TOTAL_REQUEST":
    case "FETCH_MEMORY_TOTAL_FAILURE":
    case "FETCH_CPU_TOTAL_REQUEST":
    case "FETCH_CPU_TOTAL_FAILURE":
    default:
      return state;
  }
}
