import React from "react";

const TopBar = () =>
  <nav className="nav has-shadow is-default">
    <div className="container">
      <div className="nav-left">
        <a className="nav-item">
          <span className="icon">
            <i className="fa fa-server" />
          </span>
          <span>Kubernetes Overseer</span>
        </a>
      </div>
      <div className="nav-right nav-menu is-hidden">
        <a className="nav-item is-tab">Item 1</a>
        <a className="nav-item is-tab">Item 2</a>
        <a className="nav-item is-tab">Item 3</a>
      </div>
    </div>
  </nav>;

export default TopBar;
