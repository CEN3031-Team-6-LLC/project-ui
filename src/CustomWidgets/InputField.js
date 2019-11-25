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
    unitTogglelable,
    onUnitClick,
    onChange,
    data,
    title,
    type
  } = props;
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
      label={title}
      type={type}
      error={data ? data.error : false}
      helperText={data && data.error ? data.errorMessage : ""}
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
