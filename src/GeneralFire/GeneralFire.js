import React from "react";
import * as MaterialUI from "@material-ui/core";
import SourceAmount from "./InputFields/SourceAmount";
import { validateFireFields } from "./helpers";
import ErrorDialog from "CustomWidgets/ErrorDialog";
import { KeyStrings } from "../General/KeyStrings";

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
  const { hidden } = props;
  const classes = useStyles();
  const [sourceUnit, setSourceUnit] = React.useState("Ci");
  const [fieldValues, setFieldValues] = React.useState({
    sourceAmount: { error: false, value: "" }
  });
  const [error, setError] = React.useState({
    status: false,
    title: "",
    message: ""
  });

  return (
    <div className={classes.generalFire} hidden={hidden}>
      <SourceAmount
        unit={sourceUnit}
        setUnit={unit => setSourceUnit(unit)}
        onChange={val => {
          setFieldValues({ ...fieldValues, sourceAmount: { ...val } });
        }}
      />

      <MaterialUI.Button
        variant="contained"
        onClick={() => {
          const valid = validateFireFields(fieldValues);
          if (valid === true) {
            console.log("Success", valid);
            // TODO: Send api request here
          } else {
            setError({
              status: true,
              title: `Error: You must enter a valid ${KeyStrings[valid.key]}`,
              message: `Please enter a valid value for ${KeyStrings[valid.key]}`
            });
          }
        }}
      >
        Calculate
      </MaterialUI.Button>
      <ErrorDialog
        openDialog={error.status}
        title={error.title}
        message={error.message}
        onCloseDialog={() => {
          setError({
            status: false,
            title: "",
            message: ""
          });
        }}
      />
    </div>
  );
};

export default GeneralFire;
