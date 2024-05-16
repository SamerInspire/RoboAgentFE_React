const { generalSuccessReducer } = require("src/hooks/reducers/store");
const {
  successHitHandle,
  failureHitHandle,
} = require("src/utils/HitHandiling");

jest.mock("src/hooks/reducers/store", () => ({
  generalSuccessReducer: jest.fn(),
}));

describe("Hit Handling", () => {
  it("should handle success response", () => {
    const result = {
      data: { roboAgentRs: { header: { responseStatus: { code: "00000" } } } },
    };
    const utils = { test: "test-utils" };

    successHitHandle(result, utils);

    expect(generalSuccessReducer).toHaveBeenCalledWith(result, utils);
  });

  it("should handle JWT failure", () => {
    const result = {
      response: {
        data: {
          roboAgentRs: { header: { responseStatus: { code: "JWT123" } } },
        },
      },
    };
    const utils = { test: "test-utils" };

    failureHitHandle(result, utils);

    // expect(window.location).toBe("/auth/login");
    expect(localStorage.getItem("userInfo")).toBe(null);
  });
});
