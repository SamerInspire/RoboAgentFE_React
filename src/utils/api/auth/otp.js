import AxiosHit from "../AxiosHit";

export async function handleVerifyEmail(utils) {
  const { email, setIsLoading } = utils;
  setIsLoading(true);
  try {
    await AxiosHit(
      {
        method: "post",
        url: `/api/forgot-password/verify-mail/${email}`,
      },
      utils
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
export async function handleVerifyOTP(utils) {
  const { token, otp, setIsLoading } = utils;
  console.log(token);
  setIsLoading(true);
  try {
    await AxiosHit(
      {
        method: "post",
        url: "/api/forgot-password/verify-otp",
        headers: { Authorization: `${token}` },
        data: {
          otp: otp,
        },
      },
      utils
    );
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);

    console.log(error);
  }
}
export async function handleRestPassword(utils) {
  const { newPass, otpToken, setIsLoading } = utils;
  setIsLoading(true);
  try {
    await AxiosHit({
      method: "post",
      url: "/api/forgot-password/change-password",
      headers: { Authorization: `${otpToken}` },
      data: {
        password: newPass,
      },
      utils,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
