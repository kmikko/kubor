const fetch = require("node-fetch");

const API_ROOT = "http://localhost:3000/api/v1";

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

const fetchKubernetesNamespaces = () => {
  return fetch(`${API_ROOT}/proxy/prometheus/api/v1/query?query=kube_pod_info`)
    .then(handleErrors)
    .then(response => response.json())
    .then(data =>
      Array.from(
        new Set(
          data["data"]["result"].map(result => result["metric"]["namespace"])
        )
      )
    )
    .then(data => Promise.resolve(data))
    .catch(error => Promise.reject(error));
};

const fetchCpuUsage = (start, end, step, namespace) => {
  return fetch(
    `${API_ROOT}/proxy/prometheus/api/v1/query_range?query=sum%20(rate%20(container_cpu_usage_seconds_total%7Bnamespace%3D%22${namespace}%22%7D%5B1m%5D%20)%20OR%20on()%20vector(0))&start=${start}&end=${end}&step=${step}`
  )
    .then(handleErrors)
    .then(response => response.json())
    .then(data => data["data"]["result"][0]["values"])
    .then(data =>
      data.map(x => ({
        timestamp: x[0],
        value: parseFloat(x[1]),
        namespace: namespace,
        type: "cpu"
      }))
    )
    .then(data => Promise.resolve(data))
    .catch(error => Promise.reject(error));
};

const fetchCpuTotal = (start, end, step) => {
  return fetch(
    `${API_ROOT}/proxy/prometheus/api/v1/query_range?query=sum(machine_cpu_cores%20OR%20on()%20vector(0))%20&start=${start}&end=${end}&step=${step}`
  )
    .then(handleErrors)
    .then(response => response.json())
    .then(data => data["data"]["result"][0]["values"])
    .then(data =>
      data.map(x => ({
        timestamp: x[0],
        value: parseFloat(x[1]),
        namespace: "__TOTAL__",
        type: "cpu"
      }))
    )
    .then(data => Promise.resolve(data))
    .catch(error => Promise.reject(error));
};

const fetchMemoryUsage = (start, end, step, namespace) => {
  return fetch(
    `${API_ROOT}/proxy/prometheus/api/v1/query_range?query=sum(container_memory_usage_bytes%7Bnamespace%3D%22${namespace}%22%7D%20OR%20on()%20vector(0))&start=${start}&end=${end}&step=${step}`
  )
    .then(handleErrors)
    .then(response => response.json())
    .then(data => data["data"]["result"][0]["values"])
    .then(data =>
      data.map(x => ({
        timestamp: x[0],
        value: parseFloat(x[1]),
        namespace: namespace,
        type: "memory"
      }))
    )
    .then(data => Promise.resolve(data))
    .catch(error => Promise.reject(error));
};

const fetchMemoryTotal = (start, end, step) => {
  return fetch(
    `${API_ROOT}/proxy/prometheus/api/v1/query_range?query=sum(machine_memory_bytes%20OR%20on()%20vector(0))&start=${start}&end=${end}&step=${step}`
  )
    .then(handleErrors)
    .then(response => response.json())
    .then(data => data["data"]["result"][0]["values"])
    .then(data =>
      data.map(x => ({
        timestamp: x[0],
        value: parseFloat(x[1]),
        namespace: "__TOTAL__",
        type: "memory"
      }))
    )
    .then(data => Promise.resolve(data))
    .catch(error => Promise.reject(error));
};

const fetchNetworkUsage = (start, end, step, namespace) => {
  return fetch(
    `${API_ROOT}/proxy/prometheus/api/v1/query_range?query=sum(container_network_transmit_bytes_total%7Bnamespace%3D%22${namespace}%22%7D%20OR%20on()%20vector(0))&start=${start -
      step}&end=${end}&step=${step}`
  )
    .then(handleErrors)
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
    .then(data =>
      data.map(x => ({
        timestamp: x[0],
        value: parseFloat(x[1]),
        namespace: namespace,
        type: "network"
      }))
    )
    .then(data => Promise.resolve(data))
    .catch(error => Promise.reject(error));
};

const fetchNetworkTotal = (start, end, step) => {
  return fetch(
    `${API_ROOT}/proxy/prometheus/api/v1/query_range?query=sum(container_network_transmit_bytes_total%20OR%20on()%20vector(0))&start=${start -
      step}&end=${end}&step=${step}`
  )
    .then(handleErrors)
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
    .then(data =>
      data.map(x => ({
        timestamp: x[0],
        value: parseFloat(x[1]),
        namespace: "__TOTAL__",
        type: "network"
      }))
    )
    .then(data => Promise.resolve(data))
    .catch(error => Promise.reject(error));
};

const fetchStorageUsage = (start, end, step, namespace) => {
  return fetch(
    `${API_ROOT}/proxy/prometheus/api/v1/query_range?query=sum(container_fs_usage_bytes%7Bnamespace%3D%22${namespace}%22%7D)%20OR%20on()%20vector(0)&start=${start}&end=${end}&step=${step}`
  )
    .then(handleErrors)
    .then(response => response.json())
    .then(data => data["data"]["result"][0]["values"])
    .then(data =>
      data.map(x => ({
        timestamp: x[0],
        value: parseFloat(x[1]),
        namespace: namespace,
        type: "storage"
      }))
    )
    .then(data => Promise.resolve(data))
    .catch(error => Promise.reject(error));
};

const fetchStorageTotal = (start, end, step) => {
  return fetch(
    `${API_ROOT}/proxy/prometheus/api/v1/query_range?query=sum(container_fs_usage_bytes)%20OR%20on()%20vector(0)&start=${start}&end=${end}&step=${step}`
  )
    .then(handleErrors)
    .then(response => response.json())
    .then(data => data["data"]["result"][0]["values"])
    .then(data =>
      data.map(x => ({
        timestamp: x[0],
        value: parseFloat(x[1]),
        namespace: "__TOTAL__",
        type: "storage"
      }))
    )
    .then(data => Promise.resolve(data))
    .catch(error => Promise.reject(error));
};

const fetchNamespaceUsage = (startDate, endDate, step) => {
  return fetchKubernetesNamespaces().then(namespaces =>
    Promise.all(
      namespaces.map(namespace => {
        return Promise.all([
          fetchCpuUsage(startDate, endDate, step, namespace).then(data => data),
          fetchMemoryUsage(startDate, endDate, step, namespace).then(
            data => data
          ),
          fetchNetworkUsage(startDate, endDate, step, namespace).then(
            data => data
          ),
          fetchStorageUsage(startDate, endDate, step, namespace).then(
            data => data
          )
        ]).then(data => data.reduce((acc, curr) => acc.concat(curr), []));
      })
    ).then(data => data.reduce((acc, curr) => acc.concat(curr), []))
  );
};

const fetchTotalUsage = (startDate, endDate, step) => {
  return Promise.all([
    fetchCpuTotal(startDate, endDate, step),
    fetchMemoryTotal(startDate, endDate, step),
    fetchNetworkTotal(startDate, endDate, step),
    fetchStorageTotal(startDate, endDate, step)
  ]).then(data => data.reduce((acc, curr) => acc.concat(curr), []));
};

module.exports = {
  fetchNamespaceUsage,
  fetchTotalUsage
};
