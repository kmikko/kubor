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
    "http://monitoring-grafana.kube-system/api/datasources/proxy/1/query?epoch=ms&q=SELECT+sum(%22value%22)+FROM+%22cpu%2Fusage_rate%22+WHERE+%22type%22+%3D+%27node%27+AND+time+%3E+now()+-+30m+GROUP+BY+time(1m),+%22nodename%22+fill(null)%0ASELECT+sum(%22value%22)+FROM+%22cpu%2Flimit%22+WHERE+%22type%22+%3D+%27node%27+AND+time+%3E+now()+-+30m+GROUP+BY+time(1m),+%22nodename%22+fill(null)%0ASELECT+sum(%22value%22)+FROM+%22cpu%2Frequest%22+WHERE+%22type%22+%3D+%27node%27+AND+time+%3E+now()+-+30m+GROUP+BY+time(1m),+%22nodename%22+fill(null)"
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
    "http://monitoring-grafana.kube-system/api/datasources/proxy/1/query?epoch=ms&q=SELECT%20sum%28%22value%22%29%20FROM%20%22network%2Ftx_rate%22%20WHERE%20%22type%22%20%3D%20%27pod%27%20AND%20time%20%3E%20now%28%29%20-%2030m%20GROUP%20BY%20time%281m%29%20fill%28null%29%0D%0ASELECT%20sum%28%22value%22%29%20FROM%20%22network%2Frx_rate%22%20WHERE%20%22type%22%20%3D%20%27pod%27%20AND%20time%20%3E%20now%28%29%20-%2030m%20GROUP%20BY%20time%281m%29%20fill%28null%29"
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
