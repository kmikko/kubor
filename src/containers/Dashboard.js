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
      .then(data => this.setState({ network: data }));

    fetch(
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
