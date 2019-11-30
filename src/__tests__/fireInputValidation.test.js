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
});
