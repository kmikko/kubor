import { combineReducers } from "redux";

const addUsage = (state, action, type) => {
  const { values, namespace, start, end } = action;
  const id = `${namespace}-${type}-${start}-${end}`;

  return {
    ...state,
    [id]: { id: id, type: type, values: values, namespace: namespace }
  };
};

const addNamespaceUsage = (state, action, type) => {
  const { namespace, start, end } = action;
  const id = `${namespace}-${type}-${start}-${end}`;
  return {
    ...state,
    [namespace]: [
      ...((state[namespace] || []).includes(id)
        ? state[namespace]
        : (state[namespace] || []).concat(id))
    ]
  };
};

const addMonthlyUsage = (state, action, type) => {
  const { namespace, start, end } = action;
  const id = `${namespace}-${type}-${start}-${end}`;

  return {
    ...state,
    [`${start}-${end}`]: [
      ...((state[`${start}-${end}`] || []).includes(id)
        ? state[`${start}-${end}`]
        : (state[`${start}-${end}`] || []).concat(id))
    ]
  };
};

const usageById = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_CPU_USAGE_SUCCESS":
      return addUsage(state, action, "cpu");
    case "FETCH_MEMORY_USAGE_SUCCESS":
      return addUsage(state, action, "memory");
    case "FETCH_NETWORK_USAGE_SUCCESS":
      return addUsage(state, action, "network");
    case "FETCH_STORAGE_USAGE_SUCCESS":
      return addUsage(state, action, "storage");
    default:
      return state;
  }
};

const usageByNamespace = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_CPU_USAGE_SUCCESS":
      return addNamespaceUsage(state, action, "cpu");
    case "FETCH_MEMORY_USAGE_SUCCESS":
      return addNamespaceUsage(state, action, "memory");
    case "FETCH_NETWORK_USAGE_SUCCESS":
      return addNamespaceUsage(state, action, "network");
    case "FETCH_STORAGE_USAGE_SUCCESS":
      return addNamespaceUsage(state, action, "storage");
    default:
      return state;
  }
};

const usageByMonth = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_CPU_USAGE_SUCCESS":
      return addMonthlyUsage(state, action, "cpu");
    case "FETCH_MEMORY_USAGE_SUCCESS":
      return addMonthlyUsage(state, action, "memory");
    case "FETCH_NETWORK_USAGE_SUCCESS":
      return addMonthlyUsage(state, action, "network");
    case "FETCH_STORAGE_USAGE_SUCCESS":
      return addMonthlyUsage(state, action, "storage");
    default:
      return state;
  }
};

/*
const usage = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CPU_USAGE_SUCCESS":
      // TODO: Don't do like this, use combineReduces so you don't have to pass state.cpu etc
      return {
        ...state,
        byId: addUsage(state.byId, action, "cpu"),
        byNamespace: addNamespaceUsage(state.byNamespace, action, "cpu")
      };
    case "FETCH_MEMORY_USAGE_SUCCESS":
      return {
        ...state,
        byId: addUsage(state.byId, action, "memory"),
        byNamespace: addNamespaceUsage(state.byNamespace, action, "memory")
      };
    case "FETCH_NETWORK_USAGE_SUCCESS":
      return {
        ...state,
        byId: addUsage(state.byId, action, "network"),
        byNamespace: addNamespaceUsage(state.byNamespace, action, "network")
      };
    case "FETCH_STORAGE_USAGE_SUCCESS":
      return {
        ...state,
        byId: addUsage(state.byId, action, "storage"),
        byNamespace: addNamespaceUsage(state.byNamespace, action, "storage")
      };
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
};
*/

const usageReducer = combineReducers({
  byId: usageById,
  byNamespace: usageByNamespace,
  byMonth: usageByMonth
});

export default usageReducer;
