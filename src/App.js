import React from "react";
import "./App.css";
import * as ChartJS from "react-chartjs-2";

const randomScalingFactor = () => {
  return Math.random() * 100;
};

var horizontalBarChartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Dataset 1",
      backgroundColor: "red",
      borderColor: "lightcoral",
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
      backgroundColor: "blue",
      borderColor: "lightgrey",
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

const App = props => {
  const dummyRef = React.useRef(null);

  React.useEffect(() => {
    console.log(dummyRef.current.chartInstance.data);
  });
  return (
    <div className="App">
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

export default App;
