import React from "react";
import "./App.css";
import * as MaterialUI from "@material-ui/core";
import LeftControls from "./LeftControls";
import clsx from "clsx";
import MainPanel from "./MainPanel/MainPanel";
import { post } from "./post";
import { exportData } from './export';
const useStyles = MaterialUI.makeStyles(theme => {
  return {
    app: {
      display: "flex",
      height: "100%"
    },
    leftControls: {
      flex: 1
    },
    mainPanel: {
      padding: 50,
      flex: 3
    }
  };
});

const theme = MaterialUI.createMuiTheme({
  palette: {
    primary: MaterialUI.colors.grey,
    secondary: MaterialUI.colors.deepPurple
  }
});
const createData = dataArr => {
  let result = [];
  dataArr.forEach((data, i) => {
    if (data.distance && data.concentration) {
      data.x = data.distance;
      data.y = data.concentration;
      result.push(data);
    }
  });
  return {
    datasets: [
      {
        label: "Hot Spot Awesome Graph",
        backgroundColor: "lightcoral",
        borderColor: "red",
        borderWidth: 1,
        data: result
      }
    ]
  };
};

const App = props => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    previousFireData: null,
    previousPlumeData: null,
    chartData: {},
    tabIndex: "fire"
  });

  const [dataFetched, setDataFetched] = React.useState(false);
  const [lastReq, setLastReq] = React.useState({});
  const [boundaries, setBoundary] = React.useState({
    maxDistance: 0,
    increment: 0
  });
  const onExportClick = () => {
    // TODO: Add export data fetch here
    if (!dataFetched || !lastReq) return;
    exportData(lastReq).then(data => console.log(data));
  };

  return (
    <MaterialUI.ThemeProvider theme={theme}>
      <div className={clsx("App", classes.app)}>
        <div className={classes.leftControls}>
          <LeftControls
            onSwitchTabs={tabIndex => {
              switch (tabIndex) {
                case 0: {
                  // fire graph tab
                  setState({ ...state, chartData: {}, tabIndex: "fire" });
                  if (state.previousFireData)
                    setState({
                      ...state,
                      chartData: createData(state.previousFireData),
                      tabIndex: "fire"
                    });
                  return;
                }
                case 1: {
                  // plume graph tab
                  setState({ ...state, chartData: {}, tabIndex: "plume" });
                  if (state.previousPlumeData)
                    setState({
                      ...state,
                      chartData: createData(state.previousPlumeData),
                      tabIndex: "plume"
                    });
                  return;
                }
                default: {
                  // error
                  throw new Error("No such tab exists!");
                }
              }
            }}
            onFireShowGraphClick={fireReq => {
              // * These are required exactly as they are. Otherwise it will give a CORS error.
              // * It's a confusing warning that needs to be fixed in api
              setBoundary({
                maxDistance: parseFloat(fireReq.maxDistance.value),
                increment: parseFloat(fireReq.distanceIncrement.value)
              });
              let req = {};
              req.sourceAmount = fireReq.sourceAmount.value;
              req.fireCloudTop = fireReq.fireCloudTop.value;
              req.windSpeed = fireReq.windSpeed.value;
              req.receptorHeight = fireReq.receptorHeight.value;
              req.fireRadius = fireReq.fireRadius.value;
              req.stability = fireReq.stability.value;
              req.maxDistance = parseFloat(fireReq.maxDistance.value);
              req.distanceIncrement = parseFloat(
                fireReq.distanceIncrement.value
              );
              req.isotop = fireReq.isotop.value;
              req.nuclide = fireReq.nuclide.value;
              req.lungClass = fireReq.lungClass.value;
              req.type = "fire";

              post({ body: req, type: "fire" }).then(data => {
                // data = createData(data);
                setState({
                  ...state,
                  previousFireData: data,
                  chartData: createData(data)
                });
                setLastReq({ body: req, type: "fire" });
                setDataFetched(true);
              });
            }}
            onPlumeShowGraphClick={plumeReq => {
              // * These are required exactly as they are. Otherwise it will give a CORS error.
              // * It's a confusing warning that needs to be fixed in api
              let req = {};
              req.sourceAmount = plumeReq.sourceAmount.value;
              req.windSpeed = plumeReq.windSpeed.value;
              req.receptorHeight = plumeReq.receptorHeight.value;
              req.releaseHeight = plumeReq.releaseHeight.value;
              req.stability = plumeReq.stability.value;
              req.maxDistance = 1000;
              req.distanceIncrement = 1;
              req.isotop = "H-3";
              req.nuclide = "H";
              req.lungClass = "F";
              req.type = "plume";

              post({ body: req, type: "plume" }).then(data => {
                // data = createData(data);
                setState({
                  ...state,
                  previousPlumeData: data,
                  chartData: createData(data)
                });
                setLastReq(req);
                setDataFetched(true);
              });
            }}
          />
        </div>
        <div className={classes.mainPanel}>
          <MainPanel
            data={
              state.tabIndex === "fire"
                ? state.previousFireData
                : state.previousPlumeData
            }
            maxDistance={boundaries.maxDistance}
            increment={boundaries.increment}
            dataFetched={dataFetched}
            setDataFetched={setDataFetched}
            chartData={state.chartData}
            lastReq={lastReq}
            onExportClick={onExportClick}
          />
        </div>
      </div>
    </MaterialUI.ThemeProvider>
  );
};

export default App;
