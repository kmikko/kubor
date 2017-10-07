import React from "react";
import { connect } from "react-redux";
import { calculateNamespaceUsage } from "../utils/clusterUtils";

import {
  getClusterCosts,
  getClusterNamespaces,
  getResourceUsageByNamespace,
  getTimeInterval,
  getResourceFilters
} from "../reducers";

import Hero from "../components/Hero";
import CostFilter from "../components/CostFilter";
import CostSummary from "../components/CostSummary";

import {
  fetchCpuUsage,
  fetchCpuTotal,
  fetchMemoryUsage,
  fetchMemoryTotal,
  fetchNetworkUsage,
  fetchNetworkTotal,
  fetchStorageUsage,
  fetchStorageTotal,
  fetchClusterCosts,
  fetchKubernetesNamespaces,
  changeTimeIntervalFilter,
  changeResourceFilter
} from "../actions";

import CheckboxGroup from "../components/CheckboxGroup";

class Reports extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resources: ["cpu", "memory", "storage", "network"],
      usage: "hourly",
      fixedCosts: ""
    };

    this.handleResourceFilterChange = this.handleResourceFilterChange.bind(
      this
    );
    this.handleUsageChange = this.handleUsageChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  componentDidMount() {
    // TODO: JS Date object vs unix time stamp
    // Not it's just a big mess
    let { startDate } = this.props.timeInterval;

    this.props.getClusterCosts(
      startDate.getFullYear(),
      startDate.getMonth() + 1
    );

    this.props.getKubernetesNamespaces();
  }

  componentWillReceiveProps(props) {
    const currentNamespaces = this.props.namespaces;
    const nextNamespaces = props.namespaces;

    let { startDate, endDate } = this.props.timeInterval;
    startDate = startDate.getTime() / 1000;
    endDate = endDate.getTime() / 1000;

    if (JSON.stringify(currentNamespaces) !== JSON.stringify(nextNamespaces)) {
      nextNamespaces.forEach(n => this.getResourceUsage(startDate, endDate, n));
    }
  }

  handleResourceFilterChange(event) {
    const checked = event.target.checked;
    const value = event.target.value;

    this.props.resourceFilterChanged(value, checked);
    /*
    this.setState((prevState, props) => ({
      resources: checked
        ? [...prevState.resources, value]
        : prevState.resources
            .slice(0, prevState.resources.indexOf(value), 1)
            .concat(
              prevState.resources.slice(prevState.resources.indexOf(value) + 1)
            )
    }));
    */
  }

  handleUsageChange(event) {
    this.setState({
      usage: event.target.value
    });
  }

  getResourceUsage(startDate, endDate, namespace, step = 3600) {
    this.props.getCpuUsage(startDate, endDate, step, namespace);
    this.props.getCpuTotal(startDate, endDate, step, namespace);
    this.props.getMemoryUsage(startDate, endDate, step, namespace);
    this.props.getMemoryTotal(startDate, endDate, step, namespace);
    this.props.getNetworkUsage(startDate, endDate, step, namespace);
    this.props.getNetworkTotal(startDate, endDate, step, namespace);
    this.props.getStorageUsage(startDate, endDate, step, namespace);
    this.props.getStorageTotal(startDate, endDate, step, namespace);

    const date = new Date(startDate * 1000);
    this.props.getClusterCosts(date.getFullYear(), date.getMonth() + 1);
  }

  handleTimeChange(value) {
    value = new Date(value);
    let startDate = new Date(Date.UTC(value.getFullYear(), value.getMonth()));
    let endDate = new Date(
      Date.UTC(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59)
    );

    this.props.timeIntervalFilterChanged(startDate, endDate);

    startDate = startDate.getTime() / 1000;
    endDate = endDate.getTime() / 1000;
    this.props.namespaces.forEach(n =>
      this.getResourceUsage(startDate, endDate, n)
    );
  }

  render() {
    let { clusterCosts, usageByNamespace, resourceFilters } = this.props;

    // clusterCosts: Cluster total costs by resource
    // total usage by resource
    // namespace resource usage

    const costs = usageByNamespace.map(x => ({
      namespace: x.namespace,
      costs: calculateNamespaceUsage(
        clusterCosts,
        {
          cpu: x.usage.cpu,
          memory: x.usage.memory,
          storage: x.usage.storage,
          network: x.usage.network
        },
        {
          cpu: x.total.cpu,
          memory: x.total.memory,
          storage: x.total.storage,
          network: x.total.network
        }
      )
    }));

    const customCosts = clusterCosts
      .filter(c => c.type === "custom")
      .filter(c =>
        resourceFilters.includes(
          [c.type, c.label].filter(x => x.length > 0).join("-")
        )
      );

    return (
      <div>
        <Hero
          title="Costs explorer"
          subtitle="Explor costs of your K8s cluster."
        />

        <div className="columns is-marginless is-maincontent">
          <div className="column is-4">
            <CostFilter
              costs={clusterCosts}
              resourceFilters={resourceFilters}
              onTimeChange={this.handleTimeChange}
              onResourceFilterChange={this.handleResourceFilterChange}
            />
          </div>

          <div className="column is-8">
            <div className="columns is-multiline">
              {costs.map((c, key) => (
                <div key={key} className="column is-6">
                  <CostSummary
                    namespace={c.namespace}
                    costs={c.costs}
                    customCosts={customCosts}
                    resourceFilters={resourceFilters}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clusterCosts: getClusterCosts(state),
    namespaces: getClusterNamespaces(state),
    usageByNamespace: getResourceUsageByNamespace(state),
    timeInterval: getTimeInterval(state),
    resourceFilters: getResourceFilters(state)
  };
};

const mapDispatchToProps = {
  getCpuUsage: fetchCpuUsage,
  getCpuTotal: fetchCpuTotal,
  getMemoryUsage: fetchMemoryUsage,
  getMemoryTotal: fetchMemoryTotal,
  getNetworkUsage: fetchNetworkUsage,
  getNetworkTotal: fetchNetworkTotal,
  getStorageUsage: fetchStorageUsage,
  getStorageTotal: fetchStorageTotal,
  getClusterCosts: fetchClusterCosts,
  getKubernetesNamespaces: fetchKubernetesNamespaces,
  timeIntervalFilterChanged: changeTimeIntervalFilter,
  resourceFilterChanged: changeResourceFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
