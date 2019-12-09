/**
 *  Author: Lester G Dela Cruz
 * 
 *  Description: 
 * 
 */

import React from "react";
import * as CustomWidgets from "../CustomWidgets";
import { PropTypes } from "prop-types";

const InputField = props => {
  const {
    onChange,
    unit,
    setUnit,
    name,
    unitTogglelable,
    type,
    errorMessage,
    inputValidation,
    minVal
  } = props;
  const [error, setError] = React.useState(false);
  const [value, setValue] = React.useState("");

  const _onChange = e => {
    setValue(e.currentTarget.value);
  };

  React.useEffect(() => {
    let valueNum = parseFloat(value);
    if (isNaN(valueNum)) {
      valueNum = minVal | 0;
    }
    if (inputValidation(valueNum)) {
      setError(false);
    } else {
      setError(true);
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    onChange({ error, value });
    // eslint-disable-next-line
  }, [value, error]);

  return (
    <CustomWidgets.InputField
      placeholder={name}
      unitTogglelable={unitTogglelable}
      unit={unit}
      title={name}
      type={type}
      onUnitClick={() => (unit === "Ci" ? setUnit("Bq") : setUnit("Ci"))}
      error={error}
      errorMessage={errorMessage}
      onChange={_onChange}
    />
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  unitTogglelable: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  inputValidation: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  unit: PropTypes.string.isRequired,
  setUnit: PropTypes.func.isRequired
};

export default InputField;
