import { Navigate } from 'react-router-dom';

// components
import DashboardLayout from "src/Core/Components/Layout/DashboardLayout";
import ServicesGetAnswer from "src/Pages/Auth/Services/Page/ServicesGetAnswer";
import ServicesList from "src/Pages/Auth/Services/Page/ServicesList";
import ErrorPage from "src/Pages/Common/404";
import Login from "src/Pages/Public/Login/Pages/Login";
import Blog from "./Core/Components/Blog/Blog";
import Dashboard from "./Core/Components/Dashboard/Dashboard";
import User from "./Core/Components/User/User";
import Register from "./Pages/Public/Register/Pages/Register";
import { useLoginInfo } from './Core/Context/LoginInfoContext';
import { useRoutes } from 'react-router-dom/dist';


const Routes = () => {
  const loginInfo = useLoginInfo()
  console.log("loginInfo ==> ", loginInfo)
  const pageRouts = [
    {
      // default
      path: "/",
      element: <DashboardLayout />,
      children: [
        { path: "", element: loginInfo?.login ? <Navigate to="/dash/dashboard" /> : <Navigate to="/auth/login" /> },
        { path: "*", element: <ErrorPage /> }
      ],
    },
    // auth
    {
      path: "auth",
      element: loginInfo?.login ? <Navigate to="/dash/dashboard" /> : <DashboardLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "*", element: <ErrorPage /> },
        { path: "", element: <ErrorPage /> }
      ]
    },
    // dash
    {
      path: "dash",
      element: loginInfo?.login ? <DashboardLayout /> : <Navigate to="/auth/login" />,
      children: [
        { path: "Dashboard", element: <Dashboard /> },
        { path: "user", element: <User /> },
        {
          path: "services", children: [
            { path: "", element: <ServicesList /> },
            { path: "getAnswer", element: <ServicesGetAnswer /> }
          ]
        },
        { path: "register", element: <Register /> },
        { path: "blog", element: <Blog /> },
        { path: "*", element: <ErrorPage /> }
      ],
    }
  ]

  const routing = useRoutes(pageRouts);
  return <>{routing}</>
}
export default Routes;

/*

Tried this code in the App.js but it didn't work.

///
import PageRoutes from "./routes";
console.log(PageRoutes);

const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      // pass the sub-routes to nest
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
};

///

const App = () => {
  return (
    <Switch>
      {PageRoutes.map((route, idx) => (
        <RouteWithSubRoutes key={idx} {...route} />
      ))}
    </Switch>
  );
};


*/
