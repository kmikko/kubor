import React from "react";
import { connect } from "react-redux";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";

import { fetchKubernetesNamespaces } from "../actions";

import CheckboxGroup from "../components/CheckboxGroup";

class Reports extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      namespace: "",
      resources: ["cpu", "ram", "storage", "network"],
      timePeriod: [new Date(2017, 8, 1), new Date(2017, 8, 16)],
      usage: "hourly"
    };

    this.handleNamespaceChange = this.handleNamespaceChange.bind(this);
    this.handleResourceChange = this.handleResourceChange.bind(this);
    this.handleTimePeriodChange = this.handleTimePeriodChange.bind(this);
    this.handleUsageChange = this.handleUsageChange.bind(this);
    this.handleCalculateClick = this.handleCalculateClick.bind(this);
  }

  componentDidMount() {
    this.props.getKubernetesNamespaces();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.namespace === "" && nextProps.namespaces.length > 0) {
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

  handleCalculateClick() {
    const values = {
      namespace: this.state.namespace,
      resources: this.state.resources,
      timePeriod: this.state.timePeriod,
      usage: this.state.usage
    };

    console.log(JSON.stringify(values));
  }

  render() {
    console.log("state", JSON.stringify(this.state));
    const { namespaces } = this.props;
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
                          checked={this.state.resources.indexOf("cpu") > -1}
                        />
                        <label htmlFor="cpuCheckbox">CPU</label>
                        <input
                          className="is-checkbox"
                          id="ramCheckbox"
                          type="checkbox"
                          name="resource"
                          value="ram"
                          onChange={this.handleResourceChange}
                          checked={this.state.resources.indexOf("ram") > -1}
                        />
                        <label htmlFor="ramCheckbox">RAM</label>
                        <input
                          className="is-checkbox"
                          id="networkCheckbox"
                          type="checkbox"
                          name="resource"
                          value="network"
                          onChange={this.handleResourceChange}
                          checked={this.state.resources.indexOf("network") > -1}
                        />
                        <label htmlFor="networkCheckbox">Network</label>
                        <input
                          className="is-checkbox"
                          id="storageCheckbox"
                          type="checkbox"
                          name="resource"
                          value="storage"
                          onChange={this.handleResourceChange}
                          checked={this.state.resources.indexOf("storage") > -1}
                        />
                        <label htmlFor="storageCheckbox">Storage</label>
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
                            mode: "range",
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
                          checked={this.state.usage === "hourly"}
                          value="hourly"
                        />
                        <label htmlFor="hourlyRadio">Hourly</label>
                        <input
                          className="is-radio"
                          id="dailyRadio"
                          type="radio"
                          name="usage"
                          onChange={this.handleUsageChange}
                          checked={this.state.usage === "daily"}
                          value="daily"
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
                        <th>Per day</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>CPU</td>
                        <td>480 hours</td>
                        <td>0.82€</td>
                        <td>16.48€</td>
                      </tr>
                      <tr>
                        <td>RAM</td>
                        <td>480 hours</td>
                        <td>0.52€</td>
                        <td>10.37€</td>
                      </tr>
                      <tr>
                        <td>Network</td>
                        <td>4.78 GB</td>
                        <td>0.26€</td>
                        <td>5.14€</td>
                      </tr>
                      <tr>
                        <td>Disk</td>
                        <td>348 MB</td>
                        <td>0.06€</td>
                        <td>1.30€</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colSpan={2}>TOTAL</th>
                        <th>2.20€</th>
                        <th>33.29€</th>
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
  namespaces: state.kubernetes.namespaces
});

export default connect(mapStateToProps, {
  getKubernetesNamespaces: fetchKubernetesNamespaces
})(Reports);
