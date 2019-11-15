import React from "react";
import * as ChartJS from "react-chartjs-2";
import * as MaterialUI from "@material-ui/core";

const useStyles = MaterialUI.makeStyles(theme => {
  return {
    mainPanel: {
      height: "100%"
    }
  };
});

const MainPanel = props => {
  const { fireChartData } = props;
  const classes = useStyles();
  return (
    <div className={classes.mainPanel} {...props}>
      <ChartJS.Line
        data={fireChartData}
        width={100}
        height={500}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default MainPanel;
