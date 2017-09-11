import React from "react";
import Flatpickr from "react-flatpickr";

import "flatpickr/dist/themes/material_green.css";

const Reports = () => {
  return (
    <div>
      <div className="columns">
        <div className="column">
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">Reports</p>
            </header>
            <div className="card-content">
              <div className="content">
                <div className="field is-horizontal">
                  <div className="field-label">
                    <label className="label">Namespace</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <div className="select">
                          <select>
                            <option>default</option>
                            <option>kube-public</option>
                            <option>kube-system</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field is-horizontal">
                  <div className="field-label">
                    <label className="label">Resources</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <input
                        className="is-checkbox"
                        id="cpuCheckbox"
                        type="checkbox"
                        name="cpuCheckbox"
                        defaultChecked
                      />
                      <label htmlFor="cpuCheckbox">CPU</label>
                      <input
                        className="is-checkbox"
                        id="ramCheckbox"
                        type="checkbox"
                        name="ramCheckbox"
                        defaultChecked
                      />
                      <label htmlFor="ramCheckbox">RAM</label>
                      <input
                        className="is-checkbox"
                        id="networkCheckbox"
                        type="checkbox"
                        name="networkCheckbox"
                        defaultChecked
                      />
                      <label htmlFor="networkCheckbox">Network</label>
                      <input
                        className="is-checkbox"
                        id="storageCheckbox"
                        type="checkbox"
                        name="storageCheckbox"
                        defaultChecked
                      />
                      <label htmlFor="storageCheckbox">Storage</label>
                    </div>
                  </div>
                </div>

                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Duration</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <Flatpickr
                        options={{
                          inline: true,
                          mode: "range"
                        }}
                        onChange={v => console.info(v)}
                      />
                    </div>
                  </div>
                </div>

                <div className="field is-horizontal">
                  <div className="field-label">
                    <label className="label">Usage</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <input
                        className="is-radio"
                        id="hourlyRadio"
                        type="radio"
                        name="usageRadio"
                        defaultChecked
                      />
                      <label htmlFor="hourlyRadio">Hourly</label>
                      <input
                        className="is-radio"
                        id="dailyRadio"
                        type="radio"
                        name="usageRadio"
                      />
                      <label htmlFor="dailyRadio">Daily</label>
                    </div>
                  </div>
                </div>

                <div className="field is-horizontal">
                  <div className="field-label" />
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <button className="button is-primary">Calculate</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">Cost summary</p>
            </header>
            <div className="card-content">
              <div className="content">
                <table className="table is-striped">
                  <thead>
                    <tr>
                      <th>Resource</th>
                      <th>Usage</th>
                      <th>Per day</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>CPU</td>
                      <td>480 hours</td>
                      <td>0.82€</td>
                      <td>16.48€</td>
                    </tr>
                    <tr>
                      <td>RAM</td>
                      <td>480 hours</td>
                      <td>0.52€</td>
                      <td>10.37€</td>
                    </tr>
                    <tr>
                      <td>Network</td>
                      <td>4.78 GB</td>
                      <td>0.26€</td>
                      <td>5.14€</td>
                    </tr>
                    <tr>
                      <td>Disk</td>
                      <td>348 MB</td>
                      <td>0.06€</td>
                      <td>1.30€</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan={2}>TOTAL</th>
                      <th>2.20€</th>
                      <th>33.29€</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
