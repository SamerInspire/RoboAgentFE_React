import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Providers from "../components/Providers";
import App from "src/App";
import { LoginContext } from "src/hooks/Context/LoginInfoContext";
jest.mock("react-apexcharts", () => ({
  __esModule: true,
  default: () => <div />,
}));
describe("App component", () => {
  it("renders login page when not logged in  crashing", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Providers>
          <LoginContext.Provider
            value={{ loginData: { isLoggedIn: false, role: "ADMIN" } }}
          >
            <App />
          </LoginContext.Provider>
        </Providers>
      </MemoryRouter>
    );

    expect(getByText("Hi, Login to continue")).toBeInTheDocument();
  });
});
