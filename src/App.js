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
  let startBase = 10;
  dataArr.forEach((data, i) => {
    if (data.x && data.y && i % startBase === 0) {
      result.push(data);
      startBase *= 10;
    }
  });
  console.log("REsulte", result);
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

  const [fireChartData, setFireChartData] = React.useState([]);
  return (
    <MaterialUI.ThemeProvider theme={theme}>
      <div className={clsx("App", classes.app)}>
        <LeftControls
          className={classes.leftControls}
          onFireShowGraphClick={fireReq => {
            post({ body: fireReq, type: "fire" }).then(data => {
              setFireChartData(createData(data));
            });
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
