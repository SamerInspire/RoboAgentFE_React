import i18next from "i18next";
import { generalSuccessReducer } from "src/hooks/reducers/store";

export const getResponseShape = (header, code) => {
  const currentLang = i18next.language;
  const { status, arabicMsg, englishMsg } = header.responseStatus;

  switch (code) {
    ///success
    case "00000":
      return {
        message: currentLang == "ar" ? arabicMsg : englishMsg,
        alertStatus: status,
        success: true,
      };
    default: {
      return {
        message: currentLang == "ar" ? arabicMsg : englishMsg,
        alertStatus: "error",
      };
    }
  }
};
export function handleChangePassCodeActions(result, code, utils) {
  const { header } = result.data.roboAgentRs;
  const { handleNext, setAlertInfo } = utils;

  const { message, success } = getResponseShape(header, code);
  if (success == "success") handleNext();
  setAlertInfo({ alertType: success, alertMsg: message });
}
export function JWTFalureHitHandle() {
  localStorage.removeItem("userInfo");
}
export function handleOTPCodeActions(result, code, utils) {
  const { header } = result.data.roboAgentRs;
  const { handleNext, setAlertInfo } = utils;

  const { message, success } = getResponseShape(header.code);
  if (success == "success") handleNext();
  setAlertInfo({ alertType: success, alertMsg: message });
}

export async function handleUserCodeActions(result, code, utils) {
  const { header } = result.data.roboAgentRs;
  const { setAlertInfo } = utils;
  const { message, alertStatus, success } = getResponseShape(header, code);
  if (success) {
    generalSuccessReducer(result, utils);
  }
  setAlertInfo({
    alertType: alertStatus,
    alertMsg: message,
  });
  return result;
}

export function handleGeneralErrorCodeActions(result, code, utils) {
  const { header } = result.data.roboAgentRs;
  const { setAlertInfo } = utils;

  const { message, success } = getResponseShape(header, code);
  setAlertInfo({ alertType: success, alertMsg: message });
}

export function handleEmailCodeActions(result, code, utils) {
  const { header } = result.data.roboAgentRs;
  const { handleNext, setAlertInfo, setOtpToken } = utils;
  const { message, success } = getResponseShape(header, code);
  if (success == "success") {
    setOtpToken(result.headers["authorization"]);
    handleNext();
  }
  setAlertInfo({ alertType: success, alertMsg: message });
}

export function handleGetAnswerFailure() {}
