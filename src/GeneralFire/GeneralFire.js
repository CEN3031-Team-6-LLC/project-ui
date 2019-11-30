import React from "react";
import * as MaterialUI from "@material-ui/core";
import * as CustomWidgets from "../CustomWidgets";
import { validateFireBody } from "./validateFireBody";

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
  const [state, setState] = React.useState({});

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

      <MaterialUI.Button
        variant="contained"
        onClick={() => {
          const valid = validateFireBody(state);
          if (valid === true) {
            onFireClick(state);
          } else {
            console.log("Invalid fire request", valid.message);
          }
        }}
      >
        Calculate
      </MaterialUI.Button>
    </div>
  );
};

export default GeneralFire;
