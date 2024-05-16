import { render } from "@testing-library/react";

jest.mock("react-dom/client", () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

jest.mock("./dictonaries/i18n");

describe("Index Component", () => {
  test("renders without crashing", () => {
    const { createRoot } = require("react-dom/client");
    const root = {
      render: jest.fn(),
    };
    createRoot.mockReturnValue(root);

    document.body.innerHTML = '<div id="root"></div>';
    require("./index");

    expect(createRoot).toHaveBeenCalledWith(document.getElementById("root"));
    expect(root.render).toHaveBeenCalled();
  });

  test("renders App component with BrowserRouter and StrictMode", () => {
    const { createRoot } = require("react-dom/client");
    const root = {
      render: jest.fn(),
    };
    createRoot.mockReturnValue(root);

    document.body.innerHTML = '<div id="root"></div>';
    require("./index");

    const appRenderCall = root.render.mock.calls[0][0];
    const { container } = render(appRenderCall);

    expect(container.querySelector("div")).toBeInTheDocument();
  });

  test("logs production mode message when NODE_ENV is production", () => {
    process.env.NODE_ENV = "production";
    console.log = jest.fn();

    document.body.innerHTML = '<div id="root"></div>';
    require("./index");

    expect(console.log).toHaveBeenCalledWith("App running in production mode");
  });

  test("does not log production mode message when NODE_ENV is not production", () => {
    process.env.NODE_ENV = "development";
    console.log = jest.fn();

    document.body.innerHTML = '<div id="root"></div>';
    require("./index");

    expect(console.log).not.toHaveBeenCalledWith(
      "App running in production mode"
    );
  });
});
