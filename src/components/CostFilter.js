import React from "react";
import { stylePrice, styleCostName } from "../utils/clusterUtils";

const CostFilter = ({ costs, onTimeChange }) => {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          <span className="icon">
            <i className="fa fa-server" />
          </span>
          Cluster
        </p>
      </header>

      <div className="card-content">
        <div className="content">
          <div className="field">
            <label className="label">
              <span className="icon is-small">
                <i className="fa fa-calendar" />
              </span>
              Time period
            </label>
            <div className="control">
              <div className="select">
                <select onChange={onTimeChange}>
                  <option value="2017-09">September 2017</option>
                  <option value="2017-10">October 2017</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">
              <span className="icon is-small">
                <i className="fa fa-microchip" />
              </span>
              Resources
            </label>
            {costs.map((c, key) => (
              <div key={key} className="field">
                <input
                  className="is-checkbox"
                  id={`${c.type}Checkbox`}
                  type="checkbox"
                  name="resource"
                  value={c.type}
                  //onChange={this.handleResourceChange}
                  //checked={this.state.resources.indexOf("cpu") > -1}
                />
                <label htmlFor={`${c.type}Checkbox`}>
                  {styleCostName(c)} ({stylePrice(c.cost, c.currency)})
                </label>
              </div>
            ))}
            <span className="icon is-small">
              <i className="fa fa-shopping-cart" />
            </span>
            <strong>TOTAL</strong>&nbsp;
            {stylePrice(costs.reduce((prev, curr) => prev + curr.cost, 0))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostFilter;
