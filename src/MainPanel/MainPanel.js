import React from "react";
import * as ChartJS from "react-chartjs-2";
import * as MaterialUI from "@material-ui/core";
import DataTable from "./DataTable";

const useStyles = MaterialUI.makeStyles(theme => {
  return {
    mainPanel: {
      height: "100%"
    },
    switch: {
      display: "flex",
      justifyContent: "flex-start"
    }
  };
});

const MainPanel = props => {
  const { data, chartData, dataFetched, setDataFetched } = props;
  const classes = useStyles();
  const [showChart, setShowChart] = React.useState(false);
  const chartRef = React.useRef();

  React.useEffect(() => {
    console.log("Chart ref", chartRef);
    if (dataFetched && chartRef.current) {
      chartRef.current.chartInstance.chart.update();
      setDataFetched(false);
    }
  });
  return (
    <div className={classes.mainPanel}>
      <div className={classes.switch}>
        <MaterialUI.Switch
          onChange={e => {
            setShowChart(e.target.checked);
          }}
        />
      </div>
      {showChart ? (
        <ChartJS.Line
          ref={chartRef}
          data={chartData}
          width={100}
          height={500}
          options={{
            scales: {
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Distance"
                  },
                  type: "logarithmic",
                  position: "left",
                  ticks: {
                    min: 1, //minimum tick
                    max: 10000, //maximum tick
                    callback: function(value, index, values) {
                      return Number(value.toString());
                    }
                  },
                  afterBuildTicks: function(chartObj) {
                    chartObj.ticks = [];
                    chartObj.ticks.push(1);
                    chartObj.ticks.push(10);
                    chartObj.ticks.push(100);
                    chartObj.ticks.push(1000);
                    chartObj.ticks.push(10000);
                  }
                }
              ]
            },
            maintainAspectRatio: false
          }}
        />
      ) : (
        <DataTable data={data} />
      )}
    </div>
  );
};

export default MainPanel;
