import { validatePlumeBody } from "../GeneralPlume/validatePlumeBody";

describe("Plume Input Validation", () => {
  
    test("expect sourceAmount to exists", () => {
    const req = {};
    expect(validatePlumeBody(req)).toEqual({
      error: true,
      message: "req must contain sourceAmount"
    });
  });


  test("expect release Height to exists", () => {
    const req = {
      sourceAmount: 0,
    };

    expect(validatePlumeBody(req)).toEqual({
      error: true,
      message: "req must contain windSpeed"
    });
  });


  test("expect windSpeed to exists", () => {
    const req = {
        sourceAmount: 0,

        releaseHeight: 0,
    };

    expect(validatePlumeBody(req)).toEqual({
      error: true,
      message: "req must contain windSpeed"
    });
  });


  test("expect receptorHeight to exists", () => {
    const req = {
        sourceAmount: 0,
        releaseHeight: 0,

        windSpeed: 0,
    };

    expect(validatePlumeBody(req)).toEqual({
      error: true,
      message: "req must contain receptorHeight"
    });
  });


  test("expect maxDistance to exists", () => {
    const req = {
        sourceAmount: 0,
        releaseHeight: 0,
        windSpeed: 0,

        receptorHeight: 0,
    };

    expect(validatePlumeBody(req)).toEqual({
      error: true,
      message: "req must contain maxDistance"
    });
  });


  test("expect distanceIncrement to exists", () => {
    const req = {
        sourceAmount: 0,
        releaseHeight: 0,
        windSpeed: 0,
        receptorHeight: 0,

        maxDistance: 0,
    };

    expect(validatePlumeBody(req)).toEqual({
      error: true,
      message: "req must contain distanceIncrement"
    });
  });








  test("expect stability to exists", () => {
    const req = {
        sourceAmount: 0,
        releaseHeight: 0,
        windSpeed: 0,
        receptorHeight: 0,
        maxDistance: 0,

        distanceIncrement: 0,
    };

    expect(validatePlumeBody(req)).toEqual({
      error: true,
      message: "req must contain stability"
    });
  });



  test("expect isotop to exists", () => {
    const req = {
      sourceAmount: 0,
      releaseHeight: 0,
      windSpeed: 0,
      receptorHeight: 0,
      maxDistance: 0,
      distanceIncrement: 0,

      stability: 0,
    };

    expect(validatePlumeBody(req)).toEqual({
      error: true,
      message: "req must contain isotop"
    });
  });

  test("expect nuclide to exists", () => {
    const req = {
      sourceAmount: 0,
      releaseHeight: 0,
      windSpeed: 0,
      receptorHeight: 0,
      maxDistance: 0,
      distanceIncrement: 0,
      stability: 0,

      isotop: 0
    };

    expect(validatePlumeBody(req)).toEqual({
      error: true,
      message: "req must contain nuclide"
    });
  });

  test("expect lungClass to exists", () => {
    const req = {
      sourceAmount: 0,
      releaseHeight: 0,
      windSpeed: 0,
      receptorHeight: 0,
      maxDistance: 0,
      distanceIncrement: 0,
      stability: 0,
      isotop: 0,

      nuclide: 0
    };

    expect(validatePlumeBody(req)).toEqual({
      error: true,
      message: "req must contain lungClass"
    });
  });
});
