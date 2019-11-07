import React from "react";
import * as MaterialUI from "@material-ui/core";
import * as CustomWidgets from "../CustomWidgets";

const useStyles = MaterialUI.makeStyles(theme => {
  return {
    generalPlume: {
      height: "100vh",
      padding: 20
    }
  };
});

const GeneralPlume = props => {
  const classes = useStyles();

  return (
    <MaterialUI.Paper {...props} square className={classes.generalPlume}>
      <CustomWidgets.InputField
        placeholder="Source Amount"
        unit="Ci"
        unitTogglelable={true}
        unit2="Bq"
      />
      <CustomWidgets.InputField placeholder="Release Height" unit="m" />
      <CustomWidgets.InputField placeholder="Wind Speed" unit="m/s" />
      <CustomWidgets.InputField placeholder="Receptor Heights" unit="m" />
    </MaterialUI.Paper>
  );
};

export default GeneralPlume;
