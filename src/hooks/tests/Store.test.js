import axios from "axios";
import i18n from "src/dictonaries/i18n";
import { generalSuccessReducer } from "../reducers/store";
import { reshapeUserData } from "src/utils/table/tableReshape";

jest.mock("axios");
jest.mock("src/utils/table/tableReshape");
jest.mock("src/dictonaries/i18n", () => ({
  language: "en",
}));

describe("generalSuccessReducer", () => {
  let utils;
  let result;

  beforeEach(() => {
    utils = {
      setTableData: jest.fn(),
      loginDispatch: jest.fn(),
      setServiceList: jest.fn(),
      setUserServiceList: jest.fn(),
      setAuthorities: jest.fn(),
      setAlertInfo: jest.fn(),
      setAnswer: jest.fn(),
      setCurrentUserData: jest.fn(),
    };
    result = {
      data: {
        roboAgentRs: {
          body: {},
          header: {
            responseStatus: {
              arabicMsg: "نجاح",
              englishMsg: "Success",
            },
          },
        },
      },
      headers: {
        authorization: "test-token",
      },
    };
  });

  test("handles GET_ALL_USERS action", () => {
    const body = { users: ["user1", "user2"] };
    result.data.roboAgentRs.body = body;
    utils.requestAction = "GET_ALL_USERS";
    reshapeUserData.mockReturnValue(["reshapedUser1", "reshapedUser2"]);

    generalSuccessReducer(result, utils);

    expect(reshapeUserData).toHaveBeenCalledWith(body.users);
    expect(utils.setTableData).toHaveBeenCalledWith([
      "reshapedUser1",
      "reshapedUser2",
    ]);
  });

  test("handles SET_IS_LOGGED_IN action", () => {
    const body = { user: "testUser" };
    result.data.roboAgentRs.body = body;
    utils.requestAction = "SET_IS_LOGGED_IN";

    generalSuccessReducer(result, utils);

    expect(utils.loginDispatch).toHaveBeenCalledWith({
      type: "ON_LOGIN",
      payload: { user: body.user, token: "test-token" },
    });
    expect(axios.defaults.headers.common["authorization"]).toBe("test-token");
  });

  test("handles SET_SERVICE_LIST action", () => {
    const body = { roboServices: ["service1", "service2"] };
    result.data.roboAgentRs.body = body;
    utils.requestAction = "SET_SERVICE_LIST";

    generalSuccessReducer(result, utils);

    expect(utils.setServiceList).toHaveBeenCalledWith(body.roboServices);
  });

  test("handles SET_USER_SERVICE_LIST action", () => {
    utils.requestAction = "SET_USER_SERVICE_LIST";

    generalSuccessReducer(result, utils);

    expect(utils.setUserServiceList).toHaveBeenCalledWith(result);
  });

  test("handles GET_ALL_AUTHORITIES action", () => {
    const body = { roboAuthorities: ["authority1", "authority2"] };
    result.data.roboAgentRs.body = body;
    utils.requestAction = "GET_ALL_AUTHORITIES";

    generalSuccessReducer(result, utils);

    expect(utils.setAuthorities).toHaveBeenCalledWith(body.roboAuthorities);
  });

  test("handles REGISTER_NEW_USER action", () => {
    utils.requestAction = "REGISTER_NEW_USER";

    generalSuccessReducer(result, utils);

    expect(utils.setAlertInfo).toHaveBeenCalledWith({
      alertType: "success",
      alertMsg: "Success",
    });
  });

  test("handles UPDATE_USER_ROLE action", () => {
    const body = { user: "testUser" };
    const tableData = [
      ["id1", "data1"],
      ["id2", "data2"],
    ];
    utils = {
      ...utils,
      userId: "id1",
      tableData,
      newRole: "newRole",
      handleCloseRolePopper: jest.fn(),
    };
    result.data.roboAgentRs.body = body;
    utils.requestAction = "UPDATE_USER_ROLE";

    generalSuccessReducer(result, utils);

    expect(utils.setTableData).toHaveBeenCalled();
    expect(utils.handleCloseRolePopper).toHaveBeenCalled();
    expect(utils.setAlertInfo).toHaveBeenCalledWith({
      alertType: "success",
      alertMsg: "Success",
    });
  });

  test("handles UPDATE_USER_AUTHORITIES action", () => {
    utils = {
      ...utils,
      handleClose: jest.fn(),
    };
    utils.requestAction = "UPDATE_USER_AUTHORITIES";

    generalSuccessReducer(result, utils);

    expect(utils.handleClose).toHaveBeenCalled();
    expect(utils.setAlertInfo).toHaveBeenCalledWith({
      alertType: "success",
      alertMsg: "Success",
    });
  });

  test("handles SET_SUBMIT_USER_SERVICE action", () => {
    const tableData = [
      ["id1", "data1"],
      ["id2", "data2"],
    ];
    utils = {
      ...utils,
      userId: "id1",
      tableData,
      userNewService: "newService",
      handleCloseServiceDialog: jest.fn(),
    };
    utils.requestAction = "SET_SUBMIT_USER_SERVICE";

    generalSuccessReducer(result, utils);

    expect(utils.setTableData).toHaveBeenCalled();
    expect(utils.setAlertInfo).toHaveBeenCalledWith({
      alertType: "success",
      alertMsg: "Success",
    });
    expect(utils.handleCloseServiceDialog).toHaveBeenCalled();
  });

  test("handles SET_ANSWER action", () => {
    const body = { getAnswer: { getAnswerResp: "answer" } };
    result.data.roboAgentRs.body = body;
    utils.requestAction = "SET_ANSWER";

    generalSuccessReducer(result, utils);

    expect(utils.setAnswer).toHaveBeenCalledWith(body.getAnswer.getAnswerResp);
  });

  test("handles SET_CURRENT_USER action", () => {
    const body = { user: "testUser" };
    result.data.roboAgentRs.body = body;
    utils.requestAction = "SET_CURRENT_USER";

    generalSuccessReducer(result, utils);

    expect(utils.setCurrentUserData).toHaveBeenCalledWith(body.user);
  });
});
