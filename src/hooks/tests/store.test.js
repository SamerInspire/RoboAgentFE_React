const { generalSuccessReducer } = require("../reducers/store");
const mockResult = {
  headers: {
    authorization: "fjsldkfjklsajf",
  },
  data: {
    roboAgentRs: {
      body: {
        users: [
          { id: 1, name: "John" },
          { id: 2, name: "Jane" },
        ],
      },
      header: {
        responseStatus: {
          arabicMsg: "نجاح",
          englishMsg: "Success",
        },
      },
    },
  },
};
describe("generalSuccessReducer", () => {
  it("should invoke  the GET_ALL_USERS data correctly ", () => {
    const mockUtils = {
      requestAction: "GET_ALL_USERS",
      setTableData: jest.fn(),
    };

    generalSuccessReducer(mockResult, mockUtils);
    expect(mockUtils.setTableData).toHaveBeenCalled();
  });
  it("should invoke  the SET_IS_LOGGED_IN data correctly ", () => {
    const mockUtils = {
      requestAction: "SET_IS_LOGGED_IN",
      loginDispatch: jest.fn(),
    };

    generalSuccessReducer(mockResult, mockUtils);
    expect(mockUtils.loginDispatch).toHaveBeenCalled();
  });
  it("should invoke  the SET_SERVICE_LIST data correctly ", () => {
    const mockUtils = {
      requestAction: "SET_SERVICE_LIST",
      setServiceList: jest.fn(),
    };

    generalSuccessReducer(mockResult, mockUtils);
    expect(mockUtils.setServiceList).toHaveBeenCalled();
  });
  it("should invoke  the SET_USER_SERVICE_LIST data correctly ", () => {
    const mockUtils = {
      requestAction: "SET_USER_SERVICE_LIST",
      setUserServiceList: jest.fn(),
    };

    generalSuccessReducer(mockResult, mockUtils);
    expect(mockUtils.setUserServiceList).toHaveBeenCalled();
  });
  it("should invoke  the GET_ALL_AUTHORITIES data correctly ", () => {
    const mockUtils = {
      requestAction: "GET_ALL_AUTHORITIES",
      setAuthorities: jest.fn(),
    };

    generalSuccessReducer(mockResult, mockUtils);
    expect(mockUtils.setAuthorities).toHaveBeenCalled();
  });
  it("should invoke  the REGISTER_NEW_USER data correctly ", () => {
    const mockUtils = {
      requestAction: "REGISTER_NEW_USER",
      setAlert: jest.fn(),
      rest: jest.fn(),
      clearFinalForm: jest.fn,
    };

    generalSuccessReducer(mockResult, mockUtils);
    expect(mockUtils.setAlert).toHaveBeenCalled();
  });
  it("should invoke  the UPDATE_USER_ROLE data correctly ", () => {
    const mockUtils = {
      requestAction: "UPDATE_USER_ROLE",
      tableData: [],
      setAlert: jest.fn(),
      setTableData: jest.fn(),
      handleCloseRolePopper: jest.fn(),
    };

    generalSuccessReducer(mockResult, mockUtils);
    expect(mockUtils.setTableData).toHaveBeenCalled();
    expect(mockUtils.handleCloseRolePopper).toHaveBeenCalled();
    expect(mockUtils.setAlert).toHaveBeenCalled();
  });
  it("should invoke  the UPDATE_USER_AUTHORITIES data correctly ", () => {
    const mockUtils = {
      requestAction: "UPDATE_USER_AUTHORITIES",
      handleClose: jest.fn(),
      setAlert: jest.fn(),
    };

    generalSuccessReducer(mockResult, mockUtils);
    expect(mockUtils.handleClose).toHaveBeenCalled();
    expect(mockUtils.setAlert).toHaveBeenCalled();
  });
  it("should invoke  the set submit user service data correctly ", () => {
    const mockUtils = {
      requestAction: "SET_SUBMIT_USER_SERVICE",
      handleCloseServiceDialog: jest.fn(),
      tableData: [],
      setTableData: jest.fn(),
      setAlert: jest.fn(),
    };

    generalSuccessReducer(mockResult, mockUtils);
    expect(mockUtils.handleCloseServiceDialog).toHaveBeenCalled();
    expect(mockUtils.setTableData).toHaveBeenCalled();
    expect(mockUtils.setAlert).toHaveBeenCalled();
  });
  it("should invoke  the setAnswer  data correctly ", () => {
    const mockUtils = {
      requestAction: "SET_ANSWER",
      setAnswer: jest.fn(),
    };

    generalSuccessReducer(mockResult, mockUtils);
    expect(mockUtils.setAnswer).toHaveBeenCalled();
  });
  it("should invoke  the Change current User data correctly ", () => {
    const mockUtils = {
      requestAction: "SET_CURRENT_USER",
      setCurrentUserData: jest.fn(),
    };

    generalSuccessReducer(mockResult, mockUtils);
    expect(mockUtils.setCurrentUserData).toHaveBeenCalled();
  });
});
