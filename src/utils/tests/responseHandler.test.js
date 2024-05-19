import { generalSuccessReducer } from "src/hooks/reducers/store";
import {
  JWTFalureHitHandle,
  getResponseShape,
  handleChangePassCodeActions,
  handleEmailCodeActions,
  handleGeneralErrorCodeActions,
  handleOTPCodeActions,
  handleUserCodeActions,
} from "../responseHandlers";

jest.mock("i18next", () => ({
  language: "en",
}));

jest.mock("src/hooks/reducers/store", () => ({
  generalSuccessReducer: jest.fn(),
}));

delete window.location;
window.location = {};

describe("getResponseShape", () => {
  const header = {
    responseStatus: {
      status: "success",
      arabicMsg: "نجاح",
      englishMsg: "Success",
    },
  };

  test("should return success response shape for code 00000", () => {
    const response = getResponseShape(header, "00000");
    expect(response).toEqual({
      message: "Success",
      alertStatus: "success",
      success: true,
    });
  });

  test("should return error response shape for other codes", () => {
    const response = getResponseShape(header, "99999");
    expect(response).toEqual({
      message: "Success",
      alertStatus: "error",
      success: false,
    });
  });
});

// Test cases for handleChangePassCodeActions
describe("handleChangePassCodeActions", () => {
  test("should handle success case", () => {
    const utils = {
      handleNext: jest.fn(),
      setAlertInfo: jest.fn(),
    };
    const result = {
      data: {
        roboAgentRs: {
          header: {
            responseStatus: {
              status: "success",
              arabicMsg: "نجاح",
              englishMsg: "Success",
            },
          },
        },
      },
    };
    handleChangePassCodeActions(result, "00000", utils);
    expect(utils.handleNext).toHaveBeenCalled();
    expect(utils.setAlertInfo).toHaveBeenCalledWith({
      alertType: "success",
      alertMsg: "Success",
    });
  });
});

// Test cases for JWTFalureHitHandle
describe("JWTFalureHitHandle", () => {
  test("should handle JWT failure", () => {
    localStorage.setItem("userInfo", "test");
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    JWTFalureHitHandle();
    expect(consoleSpy).toHaveBeenCalledWith("jwt failure");
    expect(window.location).toEqual("/auth/login");
    expect(localStorage.getItem("userInfo")).toBeNull();
    consoleSpy.mockRestore();
  });
});

// Test cases for handleOTPCodeActions
describe("handleOTPCodeActions", () => {
  test("should handle OTP code actions correctly", () => {
    const utils = {
      handleNext: jest.fn(),
      setAlertInfo: jest.fn(),
    };
    const result = {
      data: {
        roboAgentRs: {
          header: {
            responseStatus: {
              status: "success",
              arabicMsg: "نجاح",
              englishMsg: "Success",
            },
          },
        },
      },
    };
    handleOTPCodeActions(result, "00000", utils);
    expect(utils.setAlertInfo).toHaveBeenCalledWith({
      alertType: "success",
      alertMsg: "Success",
      open: true,
    });
  });
});

// Test cases for handleUserCodeActions
describe("handleUserCodeActions", () => {
  test("should handle user code actions and call generalSuccessReducer on success", async () => {
    const utils = {
      setAlertInfo: jest.fn(),
    };
    const result = {
      data: {
        roboAgentRs: {
          header: {
            responseStatus: {
              status: "success",
              arabicMsg: "نجاح",
              englishMsg: "Success",
            },
          },
        },
      },
    };
    await handleUserCodeActions(result, "00000", utils);
    expect(generalSuccessReducer).toHaveBeenCalledWith(result, utils);
    expect(utils.setAlertInfo).toHaveBeenCalledWith({
      alertType: "success",
      alertMsg: "Success",
    });
  });
});

// Test cases for handleGeneralErrorCodeActions
describe("handleGeneralErrorCodeActions", () => {
  test("should handle general error code actions", () => {
    const utils = {
      setAlertInfo: jest.fn(),
    };
    const result = {
      data: {
        roboAgentRs: {
          header: {
            responseStatus: {
              status: "error",
              arabicMsg: "خطأ",
              englishMsg: "Error",
            },
          },
        },
      },
    };
    handleGeneralErrorCodeActions(result, "99999", utils);
    expect(utils.setAlertInfo).toHaveBeenCalledWith({
      alertType: "error",
      alertMsg: "Error",
    });
  });
});

// Test cases for handleEmailCodeActions
describe("handleEmailCodeActions", () => {
  test("should handle email code actions correctly", () => {
    const utils = {
      handleNext: jest.fn(),
      setAlertInfo: jest.fn(),
      setOtpToken: jest.fn(),
    };
    const result = {
      data: {
        roboAgentRs: {
          header: {
            responseStatus: {
              status: "success",
              arabicMsg: "نجاح",
              englishMsg: "Success",
            },
          },
        },
      },
      headers: {
        authorization: "token",
      },
    };
    handleEmailCodeActions(result, "00000", utils);
    expect(utils.setOtpToken).toHaveBeenCalledWith("token");
    expect(utils.handleNext).toHaveBeenCalled();
    expect(utils.setAlertInfo).toHaveBeenCalledWith({
      alertType: "success",
      alertMsg: "Success",
      open: true,
    });
  });
});
