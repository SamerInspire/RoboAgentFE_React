import axios from "axios";
import React from "react";
import AxiosHit from "utils/api/AxiosHit";
import { initialState } from "../reducers/loginReducer";
import { useLocalStorage } from "../custom/useLocalStorage";

export const LoginContext = React.createContext();
function LoginProvider(props) {
  const [loginData, loginDispatch] = useLocalStorage("userInfo", initialState);
  // function can(capability) {
  //   return loginData.user.capabilities?.includes(capability) && loginData.token;
  // }
  async function login(loginData, setAlert, setIsLoading) {
    setIsLoading(true);

    await AxiosHit(
      {
        method: "post",
        url: "api/users/signin",
        data: {
          email: loginData.email,
          password: loginData.password,
        },
      },
      {
        setAlert,
        loginDispatch,
        requestAction: "SET_IS_LOGGED_IN",
        setIsLoading,
      }
    );
    setIsLoading(false);
  }
  function logout() {
    console.log("logout");
    delete axios.defaults.headers.common["authorization"];
    loginDispatch({ type: "ON_LOGOUT" });
  }
  return (
    <LoginContext.Provider
      value={{
        // can,
        login,
        logout,
        loginDispatch,
        loginData,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
