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

const App = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    generalFire: null
  });
  return (
    <MaterialUI.ThemeProvider theme={theme}>
      <div className={clsx("App", classes.app)}>
        <LeftControls
          className={classes.leftControls}
          onClick={fireReq => {
            console.log("Fire Reg", fireReq);
            setState({ ...state, generalFire: fireReq });
          }}
        />
        <MainPanel className={classes.mainPanel} fireReq={state.generalFire} />
      </div>
    </MaterialUI.ThemeProvider>
  );
};

export default App;
