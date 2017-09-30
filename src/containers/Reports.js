import React from 'react';
import { connect } from 'react-redux';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

import {
  fetchKubernetesNamespaces,
  fetchCpuUsage,
  fetchCpuTotal,
  fetchMemoryUsage,
  fetchMemoryTotal,
  fetchNetworkUsage,
  fetchNetworkTotal,
  fetchStorageUsage,
  fetchStorageTotal,
  fetchClusterCosts
} from '../actions';

import CheckboxGroup from '../components/CheckboxGroup';

class Reports extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      namespace: '',
      resources: ['cpu', 'memory', 'storage', 'network'],
      timePeriod: [new Date(2017, 8, 1), new Date(2017, 8, 30)],
      usage: 'hourly',
      fixedCosts: ''
    };

    this.handleNamespaceChange = this.handleNamespaceChange.bind(this);
    this.handleResourceChange = this.handleResourceChange.bind(this);
    this.handleTimePeriodChange = this.handleTimePeriodChange.bind(this);
    this.handleUsageChange = this.handleUsageChange.bind(this);
    this.handleCalculateClick = this.handleCalculateClick.bind(this);
    this.handleFixedCostsChange = this.handleFixedCostsChange.bind(this);
  }

  componentDidMount() {
    this.props.getKubernetesNamespaces();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.namespace === '' && nextProps.namespaces.length > 0) {
      this.setState({
        namespace: nextProps.namespaces[0]
      });
    }
  }

  handleNamespaceChange(event) {
    this.setState({
      namespace: event.target.value
    });
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

  handleTimePeriodChange(values) {
    if (values.length === 2) {
      this.setState({
        timePeriod: values
      });
    }
  }

  handleUsageChange(event) {
    this.setState({
      usage: event.target.value
    });
  }

  handleFixedCostsChange(event) {
    this.setState({
      fixedCosts: parseInt(event.target.value, 10)
    });
  }

  handleCalculateClick() {
    const { namespace, usage, resources, timePeriod } = this.state;

    const start = Math.round(timePeriod[0] / 1000);
    const end = Math.round(
      this.state.timePeriod[1].setHours(23, 59, 59) / 1000
    );

    const step = { hourly: 3600, daily: 86400 }[usage];

    if (resources.indexOf('cpu') > -1) {
      this.props.getCpuUsage(start, end, step, namespace);
      this.props.getCpuTotal(start, end, step, namespace);
    }
    if (resources.indexOf('memory') > -1) {
      this.props.getMemoryUsage(start, end, step, namespace);
      this.props.getMemoryTotal(start, end, step, namespace);
    }
    if (resources.indexOf('network') > -1) {
      this.props.getNetworkUsage(start, end, step, namespace);
      this.props.getNetworkTotal(start, end, step, namespace);
    }
    if (resources.indexOf('storage') > -1) {
      this.props.getStorageUsage(start, end, step, namespace);
      this.props.getStorageTotal(start, end, step, namespace);
    }

    this.props.getClusterCosts(
      timePeriod[0].getFullYear(),
      timePeriod[0].getMonth() + 1
    );
  }

  calculateNamespaceResourceUsage(usage, total) {
    if (usage.length !== total.length) {
      return [];
    }

    let percentage = [];

    for (let i = 0; i < usage.length - 1; i++) {
      percentage.push([usage[i][0], usage[i][1] / total[i][1] || 0]);
    }
    return percentage;
  }

  render() {
    console.log('props', this.props);
    const {
      namespaces,
      cpuUsage,
      cpuTotal,
      memoryUsage,
      memoryTotal,
      networkUsage,
      networkTotal,
      storageUsage,
      storageTotal,
      clusterCosts
    } = this.props;

    const { resources: selectedResources, fixedCosts } = this.state;

    // TODO: This explodes if not all resources found
    const daysInMonth = 29;
    const clusterCpuPrice =
      clusterCosts.find(x => x.type === 'cpu').cost / (daysInMonth * 24);
    const clusterMemoryPrice =
      clusterCosts.find(x => x.type === 'memory').cost / (daysInMonth * 24);
    const clusterNetworkPrice =
      clusterCosts.find(x => x.type === 'network').cost / (daysInMonth * 24);
    const clusterStoragePrice =
      clusterCosts.find(x => x.type === 'storage').cost / (daysInMonth * 24);

    const usageStep =
      differenceInCalendarDays(
        this.state.timePeriod[1],
        this.state.timePeriod[0]
      ) +
      1 * (this.state.usage === 'hourly' ? 24 : 1);

    // CPU
    const cpuTotalPrice = this.calculateNamespaceResourceUsage(
      cpuUsage,
      cpuTotal
    )
      .map(x => x[1] * clusterCpuPrice)
      .reduce((prev, curr) => prev + curr, 0);
    console.log('cpuPrice', cpuTotalPrice);
    const cpuUsageUnits = cpuUsage.filter(x => x[1] !== 0).length;
    const cpuStepPrice = cpuTotalPrice / cpuUsageUnits || 0;

    // Memory
    const memoryTotalPrice = this.calculateNamespaceResourceUsage(
      memoryUsage,
      memoryTotal
    )
      .map(x => x[1] * clusterMemoryPrice)
      .reduce((prev, curr) => prev + curr, 0);
    const memoryUsageUnits = memoryUsage.filter(x => x[1] !== 0).length;
    const memoryStepPrice = memoryTotalPrice / memoryUsageUnits || 0;
    console.log('memoryPrice', memoryTotalPrice);

    // Network
    const networkTotalPrice = this.calculateNamespaceResourceUsage(
      networkUsage,
      networkTotal
    )
      .map(x => x[1] * clusterNetworkPrice)
      .reduce((prev, curr) => prev + curr, 0);
    console.log('networkPrice', networkTotalPrice);
    // TODO: Converter from bytes to reasonable unit (kilo/mega/giga)
    const networkUsageUnits = networkUsage.filter(x => x[1] !== 0).length;
    const networkTotalUsage =
      networkUsage.reduce((prev, curr) => prev + curr[1], 0) / 1000 / 1000;
    console.log('networkTotalUsage', networkTotalUsage);
    const networkStepPrice = networkTotalPrice / networkUsageUnits || 0;

    // Storage
    const storageTotalPrice = this.calculateNamespaceResourceUsage(
      storageUsage,
      storageTotal
    )
      .map(x => x[1] * clusterStoragePrice)
      .reduce((prev, curr) => prev + curr, 0);
    console.log('storagePrice', storageTotalPrice);
    const storageUsageUnits = storageUsage.filter(x => x[1] !== 0).length;
    const storageTotalUsage =
      storageUsage.reduce((prev, curr) => (curr[1] === 0 ? prev : curr[1]), 0) /
      1000 /
      1000;
    console.log('storageTotalUsage', storageTotalUsage);
    const storageStepPrice = storageTotalPrice / storageUsageUnits || 0;

    const stepPrice =
      memoryStepPrice + cpuStepPrice + networkStepPrice + storageStepPrice;
    const totalPrice =
      (selectedResources.indexOf('memory') > -1 ? memoryTotalPrice : 0) +
      (selectedResources.indexOf('cpu') > -1 ? cpuTotalPrice : 0) +
      (selectedResources.indexOf('network') > -1 ? networkTotalPrice : 0) +
      (selectedResources.indexOf('storage') > -1 ? storageTotalPrice : 0) +
      (fixedCosts !== '' ? fixedCosts : 0);

    return (
      <div>
        <div className="columns">
          <div className="column">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">Reports</p>
              </header>
              <div className="card-content">
                <div className="content">
                  <div className="field is-horizontal">
                    <div className="field-label">
                      <label className="label">Namespace</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <div className="select">
                            <select
                              value={this.state.namespace}
                              onChange={this.handleNamespaceChange}
                            >
                              {namespaces.map(n => (
                                <option key={n}>{n}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="field is-horizontal">
                    <div className="field-label">
                      <label className="label">Resources</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <input
                          className="is-checkbox"
                          id="cpuCheckbox"
                          type="checkbox"
                          name="resource"
                          value="cpu"
                          onChange={this.handleResourceChange}
                          checked={this.state.resources.indexOf('cpu') > -1}
                        />
                        <label htmlFor="cpuCheckbox">CPU</label>
                        <input
                          className="is-checkbox"
                          id="memoryCheckbox"
                          type="checkbox"
                          name="resource"
                          value="memory"
                          onChange={this.handleResourceChange}
                          checked={this.state.resources.indexOf('memory') > -1}
                        />
                        <label htmlFor="memoryCheckbox">Memory</label>
                        <input
                          className="is-checkbox"
                          id="networkCheckbox"
                          type="checkbox"
                          name="resource"
                          value="network"
                          onChange={this.handleResourceChange}
                          checked={this.state.resources.indexOf('network') > -1}
                        />
                        <label htmlFor="networkCheckbox">Network</label>
                        <input
                          className="is-checkbox"
                          id="storageCheckbox"
                          type="checkbox"
                          name="resource"
                          value="storage"
                          onChange={this.handleResourceChange}
                          checked={this.state.resources.indexOf('storage') > -1}
                        />
                        <label htmlFor="storageCheckbox">Storage</label>
                      </div>
                    </div>
                  </div>

                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label">Fixed costs</label>
                    </div>
                    <div className="field-body">
                      <div className="field has-addons">
                        <p className="control">
                          <input
                            className="input"
                            type="number"
                            min="0"
                            step="1"
                            placeholder="Monthly fixed costs"
                            value={this.state.fixedCosts}
                            onChange={this.handleFixedCostsChange}
                          />
                        </p>
                        <p className="control">
                          <a className="button is-static">€</a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label">Time period</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <Flatpickr
                          options={{
                            inline: true,
                            mode: 'range',
                            defaultDate: this.state.timePeriod
                          }}
                          onChange={this.handleTimePeriodChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="field is-horizontal">
                    <div className="field-label">
                      <label className="label">Usage</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <input
                          className="is-radio"
                          id="hourlyRadio"
                          type="radio"
                          name="usage"
                          onChange={this.handleUsageChange}
                          checked={this.state.usage === 'hourly'}
                          value="hourly"
                        />
                        <label htmlFor="hourlyRadio">Hourly</label>
                        <input
                          className="is-radio"
                          id="dailyRadio"
                          type="radio"
                          name="usage"
                          onChange={this.handleUsageChange}
                          checked={this.state.usage === 'daily'}
                          value="daily"
                          disabled
                        />
                        <label htmlFor="dailyRadio">Daily</label>
                      </div>
                    </div>
                  </div>

                  <div className="field is-horizontal">
                    <div className="field-label" />
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <button
                            className="button is-primary"
                            onClick={this.handleCalculateClick}
                          >
                            Calculate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">Cost summary</p>
              </header>
              <div className="card-content">
                <div className="content">
                  <table className="table is-striped">
                    <thead>
                      <tr>
                        <th>Resource</th>
                        <th>Usage</th>
                        <th>Per hour</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedResources.indexOf('cpu') > -1 ? (
                        <tr>
                          <td>CPU</td>
                          <td>
                            {cpuUsageUnits}&nbsp;
                            {this.state.usage === 'hourly' ? 'hours' : 'days'}
                          </td>
                          <td>{cpuStepPrice.toFixed(2)}€</td>
                          <td>{cpuTotalPrice.toFixed(2)}€</td>
                        </tr>
                      ) : null}
                      {selectedResources.indexOf('memory') > -1 ? (
                        <tr>
                          <td>Memory</td>
                          <td>
                            {memoryUsageUnits}&nbsp;
                            {this.state.usage === 'hourly' ? 'hours' : 'days'}
                          </td>
                          <td>{memoryStepPrice.toFixed(2)}€</td>
                          <td>{memoryTotalPrice.toFixed(2)}€</td>
                        </tr>
                      ) : null}
                      {selectedResources.indexOf('network') > -1 ? (
                        <tr>
                          <td>Network (Tx)</td>
                          <td>{networkTotalUsage.toFixed(2)} MB</td>
                          <td>{networkStepPrice.toFixed(2)}€</td>
                          <td>{networkTotalPrice.toFixed(2)}€</td>
                        </tr>
                      ) : null}
                      {selectedResources.indexOf('storage') > -1 ? (
                        <tr>
                          <td>Storage</td>
                          <td>{storageTotalUsage.toFixed(2)} MB</td>
                          <td>{storageStepPrice.toFixed(2)}€</td>
                          <td>{storageTotalPrice.toFixed(2)}€</td>
                        </tr>
                      ) : null}
                      {fixedCosts > 0 ? (
                        <tr>
                          <td colSpan={3}>Fixed costs</td>
                          <td>{fixedCosts.toFixed(2)} €</td>
                        </tr>
                      ) : null}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colSpan={2}>TOTAL</th>
                        <th>{stepPrice.toFixed(2)}€</th>
                        <th>{totalPrice.toFixed(2)}€</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  namespaces: state.kubernetes.namespaces,
  cpuUsage: state.usage.cpu,
  cpuTotal: state.total.cpu,
  memoryUsage: state.usage.memory,
  memoryTotal: state.total.memory,
  networkUsage: state.usage.network,
  networkTotal: state.total.network,
  storageUsage: state.usage.storage,
  storageTotal: state.total.storage,
  clusterCosts: state.cluster.costs
});

export default connect(mapStateToProps, {
  getKubernetesNamespaces: fetchKubernetesNamespaces,
  getCpuUsage: fetchCpuUsage,
  getCpuTotal: fetchCpuTotal,
  getMemoryUsage: fetchMemoryUsage,
  getMemoryTotal: fetchMemoryTotal,
  getNetworkUsage: fetchNetworkUsage,
  getNetworkTotal: fetchNetworkTotal,
  getStorageUsage: fetchStorageUsage,
  getStorageTotal: fetchStorageTotal,
  getClusterCosts: fetchClusterCosts
})(Reports);
