import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import counter from "./counter";
import usage from "./usage";
import kubernetes from "./kubernetes";
import historical from "./historical";
import total from "./total";
import cluster from "./cluster";
import errors from "./errors";
import ui from "./ui";

export default combineReducers({
  router: routerReducer,
  counter,
  usage,
  kubernetes,
  historical,
  total,
  cluster,
  errors,
  ui
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

export const getTimeInterval = state => {
  return { startDate: state.ui.startDate, endDate: state.ui.endDate };
};

export const getClusterCosts = state => {
  return state.cluster.costs;
};

export const getClusterNamespaces = state => {
  return state.kubernetes.namespaces;
};

export const getResourceUsageByNamespace = state => {
  let { startDate, endDate } = getTimeInterval(state);
  startDate = startDate.getTime() / 1000;
  endDate = endDate.getTime() / 1000;

  const namespaces = getClusterNamespaces(state);

  return namespaces.map(n => {
    const monthlyUsage = state.usage.byMonth[`${startDate}-${endDate}`] || [];

    const usage = (state.usage.byNamespace[n] || [])
      .map(u => state.usage.byId[u])
      .filter(u => monthlyUsage.includes(u.id));

    return {
      namespace: n,
      usage: {
        cpu: usage.filter(u => u.type === "cpu").map(x => x.values)[0] || [],
        memory:
          usage.filter(u => u.type === "memory").map(x => x.values)[0] || [],
        storage:
          usage.filter(u => u.type === "storage").map(x => x.values)[0] || [],
        network:
          usage.filter(u => u.type === "network").map(x => x.values)[0] || []
      },
      total: getClusterResourceUsage(state)
    };
  });
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
