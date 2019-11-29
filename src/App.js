import React from "react";
import "./App.css";
import * as MaterialUI from "@material-ui/core";
import LeftControls from "./LeftControls";
import clsx from "clsx";
import MainPanel from "./MainPanel/MainPanel";
import { post } from "./post";
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
  const onExportClick = lastReq => {
    // TODO: Add export data fetch here
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
              let req = {};
              req.sourceAmount = fireReq.sourceAmount.amount;
              req.fireCloudTop = fireReq.fireCloudTop.amount;
              req.windSpeed = fireReq.windSpeed.amount;
              req.receptorHeight = fireReq.receptorHeight.amount;
              req.fireRadius = fireReq.fireRadius.amount;
              req.stability = fireReq.stability;
              req.maxDistance = 1000;
              req.distanceIncrement = 1;
              req.isotop = "H-3";
              req.nuclide = "H";
              req.lungClass = "F";
              req.type = "fire";

              fetch("https://quiet-atoll-96617.herokuapp.com/api/export/fire", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "http://localhost:3000",
                  "Access-Control-Request-Method": "POST"
                },
                body: JSON.stringify(req) //
              })
                .then(resp => {
                  resp.text().then(text => {
                    const urlPreHeaders = "data:text/csv;charset=utf-8,";
                    const csvUrl = urlPreHeaders + text;
                    const encodedCSVURI = encodeURI(csvUrl);
                    var link = document.createElement("a");
                    link.setAttribute("href", encodedCSVURI);
                    link.setAttribute("download", "my_data.csv");
                    document.body.appendChild(link); // Required for FF
                    link.click();
                    document.body.removeChild(link);
                  });
                })
                .catch(e => console.log(e));

              post({ body: req, type: "fire" }).then(data => {
                // data = createData(data);
                setState({
                  ...state,
                  previousFireData: data,
                  chartData: createData(data)
                });
                setLastReq(req);
                setDataFetched(true);
              });
            }}
            onPlumeShowGraphClick={plumeReq => {
              // * These are required exactly as they are. Otherwise it will give a CORS error.
              // * It's a confusing warning that needs to be fixed in api
              let req = {};
              req.sourceAmount = plumeReq.sourceAmount.amount;
              req.windSpeed = plumeReq.windSpeed.amount;
              req.receptorHeight = plumeReq.receptorHeight.amount;
              req.releaseHeight = plumeReq.releaseHeight.amount;
              req.stability = plumeReq.stability;
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
