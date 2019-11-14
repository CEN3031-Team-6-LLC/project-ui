import React from "react";
import * as ChartJS from "react-chartjs-2";

var horizontalBarChartData = {
  datasets: [
    {
      label: "Hot Spot Awesome Graph",
      backgroundColor: "lightcoral",
      borderColor: "red",
      borderWidth: 1,
      data: []
    }
  ]
};

const MainPanel = props => {
  const { fireReq } = props;
  const dummyRef = React.useRef(null);
  console.log("Fetching", fireReq);

  const [state, setState] = React.useState(horizontalBarChartData);

  React.useEffect(() => {
    fetch("https://secure-ravine-69330.herokuapp.com/api/calculate/fire", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://sleepy-garden-43138.herokuapp.com"
      },
      body: JSON.stringify({
        sourceAmount: 23,
        releaseHeight: 35,
        windSpeed: 42,
        receptorHeights: 50,
        stability: "a"
      })
    })
      .then(resp => resp.json())
      .then(result => {
        let newData = [];
        result.forEach(item => {
          if (item.x !== null && item.y !== null && item.x % 1000 === 0) {
            newData.push(item);
          }
        });
        console.log("New Data", newData);
        state.datasets[0].data = newData;
        setState({ ...state });
      })
      .catch(err => {
        console.log(err);
      });
    return () => {};
  }, [fireReq]);

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
