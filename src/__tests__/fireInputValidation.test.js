/**
 *  Author: Lester G Dela Cruz
 * 
 *  Description: 
 * 
 */

import { validateFireBody } from "../GeneralFire/validateFireBody";

describe("Fire Input Validation", () => {
  
  
  test("expect sourceAmount to exists", () => {
    const req = {};
    expect(validateFireBody(req)).toEqual({
      error: true,
      message: "req must contain sourceAmount"
    });
  });

  test("expect fireCloudTop to exists", () => {
    const req = {
      sourceAmount: 0
    };

    expect(validateFireBody(req)).toEqual({
      error: true,
      message: "req must contain fireCloudTop"
    });
  });

  test("expect windSpeed to exists", () => {
    const req = {
      sourceAmount: 0,
      fireCloudTop: 0
    };

    expect(validateFireBody(req)).toEqual({
      error: true,
      message: "req must contain windSpeed"
    });
  });

  test("expect receptorHeight to exists", () => {
    const req = {
      sourceAmount: 0,
      fireCloudTop: 0,
      windSpeed: 0
    };

    expect(validateFireBody(req)).toEqual({
      error: true,
      message: "req must contain receptorHeight"
    });
  });

  test("expect fireRadius to exists", () => {
    const req = {
      sourceAmount: 0,
      fireCloudTop: 0,
      windSpeed: 0,
      receptorHeight: 0
    };

    expect(validateFireBody(req)).toEqual({
      error: true,
      message: "req must contain fireRadius"
    });
  });

  test("expect stability to exists", () => {
    const req = {
      sourceAmount: 0,
      fireCloudTop: 0,
      windSpeed: 0,
      receptorHeight: 0,
      fireRadius: 0
    };

    expect(validateFireBody(req)).toEqual({
      error: true,
      message: "req must contain stability"
    });
  });

  test("expect maxDistance to exists", () => {
    const req = {
      sourceAmount: 0,
      fireCloudTop: 0,
      windSpeed: 0,
      receptorHeight: 0,
      fireRadius: 0,
      stability: 0
    };

    expect(validateFireBody(req)).toEqual({
      error: true,
      message: "req must contain maxDistance"
    });
  });

  test("expect distanceIncrement to exists", () => {
    const req = {
      sourceAmount: 0,
      fireCloudTop: 0,
      windSpeed: 0,
      receptorHeight: 0,
      fireRadius: 0,
      stability: 0,
      maxDistance: 0
    };

    expect(validateFireBody(req)).toEqual({
      error: true,
      message: "req must contain distanceIncrement"
    });
  });

  test("expect isotop to exists", () => {
    const req = {
      sourceAmount: 0,
      fireCloudTop: 0,
      windSpeed: 0,
      receptorHeight: 0,
      fireRadius: 0,
      stability: 0,
      maxDistance: 0,
      distanceIncrement: 0
    };

    expect(validateFireBody(req)).toEqual({
      error: true,
      message: "req must contain isotop"
    });
  });

  test("expect nuclide to exists", () => {
    const req = {
      sourceAmount: 0,
      fireCloudTop: 0,
      windSpeed: 0,
      receptorHeight: 0,
      fireRadius: 0,
      stability: 0,
      maxDistance: 0,
      distanceIncrement: 0,

      isotop: 0
    };

    expect(validateFireBody(req)).toEqual({
      error: true,
      message: "req must contain nuclide"
    });
  });

  test("expect lungClass to exists", () => {
    const req = {
      sourceAmount: 0,
      fireCloudTop: 0,
      windSpeed: 0,
      receptorHeight: 0,
      fireRadius: 0,
      stability: 0,
      maxDistance: 0,
      isotop: 0,
      distanceIncrement: 0,

      nuclide: 0
    };

    expect(validateFireBody(req)).toEqual({
      error: true,
      message: "req must contain lungClass"
    });
  });
});
