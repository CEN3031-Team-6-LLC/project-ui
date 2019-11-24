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
  const { onFireClick } = props;
  const classes = useStyles();
  const [state, setState] = React.useState({
    sourceAmount: {
      amount: 0,
      error: false,
      errorMessage: "Error: Source Amount must be greater than 0"
    },
    fireCloudTop: {
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

    fireRadius: {
      amount: 0,
      error: false,
      errorMessage: "Error: Radius must be greater than zero"
    },
    stability: "a"
  });

  return (
    <div className={classes.generalFire}>
      {/*------------------------------------------ Source Amount*/}
      <CustomWidgets.InputField
        placeholder="Source Amount"
        unit="Ci"
        unitTogglelable={true}
        unit2="Bq"
        title="Source Amount"
        type="number"
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

      {/*------------------------------------------ Fire Cloud Top*/}
      <CustomWidgets.InputField
        placeholder="Fire Cloud Top"
        unit="m"
        unitTogglelable={true}
        unit2="ft"
        title="Fire Cloud Top"
        type="number"
        data={state.fireCloudTop}
        onChange={e => {
          const value = window.parseInt(e.target.value);
          if (value >= 0) {
            state.fireCloudTop.amount = value;
          } else {
            state.fireCloudTop.error = true;
          }
          setState({ ...state });
        }}
      />

      {/*----------------------------------------------- Wind Speed*/}
      <CustomWidgets.InputField
        placeholder="Wind Speed"
        unit="m/s"
        unitTogglelable={true}
        unit2="mph"
        title="Wind Speed"
        type="number"
        data={state.windSpeed}
        onChange={e => {
          const value = window.parseFloat(e.target.value);

          // Condition mph
          if (state.unitTogglelable === true) {
            //<<------- This line needs fix

            if (value >= 0.2 && value <= 110) {
              state.fireCloudTop.amount = value;
            } else {
              state.windSpeed.error = true;
              state.windSpeed.errorMessage =
                "Error: Value must be between 0.2 and 110 mph";
            }

            // Condition m/s
          } else if (value >= 0.1 && value <= 50) {
            state.windSpeed.amount = value;
          } else {
            state.windSpeed.error = true;
          }

          setState({ ...state });
        }}
      />

      {/*----------------------------------------------- Receptor Height*/}
      <CustomWidgets.InputField
        placeholder="Receptor Height"
        unit="m"
        unitTogglelable={true}
        unit2="ft"
        title="Receptor Height"
        type="number"
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
        unit="m"
        unitTogglelable={true}
        unit2="ft"
        title="Fire Radius"
        type="number"
        data={state.fireRadius}
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
        Show Graph
      </MaterialUI.Button>
    </div>
  );
};

export default GeneralFire;
