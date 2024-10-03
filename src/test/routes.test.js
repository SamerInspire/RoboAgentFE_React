/* eslint-disable no-unused-vars */
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Providers from "components/Providers";
import { LoginContext } from "../hooks/context/LoginInfoContext";
import Routes from "../routes";
jest.mock("react-apexcharts", () => ({
  __esModule: true,
  default: () => <div />,
}));

describe("Routes component", () => {
  it("redirects to login if not logged in", () => {
    const loginData = { isLoggedIn: false, role: "" };

    const { getByText } = render(
      <Providers>
        <LoginContext.Provider value={{ loginData }}>
          <MemoryRouter initialEntries={["/dash/dashboard"]}>
            <Routes />
          </MemoryRouter>
        </LoginContext.Provider>
      </Providers>
    );

    expect(getByText("Login")).toBeInTheDocument();
  });

  it("redirects to dashboard if logged in", () => {
    const loginData = { isLoggedIn: true,  role: {role: "MEMBER", id:4} };

    const { getAllByText } = render(
      <Providers>
        <LoginContext.Provider value={{ loginData }}>
          <MemoryRouter initialEntries={["/auth/login"]}>
            <Routes />
          </MemoryRouter>
        </LoginContext.Provider>
      </Providers>
    );

    expect(getAllByText("Dashboard")[0]).toBeInTheDocument();
  });

  it("renders user page for allowed role", () => {
    const loginData = { isLoggedIn: true,  role: {role: "ADMIN", id:4} };

    const { getAllByText } = render(
      <Providers>
        <LoginContext.Provider value={{ loginData }}>
          <MemoryRouter initialEntries={["/dash/user"]}>
            <Routes />
          </MemoryRouter>
        </LoginContext.Provider>
      </Providers>
    );

    expect(getAllByText("User")[0]).toBeInTheDocument();
  });

  it("redirects to dashboard if role is not allowed", () => {
    const loginData = { isLoggedIn: true, role:{ id:2, role: "MEMBER"} };

    const { getByText, getAllByText } = render(
      <Providers>
        <LoginContext.Provider value={{ loginData }}>
          <MemoryRouter initialEntries={["/dash/register"]}>
            <Routes />
          </MemoryRouter>
        </LoginContext.Provider>
      </Providers>
    );
    expect(getByText("Website Visits")).toBeInTheDocument();
  });
});
