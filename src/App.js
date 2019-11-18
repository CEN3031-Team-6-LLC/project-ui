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
  return (
    <MaterialUI.ThemeProvider theme={theme}>
      <div className={clsx("App", classes.app)}>
        <LeftControls
          className={classes.leftControls}
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
            post({ body: fireReq, type: "fire" }).then(data => {
              // data = createData(data);
              setState({
                ...state,
                previousFireData: data,
                chartData: createData(data)
              });
            });
          }}
          onPlumeShowGraphClick={plumeReq => {
            post({ body: plumeReq, type: "plume" }).then(data => {
              // data = createData(data);
              setState({
                ...state,
                previousPlumeData: data,
                chartData: createData(data)
              });
            });
          }}
        />
        <MainPanel
          className={classes.mainPanel}
          data={
            state.tabIndex === "fire"
              ? state.previousFireData
              : state.previousPlumeData
          }
          chartData={state.chartData}
        />
      </div>
    </MaterialUI.ThemeProvider>
  );
};

export default App;
