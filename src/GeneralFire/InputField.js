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
    errorMessage
  } = props;
  const [error, setError] = React.useState(false);
  const [value, setValue] = React.useState("");

  const _onChange = e => {
    setValue(e.currentTarget.value);
  };

  React.useEffect(() => {
    if (value < 0) {
      setError(true);
    } else {
      setError(false);
    }
  }, [value]);

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
  onChange: PropTypes.func.isRequired,
  unit: PropTypes.string.isRequired,
  setUnit: PropTypes.func.isRequired
};

export default InputField;
