import React from "react";
import { render, screen } from "@testing-library/react";
import AuthButtonGroup from "../ButtonGroup";

describe("AuthButtonGroup Component", () => {
  test("renders without crashing", () => {
    render(<AuthButtonGroup />);
  });

  test("renders three buttons with correct icons and styles", () => {
    render(<AuthButtonGroup />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);

    const googleButton = screen.getByLabelText("Google");
    const facebookButton = screen.getByLabelText("Facebook");
    const twitterButton = screen.getByLabelText("Twitter");

    expect(googleButton).toBeInTheDocument();
    expect(facebookButton).toBeInTheDocument();
    expect(twitterButton).toBeInTheDocument();

    expect(googleButton).toHaveStyle({
      color: "rgb(223, 62, 48)",
      padding: "12px 0",
      fontSize: "20px",
      borderRadius: "8px",
    });
    expect(facebookButton).toHaveStyle({
      color: "rgb(24, 119, 242)",
      padding: "12px 0",
      fontSize: "20px",
      borderRadius: "8px",
    });
    expect(twitterButton).toHaveStyle({
      color: "rgb(28, 156, 234)",
      padding: "12px 0",
      fontSize: "20px",
      borderRadius: "8px",
    });

    expect(screen.getByLabelText("Google")).toContainHTML("<svg");
    expect(screen.getByLabelText("Facebook")).toContainHTML("<svg");
    expect(screen.getByLabelText("Twitter")).toContainHTML("<svg");
  });
});
