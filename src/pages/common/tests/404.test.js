import { render, screen } from "@testing-library/react";
import { BrowserRouter} from "react-router-dom";
import ErrorPage from "../404";
import Providers from "components/Providers";

describe("ErrorPage Component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Providers>
          <ErrorPage />
        </Providers>
      </BrowserRouter>
    );
  });

  it("renders the main heading", () => {
    expect(screen.getByText("Sorry, page not found!")).toBeInTheDocument();
  });

  it("renders the descriptive paragraph", () => {
    expect(
      screen.getByText(
        "Sorry, we could not find the page you are looking for ,Perhaps you have mistyped the URL? Be sure to check your spelling"
      )
    ).toBeInTheDocument();
  });

  // it("renders the Lottie animation", () => {
  //   const lottieElement = screen.getByRole("img", { name: /animation/i });
  //   expect(lottieElement).toBeInTheDocument();
  // });

  it('renders the "Go to Home" button', () => {
    const homeButton = screen.getByText(/go to home/i);
    expect(homeButton).toBeInTheDocument();
  });

  it("renders the button with correct link", () => {
    const homeButton = screen.getByText(/go to home/i);
    expect(homeButton.closest("a")).toHaveAttribute("href", "/");
  });
});
