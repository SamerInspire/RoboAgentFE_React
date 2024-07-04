import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SomethingWentWrongError from "../500";
import Providers from "components/Providers";

// Mock Lottie component

describe("SomethingWentWrongError Component", () => {
  test("renders without crashing", () => {
    render(
      <BrowserRouter>
        <Providers>
          <SomethingWentWrongError />
        </Providers>
      </BrowserRouter>
    );
  });

  test("renders correct text content", () => {
    render(
      <BrowserRouter>
        <Providers>
          <SomethingWentWrongError />
        </Providers>
      </BrowserRouter>
    );

    expect(screen.getByText("Something Went Wrong")).toBeInTheDocument();
    expect(
      screen.getByText("Sorry Something went wrong from our side")
    ).toBeInTheDocument();
  });

  test("renders Go to Home button", () => {
    render(
      <BrowserRouter>
        <Providers>
          <SomethingWentWrongError />
        </Providers>{" "}
      </BrowserRouter>
    );

    const homeButton = screen.getByText(/Go to Home/i);
    expect(homeButton).toBeInTheDocument();
    expect(homeButton).toHaveAttribute("href", "/");
  });
});
