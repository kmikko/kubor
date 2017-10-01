import React from 'react';
import { connect } from 'react-redux';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import {
  calculateResourceUsagePrice,
  calculateResourceUsageHours,
  calculateNamespaceUsage
} from '../utils/clusterUtils';

import Hero from '../components/Hero';
import CostFilter from '../components/CostFilter';
import CostSummary from '../components/CostSummary';

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
  fetchKubernetesNamespaces
} from '../actions';

import CheckboxGroup from '../components/CheckboxGroup';

class Reports extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resources: ['cpu', 'memory', 'storage', 'network'],
      timePeriod: [new Date(2017, 8, 1), new Date(2017, 8, 30)],
      usage: 'hourly',
      fixedCosts: ''
    };

    this.handleResourceChange = this.handleResourceChange.bind(this);
    this.handleUsageChange = this.handleUsageChange.bind(this);
    this.handleCalculateClick = this.handleCalculateClick.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  componentDidMount() {
    const { timePeriod } = this.state;
    this.props.getClusterCosts(
      timePeriod[0].getFullYear(),
      timePeriod[0].getMonth() + 1
    );

    this.props.getKubernetesNamespaces();
    //this.handleCalculateClick("kube-system");
  }

  componentWillReceiveProps(props) {
    if (this.props.namespaces.length !== props.namespaces.length) {
      props.namespaces.forEach(n => this.handleCalculateClick(n));
    }
  }

  handleResourceChange(event) {
    const checked = event.target.checked;
    const value = event.target.value;

    this.setState((prevState, props) => ({
      resources: checked
        ? [...prevState.resources, value]
        : prevState.resources
            .slice(0, prevState.resources.indexOf(value), 1)
            .concat(
              prevState.resources.slice(prevState.resources.indexOf(value) + 1)
            )
    }));
  }

  handleUsageChange(event) {
    this.setState({
      usage: event.target.value
    });
  }

  handleCalculateClick(namespace) {
    const { usage, resources, timePeriod } = this.state;

    // TODO
    const start = Math.round(timePeriod[0] / 1000);
    const end = Math.round(
      this.state.timePeriod[1].setHours(23, 59, 59) / 1000
    );

    const step = { hourly: 3600, daily: 86400 }[usage];

    //if (resources.indexOf("cpu") > -1) {
    this.props.getCpuUsage(start, end, step, namespace);
    this.props.getCpuTotal(start, end, step, namespace);
    //}
    //if (resources.indexOf("memory") > -1) {
    this.props.getMemoryUsage(start, end, step, namespace);
    this.props.getMemoryTotal(start, end, step, namespace);
    //}
    //if (resources.indexOf("network") > -1) {
    this.props.getNetworkUsage(start, end, step, namespace);
    this.props.getNetworkTotal(start, end, step, namespace);
    //}
    //if (resources.indexOf("storage") > -1) {
    this.props.getStorageUsage(start, end, step, namespace);
    this.props.getStorageTotal(start, end, step, namespace);
    //}

    this.props.getClusterCosts(
      timePeriod[0].getFullYear(),
      timePeriod[0].getMonth() + 1
    );
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
    this.props.getClusterCosts(
      startDate.getFullYear(),
      startDate.getMonth() + 1
    );
  }

  handleTimeChange(e) {
    const { value } = e.target;
    console.log('value', value);
    let startDate = new Date(value + 'T00:00:00.000Z');
    let endDate = new Date(
      Date.UTC(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59)
    );

    startDate = Math.round(startDate / 1000);
    endDate = Math.round(endDate / 1000);
    console.log(`startDate: ${startDate}, endDate: ${endDate}`);

    /*
    this.props.namespaces.forEach(n =>
      this.getResourceUsage(startDate, endDate, n)
    );
    */
  }

  render() {
    let {
      cpuUsage,
      cpuTotal,
      memoryUsage,
      memoryTotal,
      networkUsage,
      networkTotal,
      storageUsage,
      storageTotal,
      clusterCosts,
      namespaces
    } = this.props;

    // clusterCosts: Cluster total costs by resource
    // total usage by resource
    // namespace resource usage
    const costs = namespaces.map(namespace => ({
      namespace: namespace,
      costs: calculateNamespaceUsage(
        clusterCosts,
        {
          cpu: cpuUsage[namespace] || [],
          memory: memoryUsage[namespace] || [],
          storage: storageUsage[namespace] || [],
          network: networkUsage[namespace] || []
        },
        {
          cpu: cpuTotal,
          memory: memoryTotal,
          storage: storageTotal,
          network: networkTotal
        }
      )
    }));

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
              onTimeChange={this.handleTimeChange}
            />
          </div>

          <div className="column is-8">
            <div className="columns is-multiline">
              {costs.map(c => (
                <div className="column is-6">
                  <CostSummary namespace={c.namespace} costs={c.costs} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cpuUsage: state.usage.cpu,
  cpuTotal: state.total.cpu,
  memoryUsage: state.usage.memory,
  memoryTotal: state.total.memory,
  networkUsage: state.usage.network,
  networkTotal: state.total.network,
  storageUsage: state.usage.storage,
  storageTotal: state.total.storage,
  clusterCosts: state.cluster.costs,
  namespaces: state.kubernetes.namespaces
});

export default connect(mapStateToProps, {
  getCpuUsage: fetchCpuUsage,
  getCpuTotal: fetchCpuTotal,
  getMemoryUsage: fetchMemoryUsage,
  getMemoryTotal: fetchMemoryTotal,
  getNetworkUsage: fetchNetworkUsage,
  getNetworkTotal: fetchNetworkTotal,
  getStorageUsage: fetchStorageUsage,
  getStorageTotal: fetchStorageTotal,
  getClusterCosts: fetchClusterCosts,
  getKubernetesNamespaces: fetchKubernetesNamespaces
})(Reports);
