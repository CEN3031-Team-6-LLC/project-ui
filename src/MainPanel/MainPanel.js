import React from "react";
import * as ChartJS from "react-chartjs-2";
import * as MaterialUI from "@material-ui/core";
import DataTable from "./DataTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";

const useStyles = MaterialUI.makeStyles(theme => {
  return {
    mainPanel: {
      height: "100%"
    },
    switch: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    fileExport: {
      color: "grey"
    }
  };
});

const MainPanel = props => {
  const {
    data,
    chartData,
    dataFetched,
    setDataFetched,
    lastReq,
    onExportClick
  } = props;
  const classes = useStyles();
  const [showChart, setShowChart] = React.useState(false);
  const chartRef = React.useRef();

  React.useEffect(() => {
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
        <MaterialUI.Tooltip title="Export Raw Data">
          <MaterialUI.Button
            onClick={() => onExportClick(lastReq)}
            className={classes.fileExport}
          >
            <FontAwesomeIcon icon={faFileExport} />
          </MaterialUI.Button>
        </MaterialUI.Tooltip>
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
