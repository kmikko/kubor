import React from "react";

import Tag from "../components/Tag";

const Table = () =>
  <div className="card">
    <table className="table is-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Type</th>
          <th>Status</th>
          <th>Image ID</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>api-server-1</td>
          <td>Backend</td>
          <td>
            <span className="tag is-success">Up</span>
          </td>
          <td>3eea7bcd01e2</td>
        </tr>
        <tr>
          <td>2</td>
          <td>api-server-2</td>
          <td>Backend</td>
          <td>
            <span className="tag is-success">Up</span>
          </td>
          <td>3eea7bcd01e2</td>
        </tr>
        <tr>
          <td>3</td>
          <td>api-server-3</td>
          <td>Backend</td>
          <td>
            <Tag type="warning" text="Shutting down" />
          </td>
          <td>3eea7bcd01e2</td>
        </tr>
        <tr>
          <td>4</td>
          <td>frontend-1</td>
          <td>Frontend</td>
          <td>
            <span className="tag is-success">Up</span>
          </td>
          <td>9e455f733647</td>
        </tr>
        <tr>
          <td>5</td>
          <td>lb-1</td>
          <td>Load balancer</td>
          <td>
            <span className="tag is-success">Up</span>
          </td>
          <td>80b6fd02aae7</td>
        </tr>
        <tr>
          <td>6</td>
          <td>frontend-2</td>
          <td>Frontend</td>
          <td>
            <span className="tag is-danger">Powered off</span>
          </td>
          <td>9e455f733647</td>
        </tr>
      </tbody>
    </table>
  </div>;

export default Table;
