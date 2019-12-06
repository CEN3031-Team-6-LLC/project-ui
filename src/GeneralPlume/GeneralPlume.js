import React from "react";
import * as MaterialUI from "@material-ui/core";
import * as CustomWidgets from "../CustomWidgets";

const useStyles = MaterialUI.makeStyles(theme => {
  return {
    generalPlume: {
      height: "100%",
      padding: 20,
      background: "white"
    }
  };
});

const GeneralPlume = props => {
  const { onPlumeClick, hidden } = props;
  const classes = useStyles();
  const [state, setState] = React.useState({
    maxDistanceAmount: {
      amount: 0,
      error: false,
      errorMessage: "Error: Please enter a value greater than 0"
    },
    distanceIncrementAmount: {
      amount: 0,
      error: false,
      errorMessage: "Error: Please enter a value greater than 0"
    },
    sourceAmount: {
      amount: 0,
      error: false,
      errorMessage: "Error: Please enter a value greater than 0"
    },
    releaseHeight: {
      amount: 0,
      error: false,
      errorMessage: "Error: Please enter a value greater than 0"
    },
    windSpeed: {
      amount: 0,
      error: false,
      errorMessage: "Error: Windspeed must be between 0.1 and 50 m/s"
    },
    receptorHeight: {
      amount: 0,
      error: false,
      errorMessage: "Error: Receptor Height must be greater than zero"
    },
    stability: "a"
  });

  return (
    <div className={classes.generalPlume} hidden={hidden}>
      <CustomWidgets.InputField
        placeholder="Maximum Distance"
        unit="m"
        unitTogglelable={true}
        title="Maximum Distance"
        data={state.maxDistanceAmount}
        onChange={e => {
          const value = window.parseInt(e.target.value);
          if (value >= 0) {
            state.maxDistanceAmount.amount = value;
          } else {
            state.maxDistanceAmount.error = true;
          }
          setState({ ...state });
        }}
      />
      <CustomWidgets.InputField
        placeholder="Distance Increment"
        unit="m"
        title="Distance Increment"
        data={state.distanceIncrementAmount}
        onChange={e => {
          const value = window.parseInt(e.target.value);
          if (value >= 0) {
            state.distanceIncrementAmount.amount = value;
          } else {
            state.distanceIncrementAmount.error = true;
          }
          setState({ ...state });
        }}
      />
      <CustomWidgets.InputField
        placeholder="Source Amount"
        unit="Ci"
        unitTogglelable={true}
        title="Source Amount"
        unit2="Bq"
        data={state.sourceAmount}
        onChange={e => {
          const value = window.parseInt(e.target.value);
          if (value >= 0) {
            state.sourceAmount.amount = value;
          } else {
            state.sourceAmount.error = true;
          }
          setState({ ...state });
        }}
      />
      <CustomWidgets.InputField
        placeholder="Release Height"
        unit="m"
        title="Release Height"
        data={state.releaseHeight}
        onChange={e => {
          const value = window.parseInt(e.target.value);
          if (value >= 0) {
            state.releaseHeight.amount = value;
          } else {
            state.releaseHeight.error = true;
          }
          setState({ ...state });
        }}
      />
      <CustomWidgets.InputField
        placeholder="Wind Speed"
        unit="m/s"
        title="Wind Speed"
        data={state.windSpeed}
        onChange={e => {
          const value = window.parseInt(e.target.value);
          if (value >= 0) {
            state.windSpeed.amount = value;
          } else {
            state.windSpeed.error = true;
          }
          setState({ ...state });
        }}
      />
      <CustomWidgets.InputField
        placeholder="Receptor Height"
        unit="m"
        title="Receptor Height"
        data={state.receptorHeight}
        onChange={e => {
          const value = window.parseInt(e.target.value);
          if (value >= 0) {
            state.receptorHeight.amount = value;
          } else {
            state.receptorHeight.error = true;
          }
          setState({ ...state });
        }}
      />
      <CustomWidgets.RadioButtons
        title="Stability"
        options={[
          { value: "a", label: "A" },
          { value: "b", label: "B" },
          { value: "c", label: "C" },
          { value: "d", label: "D" }
        ]}
        onChange={e => {
          setState({ ...state, stability: e.target.value });
        }}
        value={state.stability}
      />
      <MaterialUI.Button
        variant="contained"
        onClick={() => onPlumeClick(state)}
      >
        Calculate
      </MaterialUI.Button>
    </div>
  );
};

export default GeneralPlume;
