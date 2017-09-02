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

const LineChart = () => {
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
        data={[
          [1504351500000, null],
          [1504351560000, 238],
          [1504351620000, 252],
          [1504351680000, 250],
          [1504351740000, 237],
          [1504351800000, 253],
          [1504351860000, 265],
          [1504351920000, 227],
          [1504351980000, 215],
          [1504352040000, 284],
          [1504352100000, 230],
          [1504352160000, 216],
          [1504352220000, 230],
          [1504352280000, 232],
          [1504352340000, 251],
          [1504352400000, 243],
          [1504352460000, 253],
          [1504352520000, 232],
          [1504352580000, 317],
          [1504352640000, 267],
          [1504352700000, 277],
          [1504352760000, 208],
          [1504352820000, 225],
          [1504352880000, 240],
          [1504352940000, 247],
          [1504353000000, 214],
          [1504353060000, 271],
          [1504353120000, 243],
          [1504353180000, 246],
          [1504353240000, 251],
          [1504353300000, 247]
        ]}
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

export default LineChart;
