export const validateFireFields = fieldValues => {
  const keys = Object.keys(fieldValues);

  for (let i = 0; i < keys.length; i++) {
    if (fieldValues[keys[i]].value === "" || fieldValues[keys[i]].error) {
      return {
        key: keys[i],
        errorMessage: `The value entered for ${keys[i]} is invalid`
      };
    }
  }

  return true;
};


export const validatePlumeFields = fieldValues => {
  const keys = Object.keys(fieldValues);

  for (let i = 0; i < keys.length; i++) {
    if (fieldValues[keys[i]].value === "" || fieldValues[keys[i]].error) {
      return {
        key: keys[i],
        errorMessage: `The value entered for ${keys[i]} is invalid`
      };
    }
  }

  return true;
};