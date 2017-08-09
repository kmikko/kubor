import React from 'react';
import { VictoryPie, VictoryTheme } from 'victory';

const PieChart = () => {
  const data = [
    { x: 'Node #1', y: 45 },
    { x: 'Node #2', y: 30 },
    { x: 'Node #3', y: 25 }
  ];

  return (
    <VictoryPie
      data={data}
      theme={VictoryTheme.material}
      labelRadius={50}
      style={{
        labels: { fill: '#363636', fontSize: 14, fontWeight: 'bold' }
      }}
    />
  );
};

export default PieChart;
