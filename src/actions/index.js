/*
import { normalize } from "normalizr";
import * as schema from "./schema";
import * as api from "../api";
import { getIsFetching } from "../reducers";
*/

const API_URL = process.env.REACT_APP_API_URL || "/api/v1";
//process.env.REACT_APP_GRAFANA_URL ||
//"http://prometheus-prometheus-server.default.svc.cluster.local";

export const changeTimeIntervalFilter = (startDate, endDate) => dispatch => {
  return dispatch({
    type: "TIME_INTERVAL_FILTER_CHANGE",
    payload: {
      startDate: startDate,
      endDate: endDate
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

  return fetch(`${API_URL}/cluster/costs?year=${year}&month=${month}`)
    .then(response => response.json())
    .then(data => data)
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

  return fetch(
    `${API_URL}/proxy/grafana/api/v1/query_range?query=sum%20(rate%20(container_cpu_usage_seconds_total%7Bnamespace%3D%22${namespace}%22%7D%5B1m%5D%20)%20OR%20on()%20vector(0))&start=${start}&end=${end}&step=${step}`
  )
    .then(response => response.json())
    .then(data => data["data"]["result"][0]["values"])
    .then(data => data.map(x => [x[0], parseFloat(x[1])]))
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

  return fetch(
    `${API_URL}/proxy/grafana/api/v1/query_range?query=sum(machine_cpu_cores%20OR%20on()%20vector(0))%20&start=${start}&end=${end}&step=${step}`
  )
    .then(response => response.json())
    .then(data => data["data"]["result"][0]["values"])
    .then(data => data.map(x => [x[0], parseFloat(x[1])]))
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

  return fetch(
    `${API_URL}/proxy/grafana/api/v1/query_range?query=sum(container_memory_usage_bytes%7Bnamespace%3D%22${namespace}%22%7D%20OR%20on()%20vector(0))&start=${start}&end=${end}&step=${step}`
  )
    .then(response => response.json())
    .then(data => data["data"]["result"][0]["values"])
    .then(data => data.map(x => [x[0], parseFloat(x[1])]))
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

  return fetch(
    `${API_URL}/proxy/grafana/api/v1/query_range?query=sum(machine_memory_bytes%20OR%20on()%20vector(0))&start=${start}&end=${end}&step=${step}`
  )
    .then(response => response.json())
    .then(data => data["data"]["result"][0]["values"])
    .then(data => data.map(x => [x[0], parseFloat(x[1])]))
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

  return fetch(
    `${API_URL}/proxy/grafana/api/v1/query_range?query=sum(container_network_transmit_bytes_total%7Bnamespace%3D%22${namespace}%22%7D%20OR%20on()%20vector(0))&start=${start -
      step}&end=${end}&step=${step}`
  )
    .then(response => response.json())
    .then(data => data["data"]["result"][0]["values"])
    .then(data => data.map(x => [x[0], parseFloat(x[1])]))
    .then(data =>
      data
        .reduce((prev, currVal, currIdx) => [
          ...prev,
          [
            data[currIdx][0],
            data[currIdx][1] === 0 || data[currIdx - 1][1] === 0
              ? 0
              : data[currIdx][1] - data[currIdx - 1][1]
          ]
        ])
        .slice(2)
    )
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

  return fetch(
    `${API_URL}/proxy/grafana/api/v1/query_range?query=sum(container_network_transmit_bytes_total%20OR%20on()%20vector(0))&start=${start -
      step}&end=${end}&step=${step}`
  )
    .then(response => response.json())
    .then(data => data["data"]["result"][0]["values"])
    .then(data => data.map(x => [x[0], parseFloat(x[1])]))
    .then(data =>
      data
        .reduce((prev, currVal, currIdx) => [
          ...prev,
          [
            data[currIdx][0],
            data[currIdx][1] === 0 || data[currIdx - 1][1] === 0
              ? 0
              : data[currIdx][1] - data[currIdx - 1][1]
          ]
        ])
        .slice(2)
    )
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

  return fetch(
    `${API_URL}/proxy/grafana/api/v1/query_range?query=sum(container_fs_usage_bytes%7Bnamespace%3D%22${namespace}%22%7D)%20OR%20on()%20vector(0)&start=${start}&end=${end}&step=${step}`
  )
    .then(response => response.json())
    .then(data => data["data"]["result"][0]["values"])
    .then(data => data.map(x => [x[0], parseFloat(x[1])]))
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

  return fetch(
    `${API_URL}/proxy/grafana/api/v1/query_range?query=sum(container_fs_usage_bytes)%20OR%20on()%20vector(0)&start=${start}&end=${end}&step=${step}`
  )
    .then(response => response.json())
    .then(data => data["data"]["result"][0]["values"])
    .then(data => data.map(x => [x[0], parseFloat(x[1])]))
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

  return fetch(`${API_URL}/proxy/grafana/api/v1/query?query=kube_pod_info`)
    .then(response => response.json())
    .then(data =>
      Array.from(
        new Set(
          data["data"]["result"].map(result => result["metric"]["namespace"])
        )
      )
    )
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
