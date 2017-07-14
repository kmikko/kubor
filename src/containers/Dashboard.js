import React from "react";

import Card from "../components/Card";
import Table from "../components/Table";
import Message from "../components/Message";

const Dashboard = () =>
  <div className="columns is-multiline">
    <div className="column is-one-third">
      <Card />
    </div>
    <div className="column is-one-third">
      <Card />
    </div>
    <div className="column is-one-third">
      <Card />
    </div>

    <div className="column is-12">
      <Table />
    </div>
  </div>;

export default Dashboard;
