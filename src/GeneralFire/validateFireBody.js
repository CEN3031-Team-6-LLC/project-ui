export const validateFireBody = req => {
  const keysExpected = [
    "sourceAmount",
    "fireCloudTop",
    "windSpeed",
    "receptorHeight",
    "fireRadius",
    "stability",
    "maxDistance",
    "distanceIncrement",
    "isotop",
    "nuclide",
    "lungClass"
  ];
  for (let i = 0; i < keysExpected.length; i++) {
    if (!Object.keys(req).includes(keysExpected[i])) {
      return { error: true, message: `req must contain ${keysExpected[i]}` };
    }
  }

  return true;
};
