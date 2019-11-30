import React from "react";
import * as MaterialUI from "@material-ui/core";
import InputField from "./InputField";
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
  const [lengthUnit, setLengthUnit] = React.useState("m");
  const [speedUnit, setSpeedUnit] = React.useState("m/s");
  const [fieldValues, setFieldValues] = React.useState({
    sourceAmount: { error: false, value: "" },
    fireCloudTop: { error: false, value: "" },
    windSpeed: { error: false, value: "" },
    receptorHeight: { error: false, value: "" },
    fireRadius: { error: false, value: "" },
    stability: { error: false, value: "" },
    maxDistance: { error: false, value: "" },
    distanceIncrement: { error: false, value: "" },
    isotop: { error: false, value: "" },
    nuclide: { error: false, value: "" },
    lungClass: { error: false, value: "" }
  });
  const [error, setError] = React.useState({
    status: false,
    title: "",
    message: ""
  });

  return (
    <div className={classes.generalFire} hidden={hidden}>
      <InputField
        name="Source Amount"
        unitTogglelable={true}
        type="number"
        errorMessage="Error: Source Amount must be greater than 0"
        unit={sourceUnit}
        setUnit={unit => setSourceUnit(unit)}
        inputValidation={value => value >= 0}
        onChange={val => {
          setFieldValues({ ...fieldValues, sourceAmount: { ...val } });
        }}
      />

      <InputField
        name="Fire Cloud Top"
        unitTogglelable={true}
        type="number"
        errorMessage="Error: Fire Cloud Top must be greater than 0"
        unit={lengthUnit}
        inputValidation={value => value >= 0}
        setUnit={() => setLengthUnit(lengthUnit === "m" ? "ft" : "m")}
        onChange={val => {
          setFieldValues({ ...fieldValues, fireCloudTop: { ...val } });
        }}
      />

      <InputField
        name="Wind Speed"
        unitTogglelable={true}
        type="number"
        errorMessage={`Error: Wind Speed must be between ${
          speedUnit === "m/s" ? "0.1 and 50 m/s" : "0.2 and 111 mph"
        }`}
        unit={speedUnit}
        inputValidation={value => {
          if (speedUnit === "m/s") {
            return 0 <= value && value <= 50;
          } else {
            return 0 <= value && value <= 111;
          }
        }}
        setUnit={() => setSpeedUnit(speedUnit === "m/s" ? "mph" : "m/s")}
        onChange={val => {
          setFieldValues({ ...fieldValues, windSpeed: { ...val } });
        }}
      />

      <InputField
        name="Receptor Height"
        unitTogglelable={true}
        type="number"
        errorMessage="Error: Receptor Height must be greater than 0"
        unit={lengthUnit}
        inputValidation={value => value >= 0}
        setUnit={() => setLengthUnit(lengthUnit === "m" ? "ft" : "m")}
        onChange={val => {
          setFieldValues({ ...fieldValues, receptorHeight: { ...val } });
        }}
      />

      <InputField
        name="Fire Radius"
        unitTogglelable={true}
        type="number"
        errorMessage="Error: Fire Radius must be greater than 0"
        unit={lengthUnit}
        inputValidation={value => value >= 0}
        setUnit={() => setLengthUnit(lengthUnit === "m" ? "ft" : "m")}
        onChange={val => {
          setFieldValues({ ...fieldValues, fireRadius: { ...val } });
        }}
      />

      <MaterialUI.Button
        variant="contained"
        onClick={() => {
          const valid = validateFireFields(fieldValues);
          console.log("valid", valid);
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
