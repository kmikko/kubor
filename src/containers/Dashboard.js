import React from "react";

import Card from "../components/Card";
import Table from "../components/Table";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";

import CpuUsage from "../components/CpuUsage";
import NetworkUsage from "../components/NetworkUsage";

class Dashboard extends React.Component {
  state = {
    cpu: [],
    network: []
  };
  componentDidMount() {
    fetch(
      "http://192.168.99.100:32645/api/datasources/proxy/1/query?epoch=ms&q=SELECT+sum(%22value%22)+FROM+%22network%2Ftx_rate%22+WHERE+%22type%22+%3D+%27pod%27+AND+%22namespace_name%22+%3D~+%2Fkube-system$%2F+AND+%22pod_name%22+%3D~+%2Fheapster-8fvx3$%2F+AND+time+%3E+now()+-+30m+GROUP+BY+time(1m)+fill(null)%0ASELECT+sum(%22value%22)+FROM+%22network%2Frx_rate%22+WHERE+%22type%22+%3D+%27pod%27+AND+%22namespace_name%22+%3D~+%2Fkube-system$%2F+AND+%22pod_name%22+%3D~+%2Fheapster-8fvx3$%2F+AND+time+%3E+now()+-+30m+GROUP+BY+time(1m)+fill(null)"
    )
      .then(response => response.json())
      .then(data => data.results)
      .then(data =>
        data.map(result =>
          result.series.map(serie => ({
            name: serie.name,
            values: serie.values
          }))
        )
      )
      .then(data => [].concat.apply([], data))
      .then(data => this.setState({ network: data }));

    fetch(
      "http://192.168.99.100:32645/api/datasources/proxy/1/query?epoch=ms&q=SELECT+sum(%22value%22)+FROM+%22cpu%2Fusage_rate%22+WHERE+%22type%22+%3D+%27node%27+AND+time+%3E+now()+-+30m+GROUP+BY+time(1m),+%22nodename%22+fill(null)%0ASELECT+sum(%22value%22)+FROM+%22cpu%2Flimit%22+WHERE+%22type%22+%3D+%27node%27+AND+time+%3E+now()+-+30m+GROUP+BY+time(1m),+%22nodename%22+fill(null)%0ASELECT+sum(%22value%22)+FROM+%22cpu%2Frequest%22+WHERE+%22type%22+%3D+%27node%27+AND+time+%3E+now()+-+30m+GROUP+BY+time(1m),+%22nodename%22+fill(null)"
    )
      .then(response => response.json())
      .then(data => data.results)
      .then(data =>
        data.map(result =>
          result.series.map(serie => ({
            name: serie.name,
            values: serie.values
          }))
        )
      )
      .then(data => [].concat.apply([], data))
      .then(data => this.setState({ cpu: data }));
  }

  render() {
    return (
      <div className="columns is-multiline">
        <div className="column is-one-third">
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">CPU usage</p>
            </header>
            <div className="card-content">
              <div className="content">
                <CpuUsage data={this.state.cpu} />
              </div>
            </div>
          </div>
        </div>
        <div className="column is-one-third">
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">Network usage</p>
            </header>
            <div className="card-content">
              <div className="content">
                <NetworkUsage data={this.state.network} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
