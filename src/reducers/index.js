import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import counter from "./counter";
import usage from "./usage";
import kubernetes from "./kubernetes";
import historical from "./historical";
import total from "./total";
import cluster from "./cluster";

export default combineReducers({
  router: routerReducer,
  counter,
  usage,
  kubernetes,
  historical,
  total,
  cluster
});

export const makeIncrement = () => dispatch => {
  dispatch({
    type: "counter/INCREMENT_REQUESTED"
  });

  setTimeout(() => {
    dispatch({
      type: "counter/INCREMENT"
    });
  }, 3000);
};

export const getCpuUsage = (state, namespace) => {
  return state.usage.cpu[namespace] || [];
};

export const getMemoryUsage = (state, namespace) => {
  return state.usage.memory[namespace] || [];
};

export const getStorageUsage = (state, namespace) => {
  return state.usage.storage[namespace] || [];
};

export const getNetworkUsage = (state, namespace) => {
  return state.usage.network[namespace] || [];
};

export const getCpuTotalUsage = state => {
  return state.total.cpu;
};

export const getMemoryTotalUsage = state => {
  return state.total.memory;
};

export const getStorageTotalUsage = state => {
  return state.total.storage;
};

export const getNetworkTotalUsage = state => {
  return state.total.network;
};

export const getClusterCosts = state => {
  return state.cluster.costs;
};

export const getClusterNamespaces = state => {
  return state.kubernetes.namespaces;
};

export const getResourceUsageByNamespace = state => {
  const namespaces = getClusterNamespaces(state);
  return namespaces.map(n => ({
    namespace: n,
    usage: {
      cpu: state.usage.cpu[n] || [],
      memory: state.usage.memory[n] || [],
      storage: state.usage.storage[n] || [],
      network: state.usage.network[n] || []
    },
    total: getClusterResourceUsage(state)
  }));
};

const getClusterResourceUsage = state => ({
  cpu: state.total.cpu,
  memory: state.total.memory,
  storage: state.total.storage,
  network: state.total.network
});

/*
import byId, * as fromById from "./byId";
import createList, * as fromList from "./createList";

const listByFilter = combineReducers({
  all: createList("all"),
  active: createList("active"),
  completed: createList("completed")
});

const todos = combineReducers({
  byId,
  listByFilter
});

// TOOD: Name this to rootReducer, not necessary but makes more sense
export default todos;

export const getVisibleTodos = (state, filter) => {
  const ids = fromList.getIds(state.listByFilter[filter]);
  return ids.map(id => fromById.getTodo(state.byId, id));
};

export const getIsFetching = (state, filter) =>
  fromList.getIsFetching(state.listByFilter[filter]);

export const getErrorMessage = (state, filter) =>
  fromList.getErrorMessage(state.listByFilter[filter]);
*/
