import React from 'react';

import Card from '../components/Card';
import Table from '../components/Table';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';

const Dashboard = () =>
  <div className="columns is-multiline">
    <div className="column is-one-third">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">Title</p>
        </header>
        <div className="card-content">
          <div className="content">
            <BarChart />
          </div>
        </div>
      </div>
    </div>
    <div className="column is-one-third">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">Title</p>
        </header>
        <div className="card-content">
          <div className="content">
            <PieChart />
          </div>
        </div>
      </div>
    </div>
    <div className="column is-one-third">
      <Card />
    </div>

    <div className="column is-12">
      <Table />
    </div>
  </div>;

export default Dashboard;
