import { generalSuccessReducer } from 'hooks/reducers/store';
import i18next from 'i18next';

export const getResponseShape = (header, code) => {
  const currentLang = i18next.language;
  const { status, arabicMsg, englishMsg } = header.responseStatus;
  const { TransactionId } = header;
  switch (code) {
    ///success
    case '00000':
      return {
        message: currentLang == 'ar' ? arabicMsg : englishMsg,
        alertStatus: status,
        success: true,
        TransactionId: TransactionId ? TransactionId : '',
      };
    default: {
      return {
        message: currentLang == 'ar' ? arabicMsg : englishMsg,
        alertStatus: 'error',
        success: false,
        TransactionId: TransactionId ? TransactionId : '',
      };
    }
  }
};
export function handleChangePassCodeActions(result, code, utils) {
  const { header } = result.data.roboAgentRs;
  const { handleNext, setAlert, setIsLoading } = utils;

  const { message, success, TransactionId } = getResponseShape(header, code);
  setIsLoading(false);
  if (success) handleNext();
  setAlert({ alertType: success, alertMsg: message + ' ' + TransactionId });
}

export function JWTFalureHitHandle() {
  window.location = '/auth/login';
  localStorage.removeItem('userInfo');
}
export function handleOTPCodeActions(result, code, utils) {
  const { header } = result.data.roboAgentRs;
  const { handleNext, setAlert, setIsLoading } = utils;

  const { message, alertStatus, success, TransactionId } = getResponseShape(header, code);
  setIsLoading(false);
  console.log(alertStatus, message);
  if (success) handleNext();
  setAlert({ alertType: alertStatus, alertMsg: message + ' ' + TransactionId, open: true });
}

export async function handleUserCodeActions(result, code, utils) {
  const { header } = result.data.roboAgentRs;
  const { setAlert } = utils;
  const { message, alertStatus, success, TransactionId } = getResponseShape(header, code);
  if (success) {
    generalSuccessReducer(result, utils);
  }
  setAlert({
    alertType: alertStatus,
    alertMsg: message + ' ' + TransactionId,
  });
  return result;
}
export function handleGeneralErrorCodeActions(result, code, utils) {
  const { header } = result.data.roboAgentRs;
  const { setAlert } = utils;
  const { alertStatus, message, TransactionId } = getResponseShape(header, code);
  setAlert({ alertType: alertStatus, alertMsg: message + ' ' + TransactionId });
}

export function handleEmailCodeActions(result, code, utils) {
  const { header } = result.data.roboAgentRs;
  const { handleNext, setIsLoading, setAlert, setOtpToken } = utils;
  const { message, success, alertStatus, TransactionId } = getResponseShape(header, code);

  if (success) {
    setOtpToken(result.headers['authorization']);
    setIsLoading(false);
    handleNext();
  }
  setAlert({ alertType: alertStatus, alertMsg: message + ' ' + TransactionId, open: true });
}

export function handleGetAnswerFailure(result, code, utils) {
  const { header } = result.data.roboAgentRs;
  const { setAlert } = utils;
  const { message, alertStatus, TransactionId } = getResponseShape(header, code);

  setAlert({ alertType: alertStatus, alertMsg: message + ' ' + TransactionId });
}
export function unAuthorizedHitHandle() {
  try {
    window.location = '/dash/dashboard';
  } catch (error) {
    console.log(error);
  }
}
