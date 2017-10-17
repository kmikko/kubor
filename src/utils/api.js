const API_ROOT = process.env.REACT_APP_API_URL || "/api/v1";

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export const fetchKubernetesNamespaces = () => {
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

export const fetchClusterCosts = (year, month) => {
  return fetch(`${API_ROOT}/cluster/costs?year=${year}&month=${month}`)
    .then(handleErrors)
    .then(response => response.json())
    .then(data => Promise.resolve(data))
    .catch(error => Promise.reject(error));
};

export const fetchCpuUsage = (start, end, step, namespace) => {
  return (
    fetch(
      `${API_ROOT}/cluster/metrics?start=${start}&end=${end}&type=cpu&namespace=${namespace}`
      //`${API_ROOT}/proxy/prometheus/api/v1/query_range?query=sum%20(rate%20(container_cpu_usage_seconds_total%7Bnamespace%3D%22${namespace}%22%7D%5B1m%5D%20)%20OR%20on()%20vector(0))&start=${start}&end=${end}&step=${step}`
    )
      .then(handleErrors)
      .then(response => response.json())
      //.then(data => data["data"]["result"][0]["values"])
      //.then(data => data.map(x => [x[0], parseFloat(x[1])]))
      .then(data => Promise.resolve(data))
      .catch(error => Promise.reject(error))
  );
};

export const fetchCpuTotal = (start, end, step) => {
  return (
    fetch(
      `${API_ROOT}/cluster/metrics?start=${start}&end=${end}&type=cpu&namespace=__TOTAL__`
      //`${API_ROOT}/proxy/prometheus/api/v1/query_range?query=sum(machine_cpu_cores%20OR%20on()%20vector(0))%20&start=${start}&end=${end}&step=${step}`
    )
      .then(handleErrors)
      .then(response => response.json())
      //.then(data => data["data"]["result"][0]["values"])
      //.then(data => data.map(x => [x[0], parseFloat(x[1])]))
      .then(data => Promise.resolve(data))
      .catch(error => Promise.reject(error))
  );
};

export const fetchMemoryUsage = (start, end, step, namespace) => {
  return (
    fetch(
      `${API_ROOT}/cluster/metrics?start=${start}&end=${end}&type=memory&namespace=${namespace}`
      //`${API_ROOT}/proxy/prometheus/api/v1/query_range?query=sum(container_memory_usage_bytes%7Bnamespace%3D%22${namespace}%22%7D%20OR%20on()%20vector(0))&start=${start}&end=${end}&step=${step}`
    )
      .then(handleErrors)
      .then(response => response.json())
      //.then(data => data["data"]["result"][0]["values"])
      //.then(data => data.map(x => [x[0], parseFloat(x[1])]))
      .then(data => Promise.resolve(data))
      .catch(error => Promise.reject(error))
  );
};

export const fetchMemoryTotal = (start, end, step) => {
  return (
    fetch(
      `${API_ROOT}/cluster/metrics?start=${start}&end=${end}&type=memory&namespace=__TOTAL__`
      //`${API_ROOT}/proxy/prometheus/api/v1/query_range?query=sum(machine_memory_bytes%20OR%20on()%20vector(0))&start=${start}&end=${end}&step=${step}`
    )
      .then(handleErrors)
      .then(response => response.json())
      //.then(data => data["data"]["result"][0]["values"])
      //.then(data => data.map(x => [x[0], parseFloat(x[1])]))
      .then(data => Promise.resolve(data))
      .catch(error => Promise.reject(error))
  );
};

export const fetchNetworkUsage = (start, end, step, namespace) => {
  return (
    fetch(
      `${API_ROOT}/cluster/metrics?start=${start}&end=${end}&type=network&namespace=${namespace}`
      //`${API_ROOT}/proxy/prometheus/api/v1/query_range?query=sum(container_network_transmit_bytes_total%7Bnamespace%3D%22${namespace}%22%7D%20OR%20on()%20vector(0))&start=${start -
      //  step}&end=${end}&step=${step}`
    )
      .then(handleErrors)
      .then(response => response.json())
      //.then(data => data["data"]["result"][0]["values"])
      //.then(data => data.map(x => [x[0], parseFloat(x[1])]))
      .then(data => Promise.resolve(data))
      .catch(error => Promise.reject(error))
  );
};

export const fetchNetworkTotal = (start, end, step) => {
  return (
    fetch(
      `${API_ROOT}/cluster/metrics?start=${start}&end=${end}&type=network&namespace=__TOTAL__`
      //`${API_ROOT}/proxy/prometheus/api/v1/query_range?query=sum(container_network_transmit_bytes_total%20OR%20on()%20vector(0))&start=${start -
      //  step}&end=${end}&step=${step}`
    )
      .then(handleErrors)
      .then(response => response.json())
      //.then(data => data["data"]["result"][0]["values"])
      //.then(data => data.map(x => [x[0], parseFloat(x[1])]))
      .then(data => Promise.resolve(data))
      .catch(error => Promise.reject(error))
  );
};

export const fetchStorageUsage = (start, end, step, namespace) => {
  return (
    fetch(
      `${API_ROOT}/cluster/metrics?start=${start}&end=${end}&type=storage&namespace=${namespace}`
      //`${API_ROOT}/proxy/prometheus/api/v1/query_range?query=sum(container_fs_usage_bytes%7Bnamespace%3D%22${namespace}%22%7D)%20OR%20on()%20vector(0)&start=${start}&end=${end}&step=${step}`
    )
      .then(handleErrors)
      .then(response => response.json())
      //.then(data => data["data"]["result"][0]["values"])
      //.then(data => data.map(x => [x[0], parseFloat(x[1])]))
      .then(data => Promise.resolve(data))
      .catch(error => Promise.reject(error))
  );
};

export const fetchStorageTotal = (start, end, step) => {
  return (
    fetch(
      `${API_ROOT}/cluster/metrics?start=${start}&end=${end}&type=storage&namespace=__TOTAL__`
      //`${API_ROOT}/proxy/prometheus/api/v1/query_range?query=sum(container_fs_usage_bytes)%20OR%20on()%20vector(0)&start=${start}&end=${end}&step=${step}`
    )
      .then(handleErrors)
      .then(response => response.json())
      //.then(data => data["data"]["result"][0]["values"])
      //.then(data => data.map(x => [x[0], parseFloat(x[1])]))
      .then(data => Promise.resolve(data))
      .catch(error => Promise.reject(error))
  );
};
