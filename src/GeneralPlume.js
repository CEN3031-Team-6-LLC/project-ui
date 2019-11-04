import React from "react";
import * as MaterialUI from "@material-ui/core";

const useStyles = MaterialUI.makeStyles(theme => {
  return {
    generalPlume: {
      height: "100%",
      padding: 20
    }
  };
});

const GeneralPlume = props => {
  const classes = useStyles();

  return (
    <MaterialUI.Paper {...props} square className={classes.generalPlume}>
      <MaterialUI.TextField
        label="Source Amount"
        fullWidth
        InputProps={{
          startAdornment: (
            <MaterialUI.InputAdornment position="start">
              Ci
            </MaterialUI.InputAdornment>
          )
        }}
        variant="filled"
      />
    </MaterialUI.Paper>
  );
};

export default GeneralPlume;
