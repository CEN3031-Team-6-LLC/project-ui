import React from "react";
import * as MaterialUI from "@material-ui/core";
import "./InputField.css";

const useStyles = MaterialUI.makeStyles(theme => {
  return {
    textField: {
      "&>label": {
        background: "white"
      },
      marginBottom: 20,
      background: "white"
    },
    adornment: {
      "&:hover": {
        cursor: "pointer"
      }
    }
  };
});

const InputField = props => {
  const {
    placeholder,
    unit,
    onUnitClick,
    onChange,
    error,
    errorMessage,
    title,
    type
  } = props;
  const classes = useStyles();

  return (
    <MaterialUI.TextField
      fullWidth
      className={classes.textField}
      placeholder={placeholder}
      onChange={onChange}
      label={title}
      type={type}
      error={error}
      helperText={error ? errorMessage : ""}
      InputProps={{
        startAdornment: (
          <MaterialUI.InputAdornment
            className={classes.adornment}
            onClick={onUnitClick}
            position="start"
          >
            {unit}
          </MaterialUI.InputAdornment>
        )
      }}
      variant="outlined"
    />
  );
};

export default InputField;
