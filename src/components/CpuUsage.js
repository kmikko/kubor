import React from "react";
import { format } from "date-fns";

import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryTooltip,
  VictoryVoronoiContainer
} from "victory";

const CpuUsage = props => {
  const { data } = props;
  let values = [];

  if (data.length > 0) {
    values = data.find(d => d.name === "cpu/usage_rate").values;
  }

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      scale={{ x: "time", y: "linear" }}
      containerComponent={<VictoryVoronoiContainer />}
    >
      <VictoryAxis
        // x-axis
        tickFormat={x => format(x, "HH:mm")}
      />
      <VictoryAxis
        // y-axis
        dependentAxis
        label="Millicores"
        style={{
          axisLabel: { padding: 40 }
        }}
      />
      <VictoryLine
        data={values}
        x={0}
        y={1}
        style={{ data: { stroke: "#23d160" } }}
        interpolation="natural"
        labels={d => d.y}
        labelComponent={<VictoryTooltip />}
        //domain={{ y: [0, 1000] }}
      />
    </VictoryChart>
  );
};

export default CpuUsage;
