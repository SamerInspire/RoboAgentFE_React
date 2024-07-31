import axios from "axios";
import React from "react";
import AxiosHit from "utils/api/AxiosHit";
import { initialState } from "../reducers/loginReducer";
import { useLocalStorage } from "../custom/useLocalStorage";
import cookies from 'react-cookies';

export const LoginContext = React.createContext();
function LoginProvider(props) {
  const [loginData, loginDispatch] = useLocalStorage("userInfo", initialState);
  // function can(capability) {
  //   return loginData.user.capabilities?.includes(capability) && loginData.token;
  // }
  async function login(loginData, setAlert, setIsLoading) {
    setIsLoading(true);
    console.log('check remember user', loginData);
    if (loginData.rememberUser) {
      const options = { path: '/', maxAge: 7 * 24 * 60 * 60 };
      cookies.save('loginData', loginData, options);
      console.log('saved login details',cookies.load('loginData'));
    } else {
      cookies.remove('loginData',{path:'/'});
    }

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
    sessionStorage.removeItem("ticketsResolved");
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
