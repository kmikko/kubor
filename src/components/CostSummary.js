import React from "react";
import PropTypes from "prop-types";
import { stylePrice, styleBytes } from "../utils/clusterUtils";

const CostSummary = ({ namespace, costs, customCosts, resourceFilters }) => {
  // TODO: Do not filter here
  const filteredCosts = Object.assign(
    ...Object.keys(costs)
      .filter(key => resourceFilters.includes(key))
      .map(key => ({ [key]: costs[key] }))
  );
  // TODO:
  const perHourCosts = Object.keys(costs).reduce(
    (total, key) => total + costs[key].perHourPrice,
    0
  );

  const totalCustomCosts = customCosts.reduce((total, x) => total + x.cost, 0);
  const totalCosts = Object.keys(costs).reduce(
    (total, key) => total + costs[key].totalPrice,
    totalCustomCosts
  );

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{namespace}</p>
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
              {filteredCosts.hasOwnProperty("cpu") ? (
                <tr>
                  <td>CPU</td>
                  <td>{costs.cpu.totalUsage} hours</td>
                  <td>{stylePrice(costs.cpu.perHourPrice)}</td>
                  <td>{stylePrice(costs.cpu.totalPrice)}</td>
                </tr>
              ) : null}
              {filteredCosts.hasOwnProperty("memory") ? (
                <tr>
                  <td>Memory</td>
                  <td>{costs.memory.totalUsage} hours</td>
                  <td>{stylePrice(costs.memory.perHourPrice)}</td>
                  <td>{stylePrice(costs.memory.totalPrice)}</td>
                </tr>
              ) : null}
              {filteredCosts.hasOwnProperty("network") ? (
                <tr>
                  <td>Network (Tx)</td>
                  <td>{styleBytes(costs.network.totalUsage)}</td>
                  <td>{stylePrice(costs.network.perHourPrice)}</td>
                  <td>{stylePrice(costs.network.totalPrice)}</td>
                </tr>
              ) : null}
              {filteredCosts.hasOwnProperty("storage") ? (
                <tr>
                  <td>Storage</td>
                  <td>{styleBytes(costs.storage.totalUsage)}</td>
                  <td>{stylePrice(costs.storage.perHourPrice)}</td>
                  <td>{stylePrice(costs.storage.totalPrice)}</td>
                </tr>
              ) : null}
              {customCosts.map(c => (
                <tr>
                  <td colSpan={3}>{c.label}</td>
                  <td>{stylePrice(c.cost)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={2}>TOTAL</th>
                <th>{stylePrice(perHourCosts)}</th>
                <th>{stylePrice(totalCosts)}</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CostSummary;
