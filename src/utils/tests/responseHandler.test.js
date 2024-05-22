// actions.test.js
import i18next from "i18next";
import {
  handleChangePassCodeActions,
  JWTFalureHitHandle,
  handleOTPCodeActions,
  handleUserCodeActions,
  handleGeneralErrorCodeActions,
  handleEmailCodeActions,
  handleGetAnswerFailure,
} from "../responseHandlers";
import { generalSuccessReducer } from "src/hooks/reducers/store";

jest.mock("i18next");
jest.mock("src/hooks/reducers/store", () => ({
  generalSuccessReducer: jest.fn(),
}));

describe("Code Actions", () => {
  const mockUtils = {
    handleNext: jest.fn(),
    setAlertInfo: jest.fn(),
    setOtpToken: jest.fn(),
    setLoading: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("handleChangePassCodeActions should handle success case", () => {
    const result = {
      data: {
        roboAgentRs: {
          header: {
            responseStatus: {
              arabicMsg: "نجاح",
              englishMsg: "Success",
              status: "success",
            },
            code: "00000",
          },
        },
      },
    };
    const code = "00000";
    i18next.language = "en";

    handleChangePassCodeActions(result, code, mockUtils);

    expect(mockUtils.handleNext).toHaveBeenCalled();
    expect(mockUtils.setAlertInfo).toHaveBeenCalledWith({
      alertType: true,
      alertMsg: "Success",
    });
  });

  it("handleChangePassCodeActions should handle failure case", () => {
    const result = {
      data: {
        roboAgentRs: {
          header: {
            responseStatus: {
              arabicMsg: "فشل",
              englishMsg: "Failure",
              status: "error",
            },
            code: "11111",
          },
        },
      },
    };
    const code = "11111";
    i18next.language = "en";

    handleChangePassCodeActions(result, code, mockUtils);

    expect(mockUtils.handleNext).not.toHaveBeenCalled();
    expect(mockUtils.setAlertInfo).toHaveBeenCalledWith({
      alertType: false,
      alertMsg: "Failure",
    });
  });

  it("handleOTPCodeActions should handle success case", () => {
    const result = {
      data: {
        roboAgentRs: {
          header: {
            responseStatus: {
              arabicMsg: "نجاح",
              englishMsg: "Success",
              status: "success",
              code: "00000",
            },
          },
        },
      },
    };
    const code = "00000";
    i18next.language = "en";

    handleOTPCodeActions(result, code, mockUtils);

    expect(mockUtils.handleNext).toHaveBeenCalled();
    expect(mockUtils.setAlertInfo).toHaveBeenCalledWith({
      alertType: "success",
      alertMsg: "Success",
    });
  });

  it("handleUserCodeActions should handle success case", async () => {
    const result = {
      data: {
        roboAgentRs: {
          header: {
            responseStatus: {
              arabicMsg: "نجاح",
              englishMsg: "Success",
              status: "success",
            },
            code: "00000",
          },
        },
      },
    };
    const code = "00000";
    i18next.language = "en";

    await handleUserCodeActions(result, code, mockUtils);

    expect(generalSuccessReducer).toHaveBeenCalledWith(result, mockUtils);
    expect(mockUtils.setAlertInfo).toHaveBeenCalledWith({
      alertType: "success",
      alertMsg: "Success",
    });
  });

  it("handleGeneralErrorCodeActions should set alert info", () => {
    const result = {
      data: {
        roboAgentRs: {
          header: {
            responseStatus: {
              arabicMsg: "خطأ",
              englishMsg: "Error",
              status: "error",
            },
            code: "11111",
          },
        },
      },
    };
    const code = "11111";
    i18next.language = "en";

    handleGeneralErrorCodeActions(result, code, mockUtils);

    expect(mockUtils.setAlertInfo).toHaveBeenCalledWith({
      alertType: "error",
      alertMsg: "Error",
    });
  });

  it("handleEmailCodeActions should handle success case and set OTP token", () => {
    const result = {
      headers: {
        authorization: "mock-token",
      },
      data: {
        roboAgentRs: {
          header: {
            responseStatus: {
              arabicMsg: "نجاح",
              englishMsg: "Success",
              status: "success",
            },
            code: "00000",
          },
        },
        headers: { authorization: "token123" },
      },
    };
    const code = "00000";
    i18next.language = "en";

    handleEmailCodeActions(result, code, mockUtils);

    expect(mockUtils.setOtpToken).toHaveBeenCalledWith("mock-token");
    expect(mockUtils.handleNext).toHaveBeenCalled();
    expect(mockUtils.setLoading).toHaveBeenCalled();
    expect(mockUtils.setAlertInfo).toHaveBeenCalledWith({
      alertType: "success",
      alertMsg: "Success",
      open: true,
    });
  });

  it("handleGetAnswerFailure should do nothing", () => {
    handleGetAnswerFailure();
    // Add assertions if any functionality is added to handleGetAnswerFailure
  });
});
