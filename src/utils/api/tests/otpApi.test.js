const { default: AxiosHit } = require("../AxiosHit");
const {
  handleVerifyEmail,
  handleVerifyOTP,
  handleRestPassword,
} = require("../auth/otp");

// Mocking AxiosHit
jest.mock("../AxiosHit");

describe("handleVerifyEmail", () => {
  let utils;

  beforeEach(() => {
    utils = { email: "test@example.com" };
  });

  test("should call AxiosHit with correct parameters", async () => {
    await handleVerifyEmail(utils);

    expect(AxiosHit).toHaveBeenCalledWith(
      {
        method: "post",
        url: `/forgot-password/verify-mail/${utils.email}`,
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
  let utils;

  beforeEach(() => {
    utils = { token: "test-token", otp: "123456" };
  });

  test("should call AxiosHit with correct parameters", async () => {
    await handleVerifyOTP(utils);

    expect(AxiosHit).toHaveBeenCalledWith(
      {
        method: "post",
        url: "/forgot-password/verify-otp",
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
  let utils;

  beforeEach(() => {
    utils = { newPass: "new-password", otpToken: "test-otp-token" };
  });

  test("should call AxiosHit with correct parameters", async () => {
    await handleRestPassword(utils);

    expect(AxiosHit).toHaveBeenCalledWith({
      method: "post",
      url: "/forgot-password/change-password",
      headers: { Authorization: `${utils.otpToken}` },
      data: { password: utils.newPass },
    });
  });

  test("should handle errors properly", async () => {
    const error = new Error("Test error");
    AxiosHit.mockRejectedValueOnce(error);

    console.log = jest.fn();

    await expect(handleRestPassword(utils)).rejects.toThrow("Test error");
    expect(console.log).toHaveBeenCalledWith(error);
  });
});
