import React from "react";
import * as MaterialUI from "@material-ui/core";

const useStyles = MaterialUI.makeStyles(theme => {
  return {
    formControl: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: 0
    }
  };
});

const RadioButtons = props => {
  const { title, options } = props;
  const classes = useStyles();
  return (
    <MaterialUI.FormControl
      variant="filled"
      className={classes.formControl}
      component="div"
    >
      <MaterialUI.FormLabel component="legend">{title}</MaterialUI.FormLabel>
      <MaterialUI.RadioGroup
        aria-label="gender"
        name="gender1"
        value={options[0].value}
        onChange={() => {}}
      >
        {options.map((option, i) => {
          return (
            <MaterialUI.FormControlLabel
              key={i}
              value={option.value}
              control={<MaterialUI.Radio />}
              label={option.label}
            />
          );
        })}
      </MaterialUI.RadioGroup>
    </MaterialUI.FormControl>
  );
};

export default RadioButtons;
