import React from "react";
import * as MaterialUI from "@material-ui/core";
import * as CustomWidgets from "../CustomWidgets";
import { validateFireBody } from "./validateFireBody";
import SourceAmount from "./InputFields/SourceAmount";

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
  const [units, setUnits] = React.useState({
    sourceAmount: "Ci"
  });
  const [fieldValues, setFieldValues] = React.useState({
    sourceAmount: { error: false, value: "" }
  });

  return (
    <div className={classes.generalFire} hidden={hidden}>
      <SourceAmount
        unit={units.sourceAmount}
        setUnit={unit => setUnits({ ...units, sourceAmount: unit })}
        onSourceAmountChange={val => {
          setFieldValues({ ...fieldValues, sourceAmount: { ...val } });
        }}
      />

      <MaterialUI.Button
        variant="contained"
        onClick={() => {
          const keys = Object.keys(fieldValues);
          for (let i = 0; i < keys.length; i++) {
            if (
              fieldValues[keys[i]].value === "" ||
              fieldValues[keys[i]].error
            ) {
              console.log("invalid", keys[i]);
              break;
            }
          }
        }}
      >
        Calculate
      </MaterialUI.Button>
    </div>
  );
};

export default GeneralFire;
