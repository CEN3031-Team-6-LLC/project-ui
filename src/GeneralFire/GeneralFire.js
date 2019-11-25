import React from "react";
import * as MaterialUI from "@material-ui/core";
import * as CustomWidgets from "../CustomWidgets";

const useStyles = MaterialUI.makeStyles(theme => {
  return {
    generalFire: {
      height: "100%",
      padding: 20,
      overflowY: "scroll"
    }
  };
});

const GeneralFire = props => {
  const { onFireClick, hidden } = props;
  const classes = useStyles();
  const [state, setState] = React.useState({
    sourceAmount: {
      amount: 0,
      error: false,
      errorMessage: "Error: Source Amount must be greater than 0",
      unit: "Ci"
    },
    fireCloudTop: {
      amount: 0,
      error: false,
      errorMessage: "Error: Please enter a value greater than 0",
      unit: "m"
    },
    windSpeed: {
      amount: 0,
      error: false,
      errorMessage: "Error: Windspeed must be between 0.1 and 50 m/s",
      unit: "m/s"
    },
    receptorHeight: {
      amount: 0,
      error: false,
      errorMessage: "Error: Receptor Height must be greater than zero",
      unit: "m"
    },

    fireRadius: {
      amount: 0,
      error: false,
      errorMessage: "Error: Radius must be greater than zero",
      unit: "m"
    },
    stability: "a"
  });

  const onUnitClick = (varName, unit1, unit2) => {
    if (state[varName].unit === unit1) {
      state[varName].unit = unit2;
      setState({ ...state });
    } else if (state[varName].unit === unit2) {
      state[varName].unit = unit1;
      setState({ ...state });
    }
  };

  return (
    <div className={classes.generalFire} hidden={hidden}>
      {/*------------------------------------------ Source Amount*/}
      <CustomWidgets.InputField
        placeholder="Source Amount"
        unit={state.sourceAmount.unit}
        unitTogglelable={true}
        title="Source Amount"
        type="number"
        onUnitClick={() => onUnitClick("sourceAmount", "Ci", "Bq")}
        data={state.sourceAmount}
        onChange={e => {
          const value = window.parseInt(e.target.value);
          if (value >= 0) {
            state.sourceAmount.amount = value;
            state.sourceAmount.error = false;
          } else {
            state.sourceAmount.error = true;
          }
          setState({ ...state });
        }}
      />

      {/*------------------------------------------ Fire Cloud Top*/}
      <CustomWidgets.InputField
        placeholder="Fire Cloud Top"
        unit="m"
        unitTogglelable={true}
        onUnitClick={() => onUnitClick("fireCloudTop", "m", "ft")}
        title="Fire Cloud Top"
        type="number"
        data={state.fireCloudTop}
        onChange={e => {
          const value = window.parseInt(e.target.value);
          if (value >= 0) {
            state.fireCloudTop.amount = value;
            state.fireCloudTop.error = false;
          } else {
            state.fireCloudTop.error = true;
          }
          setState({ ...state });
        }}
      />

      {/*----------------------------------------------- Wind Speed*/}
      <CustomWidgets.InputField
        placeholder="Wind Speed"
        unit={state.windSpeed.unit}
        unitTogglelable={true}
        title="Wind Speed"
        type="number"
        data={state.windSpeed}
        onUnitClick={() => onUnitClick("windSpeed", "m/s", "mph")}
        onChange={e => {
          const value = window.parseFloat(e.target.value);

          // Condition mph
          if (state.windSpeed.unit === "mph") {
            if (value >= 0.2 && value <= 110) {
              state.windSpeed.amount = value;
              state.windSpeed.error = false;
            } else {
              state.windSpeed.error = true;
            }

            // Condition m/s
          } else if (state.windSpeed.unit === "m/s") {
            if (value >= 0.1 && value <= 50) {
              state.windSpeed.amount = value;
              state.windSpeed.error = false;
            } else {
              state.windSpeed.error = true;
            }
          }

          setState({ ...state });
        }}
      />

      {/*----------------------------------------------- Receptor Height*/}
      <CustomWidgets.InputField
        placeholder="Receptor Height"
        unit={state.receptorHeight.unit}
        unitTogglelable={true}
        title="Receptor Height"
        type="number"
        onUnitClick={() => onUnitClick("receptorHeight", "m", "ft")}
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

      {/*--------------------------------------------------- Fire Radius*/}
      <CustomWidgets.InputField
        placeholder="Fire Radius"
        unit={state.fireRadius.unit}
        unitTogglelable={true}
        title="Fire Radius"
        type="number"
        data={state.fireRadius}
        onUnitClick={() => onUnitClick("fireRadius", "m", "ft")}
        onChange={e => {
          const value = window.parseInt(e.target.value);
          if (value >= 0) {
            state.fireRadius.amount = value;
          } else {
            state.fireRadius.error = true;
          }
          setState({ ...state });
        }}
      />

      {/*--------------------------------------------------- Stability*/}
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

      <MaterialUI.Button variant="contained" onClick={() => onFireClick(state)}>
        Calculate
      </MaterialUI.Button>
    </div>
  );
};

export default GeneralFire;
