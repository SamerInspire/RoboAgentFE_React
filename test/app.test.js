// App.test.js
import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginProvider from "src/hooks/Context/LoginInfoContext";
import App from "src/App";
// Mock Providers component
jest.mock("./components/Providers", () => ({ children }) => (
  <div>{children}</div>
));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

test("renders App component with routes", () => {
  const loginData = { isLoggedIn: false, role: "" };

  const { getByText } = render(
    <LoginProvider value={{ loginData }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoginProvider>
  );

  expect(getByText("Login")).toBeInTheDocument();
});
