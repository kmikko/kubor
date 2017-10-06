/*
import { normalize } from "normalizr";
import * as schema from "./schema";
import * as api from "../api";
import { getIsFetching } from "../reducers";
*/

import * as api from "../utils/api";

export const changeTimeIntervalFilter = (startDate, endDate) => dispatch => {
  return dispatch({
    type: "TIME_INTERVAL_FILTER_CHANGE",
    payload: {
      startDate: startDate,
      endDate: endDate
    }
  });
};

export const changeResourceFilter = (resource, checked) => dispatch => {
  return dispatch({
    type: "RESOURCE_FILTER_CHANGE",
    payload: {
      resource: resource,
      checked: checked
    }
  });
};

export const hideError = id => dispatch => {
  return dispatch({
    type: "RESET_ERROR_MESSAGE",
    id: id
  });
};

export const fetchClusterCosts = (
  year = new Date().getFullYear(),
  month = new Date().getMonth() + 1
) => dispatch => {
  dispatch({
    type: "FETCH_CLUSTER_COSTS_REQUEST"
  });

  return api
    .fetchClusterCosts(year, month)
    .then(data => {
      dispatch({
        type: "FETCH_CLUSTER_COSTS_SUCCESS",
        response: data
      });
    })
    .catch(error => {
      dispatch({
        type: "FETCH_CLUSTER_COSTS_FAILURE",
        error: error.message || "Something went wrong"
      });
    });
};

export const fetchCpuUsage = (
  start,
  end,
  step = 3600,
  namespace = "default"
) => dispatch => {
  dispatch({
    type: "FETCH_CPU_USAGE_REQUEST"
  });

  return api
    .fetchCpuUsage(start, end, step, namespace)
    .then(data => {
      dispatch({
        type: "FETCH_CPU_USAGE_SUCCESS",
        start: start,
        end: end,
        namespace: namespace,
        values: data
      });
    })
    .catch(error => {
      dispatch({
        type: "FETCH_CPU_USAGE_FAILURE",
        error: error.message || "Something went wrong"
      });
    });
};

export const fetchCpuTotal = (start, end, step = 3600) => dispatch => {
  dispatch({
    type: "FETCH_CPU_TOTAL_REQUEST"
  });

  return api
    .fetchCpuTotal(start, end, step)
    .then(data => {
      dispatch({
        type: "FETCH_CPU_TOTAL_SUCCESS",
        response: data
      });
    })
    .catch(error => {
      dispatch({
        type: "FETCH_CPU_TOTAL_FAILURE",
        error: error.message || "Something went wrong"
      });
    });
};

export const fetchMemoryUsage = (
  start,
  end,
  step = 3600,
  namespace = "default"
) => dispatch => {
  dispatch({
    type: "FETCH_MEMORY_USAGE_REQUEST"
  });

  return api
    .fetchMemoryUsage(start, end, step, namespace)
    .then(data => {
      dispatch({
        type: "FETCH_MEMORY_USAGE_SUCCESS",
        start: start,
        end: end,
        namespace: namespace,
        values: data
      });
    })
    .catch(error => {
      dispatch({
        type: "FETCH_MEMORY_USAGE_FAILURE",
        error: error.message || "Something went wrong"
      });
    });
};

export const fetchMemoryTotal = (start, end, step = 3600) => dispatch => {
  dispatch({
    type: "FETCH_MEMORY_TOTAL_REQUEST"
  });

  return api
    .fetchMemoryTotal(start, end, step)
    .then(data => {
      dispatch({
        type: "FETCH_MEMORY_TOTAL_SUCCESS",
        response: data
      });
    })
    .catch(error => {
      dispatch({
        type: "FETCH_MEMORY_TOTAL_FAILURE",
        error: error.message || "Something went wrong"
      });
    });
};

export const fetchNetworkUsage = (
  start,
  end,
  step = 3600,
  namespace = "default"
) => dispatch => {
  dispatch({
    type: "FETCH_NETWORK_USAGE_REQUEST"
  });

  return api
    .fetchNetworkUsage(start, end, step, namespace)
    .then(data => {
      dispatch({
        type: "FETCH_NETWORK_USAGE_SUCCESS",
        start: start,
        end: end,
        namespace: namespace,
        values: data
      });
    })
    .catch(error => {
      dispatch({
        type: "FETCH_NETWORK_USAGE_FAILURE",
        error: error.message || "Something went wrong"
      });
    });
};

export const fetchNetworkTotal = (start, end, step = 3600) => dispatch => {
  dispatch({
    type: "FETCH_NETWORK_TOTAL_REQUEST"
  });

  return api
    .fetchNetworkTotal(start, end, step)
    .then(data => {
      dispatch({
        type: "FETCH_NETWORK_TOTAL_SUCCESS",
        response: data
      });
    })
    .catch(error => {
      dispatch({
        type: "FETCH_NETWORK_TOTAL_FAILURE",
        error: error.message || "Something went wrong"
      });
    });
};

export const fetchStorageUsage = (
  start,
  end,
  step = 3600,
  namespace = "default"
) => dispatch => {
  dispatch({
    type: "FETCH_STORAGE_USAGE_REQUEST"
  });

  return api
    .fetchStorageUsage(start, end, step, namespace)
    .then(data => {
      dispatch({
        type: "FETCH_STORAGE_USAGE_SUCCESS",
        start: start,
        end: end,
        namespace: namespace,
        values: data
      });
    })
    .catch(error => {
      dispatch({
        type: "FETCH_STORAGE_USAGE_FAILURE",
        error: error.message || "Something went wrong"
      });
    });
};

export const fetchStorageTotal = (start, end, step = 3600) => dispatch => {
  dispatch({
    type: "FETCH_STORAGE_TOTAL_REQUEST"
  });

  return api
    .fetchStorageTotal(start, end, step)
    .then(data => {
      dispatch({
        type: "FETCH_STORAGE_TOTAL_SUCCESS",
        response: data
      });
    })
    .catch(error => {
      dispatch({
        type: "FETCH_STORAGE_TOTAL_FAILURE",
        error: error.message || "Something went wrong"
      });
    });
};

export const fetchKubernetesNamespaces = () => dispatch => {
  dispatch({
    type: "FETCH_KUBERNETES_NAMESPACES_REQUEST"
  });

  return api
    .fetchKubernetesNamespaces()
    .then(data => {
      dispatch({
        type: "FETCH_KUBERNETES_NAMESPACES_SUCCESS",
        response: data
      });
    })
    .catch(error => {
      dispatch({
        type: "FETCH_KUBERNETES_NAMESPACES_FAILURE",
        error: error.message || "Something went wrong"
      });
    });
};

/*
export const fetchTodos = filter => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }

  dispatch({
    type: "FETCH_TODOS_REQUEST",
    filter
  });

  return api.fetchTodos(filter).then(
    response => {
      dispatch({
        type: "FETCH_TODOS_SUCCESS",
        filter,
        response: normalize(response, schema.arrayOfTodos)
      });
    },
    error => {
      dispatch({
        type: "FETCH_TODOS_FAILURE",
        filter,
        message: error.message || "Something went wrong."
      });
    }
  );
};

export const addTodo = text => dispatch =>
  api.addTodo(text).then(response => {
    dispatch({
      type: "ADD_TODO_SUCCESS",
      response: normalize(response, schema.todo)
    });
  });

export const toggleTodo = id => dispatch =>
  api.toggleTodo(id).then(response => {
    dispatch({
      type: "TOGGLE_TODO_SUCCESS",
      response: normalize(response, schema.todo)
    });
  });
*/
