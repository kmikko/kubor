import React from "react";
import { stylePrice, styleCostName } from "../utils/clusterUtils";
import HorizontalSelector from "./HorizontalSelector";
import { generateMonths } from "../utils/clusterUtils";

const CostFilter = ({
  costs,
  resourceFilters,
  onTimeChange,
  onResourceFilterChange
}) => {
  const months = generateMonths(new Date(), 6);
  const index = months.length - 1;
  return (
    <div className="card">
      <header className="card-header">
        <HorizontalSelector
          values={months}
          index={index - 1}
          onSelectionChange={onTimeChange}
        />
      </header>

      <div className="card-content">
        <div className="content">
          <div className="field">
            <label className="label">Resources</label>
            {costs.map((c, key) => (
              <div key={key} className="field">
                <input
                  className="is-checkbox"
                  id={`${c.type}Checkbox`}
                  type="checkbox"
                  name="resource"
                  value={[c.type, c.label].filter(x => x.length > 0).join("-")}
                  onChange={onResourceFilterChange}
                  checked={resourceFilters.includes(
                    [c.type, c.label].filter(x => x.length > 0).join("-")
                  )}
                />
                <label htmlFor={`${c.type}Checkbox`}>
                  {styleCostName(c)} ({stylePrice(c.cost, c.currency)})
                </label>
              </div>
            ))}
            <strong>TOTAL</strong>&nbsp;
            {stylePrice(costs.reduce((prev, curr) => prev + curr.cost, 0))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostFilter;
