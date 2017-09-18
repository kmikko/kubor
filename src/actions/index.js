/*
import { normalize } from "normalizr";
import * as schema from "./schema";
import * as api from "../api";
import { getIsFetching } from "../reducers";
*/

export const fetchCpuUsage = () => dispatch => {
  dispatch({
    type: "FETCH_CPU_USAGE_REQUEST"
  });

  return fetch(
    "http://monitoring-grafana.kube-system/api/datasources/proxy/1/query?db=k8s&q=SELECT%20sum(%22value%22)%20FROM%20%22cpu%2Fusage_rate%22%20WHERE%20%22type%22%20%3D%20%27node%27%20AND%20time%20%3E%20now()%20-%2030m%20GROUP%20BY%20time(1m)%2C%20%22nodename%22%20fill(null)%0A%3BSELECT%20sum(%22value%22)%20FROM%20%22cpu%2Flimit%22%20WHERE%20%22type%22%20%3D%20%27node%27%20AND%20time%20%3E%20now()%20-%2030m%20GROUP%20BY%20time(1m)%2C%20%22nodename%22%20fill(null)%0A%3BSELECT%20sum(%22value%22)%20FROM%20%22cpu%2Frequest%22%20WHERE%20%22type%22%20%3D%20%27node%27%20AND%20time%20%3E%20now()%20-%2030m%20GROUP%20BY%20time(1m)%2C%20%22nodename%22%20fill(null)&epoch=ms"
  )
    .then(response => response.json())
    .then(data => data.results)
    .then(data => data.map(result => result.series || []))
    .then(data => [].concat.apply([], data))
    .then(data =>
      data.map(serie => ({
        name: serie.name,
        values: serie.values
      }))
    )
    .then(
      data => {
        dispatch({
          type: "FETCH_CPU_USAGE_SUCCESS",
          response: data
        });
      },
      error => {
        dispatch({
          type: "FETCH_CPU_USAGE_FAILURE",
          message: "Something went wrong"
        });
      }
    );
};

export const fetchNetworkUsage = () => dispatch => {
  dispatch({
    type: "FETCH_NETWORK_USAGE_REQUEST"
  });

  return fetch(
    "http://monitoring-grafana.kube-system/api/datasources/proxy/1/query?db=k8s&q=%3BSELECT%20sum(%22value%22)%20FROM%20%22network%2Ftx_rate%22%20WHERE%20time%20%3E%20now()%20-%2030m%20GROUP%20BY%20time(1m)%20fill(null)&epoch=ms"
  )
    .then(response => response.json())
    .then(data => data.results)
    .then(data => data.map(result => result.series || []))
    .then(data => [].concat.apply([], data))
    .then(data =>
      data.map(serie => ({
        name: serie.name,
        values: serie.values
      }))
    )
    .then(
      data => {
        dispatch({
          type: "FETCH_NETWORK_USAGE_SUCCESS",
          response: data
        });
      },
      error => {
        dispatch({
          type: "FETCH_NETWORK_USAGE_FAILURE",
          message: "Something went wrong"
        });
      }
    );
};

export const fetchKubernetesNamespaces = () => dispatch => {
  dispatch({
    type: "FETCH_KUBERNETES_NAMESPACES_REQUEST"
  });

  return fetch(
    "http://monitoring-grafana.kube-system/api/datasources/proxy/1/query?db=k8s&q=SHOW%20TAG%20VALUES%20FROM%20%22uptime%22%20WITH%20KEY%20%3D%20%22namespace_name%22&epoch=ms"
  )
    .then(response => response.json())
    .then(data => data.results[0]["series"][0]["values"].map(v => v[1]))
    .then(
      data => {
        dispatch({
          type: "FETCH_KUBERNETES_NAMESPACES_SUCCESS",
          response: data
        });
      },
      error => {
        dispatch({
          type: "FETCH_KUBERNETES_NAMESPACES_FAILURE",
          message: "Something went wrong"
        });
      }
    );
};

export const fetchHistoricalMemoryUsage = (
  start,
  end,
  namespace = "default"
) => dispatch => {
  dispatch({
    type: "FETCH_HISTORICAL_MEMORY_USAGE_REQUEST"
  });

  return fetch(
    `http://monitoring-grafana.kube-system/api/datasources/proxy/1/query?db=k8s&q=SELECT%20mean(%22value%22)%20FROM%20%22memory%2Fusage%22%20WHERE%20%22namespace_name%22%20%3D%20%27${namespace}%27%20AND%20time%20%3E%20${start}ms%20and%20time%20%3C%20${end}ms%20GROUP%20BY%20time(1h)%20fill(none)&epoch=ms`
  )
    .then(response => response.json())
    .then(data => data.results[0]["series"][0]["values"])
    .then(
      data => {
        dispatch({
          type: "FETCH_HISTORICAL_MEMORY_USAGE_SUCCESS",
          response: data
        });
      },
      error => {
        dispatch({
          type: "FETCH_HISTORICAL_MEMORY_USAGE_FAILURE",
          message: "Something went wrong"
        });
      }
    );
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
