import { Navigate } from "react-router-dom";

// components
import { useContext } from "react";
import { useRoutes } from "react-router-dom/dist";
import DashboardLayout from "components/layout/DashboardLayout";
import Login from "pages/auth/login/Login";
import ErrorPage from "pages/common/404";
import ServicesGetAnswer from "pages/services/page/ServicesGetAnswer";
import ServicesList from "pages/services/page/ServicesList";
import User from "./components/user/User";
import { LoginContext } from "./hooks/context/LoginInfoContext";
import Dashboard from "./pages/dashboard/Dashboard";
import Register from "./pages/auth/register/Register";
import Profile from "./pages/profile/Profile";
import SomethingWentWrongError from "./pages/common/500";
const allowedPages = {
  usersTable: {
    allowedRoles: ["ADMIN", "TEAM_LEAD"],
  },
  dashboard: {
    allowedRoles: ["ADMIN", "TEAM_LEAD", "MEMBER"],
  },
  register: {
    allowedRoles: ["ADMIN"],
  },
  services: {
    allowedRoles: ["ADMIN", "TEAM_LEAD", "MEMBER"],
  },
  profile: {
    allowedRoles: ["ADMIN", "TEAM_LEAD", "MEMBER"],
  },
};
const Routes = () => {
  const { loginData } = useContext(LoginContext);

  const pageRouts = [
    {
      // default
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: loginData.isLoggedIn ? (
            <Navigate to="/dash/dashboard" />
          ) : (
            <Navigate to="/auth/login" />
          ),
        },
        { path: "*", element: <ErrorPage /> },
      ],
    },

    {
      path: "auth",
      element: loginData.isLoggedIn ? (
        <Navigate to="/dash/dashboard" />
      ) : (
        <DashboardLayout />
      ),
      children: [
        { path: "login", element: <Login /> },
        { path: "*", element: <ErrorPage /> },
        { path: "", element: <ErrorPage /> },
      ],
    },
    { path: "/error", element: <SomethingWentWrongError /> },
    {
      path: "profile",
      element: loginData.isLoggedIn ? (
        <Profile />
      ) : (
        <Navigate to="/auth/login" />
      ),
      children: [
        { path: "*", element: <ErrorPage /> },
        { path: "", element: <Profile /> },
      ],
    },
    // dash

    {
      path: "dash",
      element: loginData.isLoggedIn ? (
        <DashboardLayout />
      ) : (
        <Navigate to="/auth/login" />
      ),
      children: [
        { path: "Dashboard", element: <Dashboard /> },
        {
          path: "user",
          element: allowedPages.usersTable.allowedRoles.includes(
            loginData.role
          ) ? (
            <User />
          ) : (
            <Navigate to="/dash/dashboard" />
          ),
        },
        {
          path: "services",
          children: [
            { path: "", element: <ServicesList /> },
            { path: "getAnswer/:servicename", element: <ServicesGetAnswer /> },
          ],
        },
        {
          path: "register",
          element: allowedPages.register.allowedRoles.includes(
            loginData.role
          ) ? (
            <Register />
          ) : (
            <Navigate to="/dash/dashboard" />
          ),
        },
        // { path: "blog", element: <Blog /> },
        { path: "*", element: <ErrorPage /> },
      ],
    },
  ];

  const routing = useRoutes(pageRouts);
  return <>{routing}</>;
};
export default Routes;
