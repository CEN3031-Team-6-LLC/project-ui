import React from "react";
import * as MaterialUI from "@material-ui/core";
import InputField from "./InputField";
import { validateFireFields } from "./helpers";
import ErrorDialog from "CustomWidgets/ErrorDialog";
import { KeyStrings } from "../General/KeyStrings";
import { RadioButtons } from "CustomWidgets";
import Nuclide from "./Nuclide";
import LungClass from "./LungClass";

const useStyles = MaterialUI.makeStyles(theme => {
  return {
    generalFire: {
      height: "100%",
      padding: 20
    },
    icrpContainer: {
      display: "flex",
      justifyContent: "flex-start",
      "&>label": {
        margin: 0,
        alignItems: "flex-start"
      }
    },
    icrpLabel: {
      color: "grey"
    }
  };
});

const GeneralFire = props => {
  const { onFireClick, hidden } = props;
  const classes = useStyles();

  const [sourceUnit, setSourceUnit] = React.useState("Ci");
  const [icrp, seticrp] = React.useState(false);
  const [fieldValues, setFieldValues] = React.useState({
    sourceAmount: { error: false, value: "" },
    fireCloudTop: { error: false, value: "" },
    windSpeed: { error: false, value: "" },
    receptorHeight: { error: false, value: "" },
    fireRadius: { error: false, value: "" },
    stability: { error: false, value: "a" },
    maxDistance: { error: false, value: "" },
    distanceIncrement: { error: false, value: "" },
    isotop: { error: false, value: "" },
    nuclide: { error: false, value: "" },
    lungClass: { error: false, value: "" },
    unitSystem: "metric"
  });
  const [error, setError] = React.useState({
    status: false,
    title: "",
    message: ""
  });

  const toggleUnit = () => {
    if (fieldValues.unitSystem === "metric") {
      setFieldValues({ ...fieldValues, unitSystem: "imperial" });
    } else {
      setFieldValues({ ...fieldValues, unitSystem: "metric" });
    }
  };

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
        unit={fieldValues.unitSystem === "metric" ? "m" : "ft"}
        inputValidation={value => value >= 0}
        setUnit={toggleUnit}
        onChange={val => {
          setFieldValues({ ...fieldValues, fireCloudTop: { ...val } });
        }}
      />

      <InputField
        name="Wind Speed"
        unitTogglelable={true}
        type="number"
        errorMessage={`Error: Wind Speed must be between ${
          fieldValues.unitSystem === "metric"
            ? "0.1 and 50 m/s"
            : "0.2 and 111 mph"
        }`}
        unit={fieldValues.unitSystem === "metric" ? "m/s" : "mph"}
        inputValidation={value => {
          if (fieldValues.unitSystem === "m/s") {
            return 0 <= value && value <= 50;
          } else {
            return 0 <= value && value <= 111;
          }
        }}
        setUnit={toggleUnit}
        onChange={val => {
          setFieldValues({ ...fieldValues, windSpeed: { ...val } });
        }}
      />

      <InputField
        name="Receptor Height"
        unitTogglelable={true}
        type="number"
        errorMessage="Error: Receptor Height must be greater than 0"
        unit={fieldValues.unitSystem === "metric" ? "m" : "ft"}
        inputValidation={value => value >= 0}
        setUnit={toggleUnit}
        onChange={val => {
          setFieldValues({ ...fieldValues, receptorHeight: { ...val } });
        }}
      />

      <InputField
        name="Fire Radius"
        unitTogglelable={true}
        type="number"
        errorMessage="Error: Fire Radius must be greater than 0"
        unit={fieldValues.unitSystem === "metric" ? "m" : "ft"}
        inputValidation={value => value >= 0}
        setUnit={toggleUnit}
        onChange={val => {
          setFieldValues({ ...fieldValues, fireRadius: { ...val } });
        }}
      />

      <InputField
        name="Max Distance"
        unitTogglelable={true}
        type="number"
        errorMessage="Error: Max Distance must be greater than 0 and greater than distance increment"
        unit={fieldValues.unitSystem === "metric" ? "m" : "ft"}
        inputValidation={value => {
          if (fieldValues.distanceIncrement.value === "") {
            return value >= 0;
          } else {
            return value >= parseFloat(fieldValues.distanceIncrement.value);
          }
        }}
        setUnit={toggleUnit}
        onChange={val => {
          setFieldValues({ ...fieldValues, maxDistance: { ...val } });
        }}
      />

      <InputField
        name="Distance Increment"
        unitTogglelable={true}
        type="number"
        errorMessage="Error: Distance Increment must be greater than 0 and less than max distance"
        unit={fieldValues.unitSystem === "metric" ? "m" : "ft"}
        minVal={1}
        inputValidation={value => {
          if (fieldValues.maxDistance.value === "") {
            return value >= 1;
          } else {
            return (
              1 <= value && value <= parseFloat(fieldValues.maxDistance.value)
            );
          }
        }}
        setUnit={toggleUnit}
        onChange={val => {
          setFieldValues({ ...fieldValues, distanceIncrement: { ...val } });
        }}
      />

      <RadioButtons
        title="Stability"
        options={[
          { value: "a", label: "A" },
          { value: "b", label: "B" },
          { value: "c", label: "C" },
          { value: "d", label: "D" },
          { value: "e", label: "E" },
          { value: "f", label: "F" }
        ]}
        value={fieldValues.stability.value}
        onChange={e => {
          console.log("value", e.currentTarget.value);
          setFieldValues({
            ...fieldValues,
            stability: { error: false, value: e.currentTarget.value }
          });
        }}
      />

      <Nuclide
        setValue={nuclidePair => {
          setFieldValues({
            ...fieldValues,
            isotop: { error: false, value: nuclidePair.isotop },
            nuclide: { error: false, value: nuclidePair.nuclide }
          });
        }}
        value={fieldValues.isotop}
      />

      <LungClass
        isotope={icrp ? fieldValues.nuclide.value : fieldValues.isotop.value}
        onChange={e => {
          const value = e.target.value;
          setFieldValues({
            ...fieldValues,
            lungClass: { error: false, value: value }
          });
        }}
        value={fieldValues.lungClass.value}
        icrp={icrp}
      />

      <div className={classes.icrpContainer}>
        <MaterialUI.FormControlLabel
          classes={{ label: classes.icrpLabel }}
          value="ICRP"
          control={
            <MaterialUI.Switch
              color="secondary"
              onChange={() => seticrp(!icrp)}
            />
          }
          label="ICRP"
          labelPlacement="top"
        />
      </div>

      <MaterialUI.Button
        variant="contained"
        onClick={() => {
          const valid = validateFireFields(fieldValues);
          if (valid === true) {
            onFireClick(fieldValues);
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
