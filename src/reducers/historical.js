const initialState = {
  memory: [],
  cpu: [],
  network: [],
  disk: []
};

export default function historical(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_HISTORICAL_MEMORY_USAGE_SUCCESS':
      return { ...state, memory: action.response };
    case 'FETCH_HISTORICAL_CPU_USAGE_SUCCESS':
      return { ...state, cpu: action.response };
    case 'FETCH_HISTORICAL_NETWORK_USAGE_SUCCESS':
      return { ...state, network: action.response };
    case 'FETCH_HISTORICAL_DISK_USAGE_SUCCESS':
      return { ...state, disk: action.response };

    case 'FETCH_HISTORICAL_DISK_USAGE_REQUEST':
    case 'FETCH_HISTORICAL_DISK_USAGE_FAILURE':
    case 'FETCH_HISTORICAL_NETWORK_USAGE_REQUEST':
    case 'FETCH_HISTORICAL_NETWORK_USAGE_FAILURE':
    case 'FETCH_HISTORICAL_CPU_USAGE_REQUEST':
    case 'FETCH_HISTORICAL_CPU_USAGE_FAILURE':
    case 'FETCH_HISTORICAL_MEMORY_USAGE_REQUEST':
    case 'FETCH_HISTORICAL_MEMORY_USAGE_FAILURE':
    default:
      return state;
  }
}
