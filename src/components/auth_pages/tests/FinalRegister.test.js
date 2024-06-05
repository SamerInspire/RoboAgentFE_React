import { render, screen } from "@testing-library/react";
import FinalRegister from "../FinalRegister"; // replace with your actual import

describe("FinalRegister Component", () => {
  beforeEach(() => {
    render(<FinalRegister />);
  });

  test("should render user role selection", () => {
    const userRoleElement = screen.getByText(/Choose user role/i);
    expect(userRoleElement).toBeInTheDocument();
  });

  test("should render user team selection", () => {
    const userTeamElement = screen.getByText(/Choose user team/i);
    expect(userTeamElement).toBeInTheDocument();
  });

  test("should render user services selection", () => {
    const userServicesElement = screen.getByText(/Choose User Services/i);
    expect(userServicesElement).toBeInTheDocument();
  });

  test("should render user main service selection", () => {
    const userMainServiceElement = screen.getByText(
      /Choose User Main Service/i
    );
    expect(userMainServiceElement).toBeInTheDocument();
  });

  test("should render back button", () => {
    const backButtonElement = screen.getByText(/BACK/i);
    expect(backButtonElement).toBeInTheDocument();
  });

  test("should render register button", () => {
    const registerButtonElement = screen.getByRole("button", {
      name: /Register/i,
    });
    expect(registerButtonElement).toBeInTheDocument();
  });
});
