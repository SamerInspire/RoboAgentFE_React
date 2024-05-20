import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Providers from "src/components/Providers";

jest.mock("src/hooks/Context/AlertContext", () => ({
  AlertProvider: ({ children }) => (
    <div data-testid="AlertProvider">{children}</div>
  ),
}));

jest.mock("src/hooks/Context/LoginInfoContext", () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="LoginProvider">{children}</div>,
}));

jest.mock("src/hooks/Context/ThemeContext", () => ({
  ThemeContextProvider: ({ children }) => (
    <div data-testid="ThemeContextProvider">{children}</div>
  ),
}));

describe("Providers Component", () => {
  test("renders children with all context providers", () => {
    render(
      <BrowserRouter>
        <Providers>
          <div>Test Child</div>
        </Providers>
      </BrowserRouter>
    );

    expect(screen.getByTestId("LoginProvider")).toBeInTheDocument();
    expect(screen.getByTestId("ThemeContextProvider")).toBeInTheDocument();
    expect(screen.getByTestId("AlertProvider")).toBeInTheDocument();

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });
});
