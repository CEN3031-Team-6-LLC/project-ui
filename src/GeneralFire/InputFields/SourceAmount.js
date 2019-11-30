import React from "react";
import * as CustomWidgets from "../../CustomWidgets";
import { PropTypes } from "prop-types";

const SourceAmount = props => {
  const { onSourceAmountChange, unit, setUnit } = props;
  const name = "Source Amount";
  const unitTogglelable = true;
  const type = "number";
  const errorMessage = "Error: Source Amount must be greater than 0";
  const [error, setError] = React.useState(false);
  const [value, setValue] = React.useState("");

  const onChange = e => {
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
    onSourceAmountChange({ error, value });
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
      onChange={onChange}
    />
  );
};

SourceAmount.propTypes = {
  onSourceAmountChange: PropTypes.func.isRequired,
  unit: PropTypes.string.isRequired,
  setUnit: PropTypes.func.isRequired
};

export default SourceAmount;
