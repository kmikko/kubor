const initialState = {
  cpu: [],
  memory: [],
  network: [],
  storage: []
};

export default function usage(state = initialState, action) {
  switch (action.type) {
    case "FETCH_CPU_USAGE_SUCCESS":
      return { ...state, cpu: action.response };
    case "FETCH_MEMORY_USAGE_SUCCESS":
      return { ...state, memory: action.response };
    case "FETCH_NETWORK_USAGE_SUCCESS":
      return { ...state, network: action.response };
    case "FETCH_STORAGE_USAGE_SUCCESS":
      return { ...state, storage: action.response };
    case "FETCH_STORAGE_USAGE_REQUEST":
    case "FETCH_STORAGE_USAGE_FAILURE":
    case "FETCH_NETWORK_USAGE_REQUEST":
    case "FETCH_NETWORK_USAGE_FAILURE":
    case "FETCH_MEMORY_USAGE_REQUEST":
    case "FETCH_MEMORY_USAGE_FAILURE":
    case "FETCH_CPU_USAGE_REQUEST":
    case "FETCH_CPU_USAGE_FAILURE":
    default:
      return state;
  }
}
