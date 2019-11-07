import React from "react";
import * as ChartJS from "react-chartjs-2";

const randomScalingFactor = () => {
  return Math.random() * 100;
};

var horizontalBarChartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Dataset 1",
      backgroundColor: "lightcoral",
      borderColor: "red",
      borderWidth: 1,
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor()
      ]
    },
    {
      label: "Dataset 2",
      backgroundColor: "lightblue",
      borderColor: "blue",
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor()
      ]
    }
  ]
};

const MainPanel = props => {
  const dummyRef = React.useRef(null);

  return (
    <div {...props}>
      <ChartJS.Line
        ref={dummyRef}
        data={horizontalBarChartData}
        width={100}
        height={500}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default MainPanel;
