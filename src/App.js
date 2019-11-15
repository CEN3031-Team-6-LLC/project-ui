import React from "react";
import "./App.css";
import * as MaterialUI from "@material-ui/core";
import LeftControls from "./LeftControls";
import clsx from "clsx";
import MainPanel from "./MainPanel/MainPanel";

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

// var horizontalBarChartData = {
//   datasets: [
//     {
//       label: "Hot Spot Awesome Graph",
//       backgroundColor: "lightcoral",
//       borderColor: "red",
//       borderWidth: 1,
//       data: []
//     }
//   ]
// };

const App = props => {
  const classes = useStyles();

  const [fireChartData, setFireChartData] = React.useState([]);
  return (
    <MaterialUI.ThemeProvider theme={theme}>
      <div className={clsx("App", classes.app)}>
        <LeftControls
          className={classes.leftControls}
          onFireShowGraphClick={fireReq => {
            fetch(
              "http://quiet-atoll-96617.herokuapp.com//api/calculations/fire",
              {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Request-Method": "POST"
                },
                body: JSON.stringify({
                  sourceAmount: 23,
                  fireCloudTop: 35,
                  windSpeed: 42,
                  receptorHeights: 50,
                  stability: "a"
                }) //
              }
            ).then(resp => console.log(resp));
          }}
        />
        <MainPanel
          className={classes.mainPanel}
          fireChartData={fireChartData}
        />
      </div>
    </MaterialUI.ThemeProvider>
  );
};

export default App;
