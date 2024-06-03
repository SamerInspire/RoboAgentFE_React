import { Navigate } from "react-router-dom";

// components
import { useContext } from "react";
import { useRoutes } from "react-router-dom/dist";
import DashboardLayout from "src/components/layout/DashboardLayout";
import Login from "src/pages/auth/login/Login";
import ErrorPage from "src/pages/common/404";
import ServicesGetAnswer from "src/pages/services/Page/ServicesGetAnswer";
import ServicesList from "src/pages/services/Page/ServicesList";
import User from "./components/User/User";
import { LoginContext } from "./hooks/Context/LoginInfoContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import Register from "./pages/auth/register/Register";
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
