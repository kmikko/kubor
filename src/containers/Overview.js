import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchCpuUsage, fetchNetworkUsage } from "../actions";

import CpuUsage from "../components/CpuUsage";
import NetworkUsage from "../components/NetworkUsage";

class Overview extends React.Component {
  componentDidMount() {
    this.props.getCpuUsage();
    this.props.getNetworkUsage();
  }

  render() {
    const { cpu: cpuUsage, network: networkUsage } = this.props.usage;
    return (
      <div className="columns is-multiline">
        <div className="column is-one-third">
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">CPU usage</p>
            </header>
            <div className="card-content">
              <div className="content">
                <CpuUsage data={cpuUsage} />
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
                <NetworkUsage data={networkUsage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Overview.propTypes = {
  usage: PropTypes.shape({
    cpu: PropTypes.array,
    network: PropTypes.array
  })
};

const mapStateToProps = state => ({
  usage: state.usage
});

/*
const mapDispatchToProps = dispatch => ({
  fetchCpuUsage() {
    dispatch(fetchCpuUsage());
  }
});
*/

export default connect(mapStateToProps, {
  getCpuUsage: fetchCpuUsage,
  getNetworkUsage: fetchNetworkUsage
})(Overview);
