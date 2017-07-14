import React from "react";
import { Link } from "react-router-dom";

const SideBar = ({ match }) =>
  <div className="column is-2 hero is-fullheight is-hidden-mobile">
    <aside className="menu">
      <p className="menu-label">General</p>
      <ul className="menu-list">
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
          <ul>
            <li>
              <Link to="/topics/1">First topic</Link>
            </li>
            <li>
              <Link to="/topics/2">Second topic</Link>
            </li>
            <li>
              <Link to="/topics/3">Third topic</Link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  </div>;

export default SideBar;
