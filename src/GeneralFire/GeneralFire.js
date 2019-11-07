import React from "react";
import * as MaterialUI from "@material-ui/core";
import * as CustomWidgets from "../CustomWidgets";

const useStyles = MaterialUI.makeStyles(theme => {
  return {
    generalFire: {
      height: "100vh",
      padding: 20
    }
  };
});

const GeneralFire = props => {
  const classes = useStyles();

  return (
    <MaterialUI.Paper {...props} square className={classes.generalFire}>
      <CustomWidgets.InputField
        placeholder="Source Amount"
        unit="Ci"
        unitTogglelable={true}
        unit2="Bq"
      />
      <CustomWidgets.InputField placeholder="Fire Cloud Top" unit="m" />
      <CustomWidgets.InputField placeholder="Wind Speed" unit="m/s" />
      <CustomWidgets.InputField placeholder="Receptor Heights" unit="m" />
      <CustomWidgets.RadioButtons
        title="Stability"
        options={[
          { value: "a", label: "A" },
          { value: "b", label: "B" },
          { value: "c", label: "C" },
          { value: "d", label: "D" }
        ]}
      />
    </MaterialUI.Paper>
  );
};

export default GeneralFire;
