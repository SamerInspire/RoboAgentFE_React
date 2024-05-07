import { generalSuccessReducer } from "src/hooks/reducers/store";
import {
  JWTFalureHitHandle,
  handleChangePassCodeActions,
  handleEmailCodeActions,
  handleGeneralErrorCodeActions,
  handleGetAnswerFailure,
  handleOTPCodeActions,
  handleUserCodeActions,
} from "./responseHandlers";

export function successHitHandle(result, utils) {
  const { code } = result?.data?.roboAgentRs?.header?.responseStatus;
  const { codeLetters, codeNumbers } = handleExtractCodeInfo(code, "string");
  switch (codeLetters) {
    case "":
      return generalSuccessReducer(result, utils);
    case "USR":
      return handleUserCodeActions(result, codeNumbers, utils);
    case "OTP":
      return handleOTPCodeActions(result, codeNumbers, utils);
    case "EML":
      return handleEmailCodeActions(result, codeNumbers, utils);
    case "CPW":
      return handleChangePassCodeActions(result, codeNumbers, utils);
    case "JWT":
      return JWTFalureHitHandle(result, codeNumbers);
    case "GAM":
      return handleGetAnswerFailure(result, codeNumbers);
    default:
      return handleGeneralErrorCodeActions(result, codeNumbers);
  }
}
export function handleExtractCodeInfo(code = 0) {
  return {
    codeLetters: code
      ?.split("")
      ?.filter((l) => isNaN(Number.parseInt(l)))
      ?.join(""),
    codeNumbers: code
      ?.split("")
      ?.filter((l) => !isNaN(Number.parseInt(l)))
      ?.join(""),
  };
}
