import React from "react";
import * as MaterialUI from "@material-ui/core";

const useStyles = MaterialUI.makeStyles(theme => {
  return {
    textField: {
      marginBottom: 20
    },
    adornment: {
      "&:hover": {
        cursor: "pointer"
      }
    }
  };
});

const InputField = props => {
  const { placeholder, unit, unitTogglelable, unit2, onChange } = props;
  const [state, setState] = React.useState(true);
  const classes = useStyles();

  const adornmentClick = () => {
    setState(!state);
  };

  return (
    <MaterialUI.TextField
      fullWidth
      className={classes.textField}
      placeholder={placeholder}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <MaterialUI.InputAdornment
            className={classes.adornment}
            onClick={unitTogglelable ? adornmentClick : () => {}}
            position="start"
          >
            {state ? unit : unit2}
          </MaterialUI.InputAdornment>
        )
      }}
      variant="outlined"
    />
  );
};

export default InputField;
