import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip
} from "victory";

const Chart = () => {
  const data = [
    { quarter: 1, earnings: 13000, label: 13000 },
    { quarter: 2, earnings: 16500, label: 16500 },
    { quarter: 3, earnings: 14250, label: 14250 },
    { quarter: 4, earnings: 19000, label: 19000 }
  ];
  return (
    <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
      <VictoryAxis
        // x-axis
        tickValues={[1, 2, 3, 4]}
        tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
      />
      <VictoryAxis
        // y-axis
        dependentAxis
        tickFormat={x => `$${x / 1000}k`}
      />
      <VictoryBar
        data={data}
        x="quarter"
        y="earnings"
        labelComponent={<VictoryTooltip />}
      />
    </VictoryChart>
  );
};

export default Chart;
