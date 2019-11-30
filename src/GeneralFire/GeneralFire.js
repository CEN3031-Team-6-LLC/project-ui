import React from "react";
import * as MaterialUI from "@material-ui/core";
import SourceAmount from "./InputFields/SourceAmount";
import { validateFireFields } from "./helpers";

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
          const valid = validateFireFields(fieldValues);
          if (valid === true) {
            console.log("Success", valid);
          } else {
            console.log("invalid", valid.key, valid.errorMessage);
          }
        }}
      >
        Calculate
      </MaterialUI.Button>
    </div>
  );
};

export default GeneralFire;
