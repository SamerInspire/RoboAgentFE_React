import React from "react";
import { getAllByText, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LoginContext } from "../hooks/Context/LoginInfoContext";
import Routes from "../routes";
import Providers from "src/components/Providers";
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
    const loginData = { isLoggedIn: true, role: "MEMBER" };

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
    const loginData = { isLoggedIn: true, role: "ADMIN" };

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
    const loginData = { isLoggedIn: true, role: "MEMBER" };

    const { getByText } = render(
      <Providers>
        <LoginContext.Provider value={{ loginData }}>
          <MemoryRouter initialEntries={["/dash/register"]}>
            <Routes />
          </MemoryRouter>
        </LoginContext.Provider>
      </Providers>
    );

    expect(getAllByText("Dashboard")[0]).toBeInTheDocument();
  });
});
