export const validateFireBody = req => {
  if (!Object.keys(req).includes("sourceAmount")) {
    return { error: true, message: "req must contain sourceAmount" };
  }

  if (!Object.keys(req).includes("fireCloudTop")) {
    return { error: true, message: "req must contain fireCloudTop" };
  }

  if (!Object.keys(req).includes("windSpeed")) {
    return { error: true, message: "req must contain windSpeed" };
  }

  return true;
};
