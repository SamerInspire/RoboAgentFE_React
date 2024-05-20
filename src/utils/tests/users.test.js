import {
  handleSubmitUserAuths,
  handleFetchAuthorities,
  hanldeSubmitUserNewRole,
  handleSubmitNewUser,
  handleSubmitUserNewService,
  handleFetchAllUsers,
  handleFetchServiceList,
  handleFetchCurrentUser,
} from "../users/users";
import AxiosHit from "../api/AxiosHit";

describe("API function tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("handleSubmitUserAuths makes a PUT request with correct data", async () => {
    const utils = { roboAuthorities: ["auth1", "auth2"], userId: 1 };
    await handleSubmitUserAuths(utils);
    expect(AxiosHit).toHaveBeenCalledWith(
      {
        method: "put",
        url: "/user-auth",
        data: { roboAuthorities: utils.roboAuthorities, userId: utils.userId },
      },
      utils
    );
  });

  test("handleFetchAuthorities makes a GET request", async () => {
    const utils = {};
    await handleFetchAuthorities(utils);
    expect(AxiosHit).toHaveBeenCalledWith(
      {
        method: "get",
        url: "/user-auth",
      },
      utils
    );
  });

  test("hanldeSubmitUserNewRole makes a PUT request with correct URL", async () => {
    const utils = { userId: 1, newRole: "TEAM_LEAD" };
    await hanldeSubmitUserNewRole(utils);
    expect(AxiosHit).toHaveBeenCalledWith(
      {
        method: "put",
        url: `/user-roles/${utils.userId}/roles/${utils.newRole}`,
      },
      utils
    );
  });

  test("handleSubmitNewUser makes a POST request and calls handleSubmitUserAuths", async () => {
    const userData = { roboAuthorities: ["auth1", "auth2"], username: "test" };
    const utils = {};
    const response = {
      data: { roboAgentRs: { body: { user: { userId: 1 } } } },
    };
    AxiosHit.mockResolvedValueOnce(response);

    await handleSubmitNewUser(userData, utils);

    expect(AxiosHit).toHaveBeenCalledWith(
      {
        url: "/users/signup",
        method: "post",
        data: { ...userData, roboAuthorities: undefined },
      },
      utils
    );

    expect(AxiosHit).toHaveBeenCalledWith(
      {
        method: "put",
        url: "/user-auth",
        data: { roboAuthorities: userData.roboAuthorities, userId: 1 },
      },
      utils
    );
  });

  test("handleSubmitUserNewService makes a PUT request with correct URL", async () => {
    const utils = { userId: 1, userNewService: "service1" };
    await handleSubmitUserNewService(utils);
    expect(AxiosHit).toHaveBeenCalledWith(
      {
        method: "put",
        url: `service/${utils.userId}/service/${utils.userNewService}`,
      },
      utils
    );
  });

  test("handleFetchAllUsers makes a GET request with correct URL", async () => {
    const utils = {};
    await handleFetchAllUsers(utils);
    expect(AxiosHit).toHaveBeenCalledWith(
      {
        url: "users/getallusers?size=40",
        method: "get",
      },
      utils
    );
  });

  test("handleFetchServiceList makes a GET request with correct URL", async () => {
    const utils = {};
    await handleFetchServiceList(utils);
    expect(AxiosHit).toHaveBeenCalledWith(
      {
        method: "get",
        url: "/service",
      },
      utils
    );
  });

  test("handleFetchCurrentUser makes a GET request with correct URL", async () => {
    const utils = {};
    await handleFetchCurrentUser(utils);
    expect(AxiosHit).toHaveBeenCalledWith(
      {
        url: "users/currentuser",
        method: "get",
      },
      utils
    );
  });
});
