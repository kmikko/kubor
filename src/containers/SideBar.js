import React from "react";
import { Link } from "react-router-dom";

const SideBar = ({ match }) => (
  <div className="column is-2 hero is-fullheight is-hidden-mobile">
    <aside className="menu">
      <p className="menu-label">General</p>
      <ul className="menu-list">
        <li>
          <Link to="/">Overview</Link>
        </li>
        <li>
          <Link to="/reports">Reports</Link>
        </li>
        <li>
          <Link to="/forecasts">Forecasts</Link>
        </li>
      </ul>
    </aside>
  </div>
);

export default SideBar;
