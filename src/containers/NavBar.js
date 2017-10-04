import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div
      className="navbar is-info"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <div className="navbar-item">
          <span className="icon is-medium">
            <i className="fa fa-cloud" />
          </span>
          <span>
            <b>Kubernetes Overseer</b>
          </span>
        </div>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            <span class="icon is-small">
              <i class="fa fa-home" />
            </span>
            Overview
          </Link>
          <Link className="navbar-item" to="/reports">
            <span class="icon is-small">
              <i class="fa fa-search" />
            </span>Costs explorer
          </Link>
          <Link className="navbar-item" to="/forecasts">
            <span class="icon is-small">
              <i class="fa fa-line-chart" />
            </span>
            Forecasts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
