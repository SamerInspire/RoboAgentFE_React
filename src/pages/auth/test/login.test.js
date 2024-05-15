import { render } from "@testing-library/react";
import Login from "../login/Login";
import { BrowserRouter } from "react-router-dom";
import Providers from "src/components/Providers";

describe("Login Component", () => {
  test("renders Login component with the correct title and headings", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Providers>
          <Login />
        </Providers>
      </BrowserRouter>
    );
    expect(getByText("Hi, Login to continue")).toBeInTheDocument();
    expect(getByText("Sign in")).toBeInTheDocument();
    expect(getByText("Enter your details below.")).toBeInTheDocument();
  });
});
test("renders left panel with an image and right panel with form instructions", () => {
  const { getByAltText, getByText } = render(
    <BrowserRouter>
      <Providers>
        <Login />
      </Providers>
    </BrowserRouter>
  );
  expect(getByAltText("Login Image")).toBeInTheDocument(); // Assuming alt text is 'Login Image'
  expect(getByText("Hi, Login to continue")).toBeInTheDocument();
  expect(getByText("Sign in")).toBeInTheDocument();
  expect(getByText("Enter your details below.")).toBeInTheDocument();
});
test("renders left panel with an image and right panel with form instructions", () => {
  const { getByAltText, getByText } = render(
    <BrowserRouter>
      <Providers>
        <Login />
      </Providers>
    </BrowserRouter>
  );
  expect(getByAltText("Login Image")).toBeInTheDocument(); // Assuming alt text is 'Login Image'
  expect(getByText("Hi, Login to continue")).toBeInTheDocument();
  expect(getByText("Sign in")).toBeInTheDocument();
  expect(getByText("Enter your details below.")).toBeInTheDocument();
});
