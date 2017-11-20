import React from 'react';
import PropTypes from 'prop-types';

import Hero from '../components/Hero';

class Overview extends React.Component {
  render() {
    return (
      <Hero
        title="Cluster overview"
        subtitle="Oversee state of your K8s cluster."
      />
    );
  }
}
export default Overview;
