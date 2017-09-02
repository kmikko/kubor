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

const NetworkUsage = props => {
  const { data } = props;
  const strokeColors = ["#23d160", "#3273dc"];

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
        tickFormat={y => y / 1000}
        label="kBps"
        style={{
          axisLabel: { padding: 40 }
        }}
      />
      {data.map((v, i) =>
        <VictoryLine
          key={i}
          data={v.values}
          x={0}
          y={1}
          style={{ data: { stroke: strokeColors[i] } }}
          interpolation="natural"
          labels={d => `${(d.y / 1000).toFixed(2)} kBps`}
          labelComponent={<VictoryTooltip />}
        />
      )}
    </VictoryChart>
  );
};

export default NetworkUsage;
