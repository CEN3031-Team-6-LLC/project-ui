export const validatePlumeBody = req => {
    const keysExpected = [
      "maxDistance",
      "distanceIncrement",
      "sourceAmount",
      "releaseHeight",
      "windSpeed",
      "receptorHeight",
      "stability"
    ];
    for (let i = 0; i < keysExpected.length; i++) {
      if (!Object.keys(req).includes(keysExpected[i])) {
        return { error: true, message: `req must contain ${keysExpected[i]}` };
      }
    }
  
    return true;
  };