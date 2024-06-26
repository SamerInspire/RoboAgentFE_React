const { default: AxiosHit } = require("../AxiosHit");
const {
  handleVerifyEmail,
  handleVerifyOTP,
  // handleRestPassword,
} = require("../auth/otp");

// Mocking AxiosHit
jest.mock("../AxiosHit");

describe("handleVerifyEmail", () => {
  let utils = {
    email: "test@example.com",
    setIsLoading: jest.fn(),
    handleClose: jest.fn(),
  };

  test("should call AxiosHit with correct parameters", async () => {
    await handleVerifyEmail(utils);

    expect(AxiosHit).toHaveBeenCalledWith(
      {
        method: "post",
        url: `/api/forgot-password/verify-mail/${utils.email}`,
      },
      utils
    );
  });

  test("should handle errors properly", async () => {
    const error = new Error("Test error");
    AxiosHit.mockRejectedValueOnce(error);

    console.log = jest.fn();

    await expect(handleVerifyEmail(utils)).rejects.toThrow("Test error");
    expect(console.log).toHaveBeenCalledWith(error);
  });
});

describe("handleVerifyOTP", () => {
  const utils = {
    token: "test-token",
    otp: "123456",
    setIsLoading: jest.fn(),
    handleClose: jest.fn(),
  };

  test("should call AxiosHit with correct parameters", async () => {
    await handleVerifyOTP(utils);

    expect(AxiosHit).toHaveBeenCalledWith(
      {
        method: "post",
        url: "/api/forgot-password/verify-otp",
        headers: { Authorization: `${utils.token}` },
        data: { otp: utils.otp },
      },
      utils
    );
  });

  test("should handle errors properly", async () => {
    const error = new Error("Test error");
    AxiosHit.mockRejectedValueOnce(error);

    console.log = jest.fn();

    await expect(handleVerifyOTP(utils)).rejects.toThrow("Test error");
    expect(console.log).toHaveBeenCalledWith(error);
  });
});

describe("handleRestPassword", () => {
  /* let utils = {
    newPass: "new-password",
    otpToken: "test-otp-token",
    setIsLoading: jest.fn(),
    handleClose: jest.fn(),
  }; */

  // test("should call AxiosHit with correct parameters", async () => {
  //   await handleRestPassword(utils);

  //   expect(AxiosHit).toHaveBeenCalledWith({
  //     method: "post",
  //     url: "/api/forgot-password/change-password",
  //     headers: { Authorization: `${utils.otpToken}` },
  //     data: { password: utils.newPass },
  //   });
  // });

  // test("should handle errors properly", async () => {
  //   const error = new Error("Test error");
  //   AxiosHit.mockRejectedValueOnce(error);

  //   console.log = jest.fn();

  //   await expect(handleRestPassword(utils)).rejects.toThrow("Test error");
  //   expect(console.log).toHaveBeenCalledWith(error);
  // });
});
