import { loginReducer, initialState } from "../reducers/loginReducer";

describe("loginReducer", () => {
  test("handles ON_LOGIN action", () => {
    const action = {
      type: "ON_LOGIN",
      payload: {
        user: { name: "John Doe", email: "john@example.com" },
        token: "abc123",
      },
    };
    const result = loginReducer(initialState, action);
    expect(result).toEqual(result);
  });
  test("handles ON_LOGOUT action", () => {
    const loggedInState = {
      isLoggedIn: true,
      name: "John Doe",
      email: "john@example.com",
    };
    const action = { type: "ON_LOGOUT" };
    const result = loginReducer(loggedInState, action);
    expect(result).toEqual(initialState);
  });
});
