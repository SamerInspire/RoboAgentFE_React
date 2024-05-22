import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { LoginContext } from "src/hooks/Context/LoginInfoContext";
import { MemoryRouter } from "react-router-dom";
import Providers from "src/components/Providers";
import SideDrawer from "../SideDrawer";

// Mock Data
const mockLoginData = {
  isLoggedIn: true,
  firstName: "John",
  lastName: "Doe",
};

const mockProps = {
  onClose: jest.fn(),
  toggleMenu: true,
  drawerPaper: "drawerPaperClass",
  container: null,
};

const renderWithContext = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <Providers>
      <LoginContext.Provider {...providerProps}>
        <MemoryRouter>{ui}</MemoryRouter>
      </LoginContext.Provider>
    </Providers>,

    renderOptions
  );
};

describe("SideDrawer Component", () => {
  test("renders logo correctly", () => {
    const providerProps = {
      value: mockLoginData,
    };

    renderWithContext(
      <Providers>
        <SideDrawer {...mockProps} />
      </Providers>,

      { providerProps }
    );

    expect(screen.getByText("RoboAgent portal")).toBeInTheDocument();
  });

  test("renders user card with avatar and name", () => {
    const providerProps = {
      value: mockLoginData,
    };

    renderWithContext(
      <Providers>
        <SideDrawer {...mockProps} />
      </Providers>,

      { providerProps }
    );

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByAltText("User Image")).toBeInTheDocument();
  });

  test("renders the correct links based on login state", () => {
    const providerProps = {
      value: mockLoginData,
    };

    renderWithContext(
      <Providers>
        <SideDrawer {...mockProps} />
      </Providers>,

      { providerProps }
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("User")).toBeInTheDocument();
    expect(screen.getByText("Manual")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();

    providerProps.value.isLoggedIn = false;

    renderWithContext(
      <Providers>
        <SideDrawer {...mockProps} />
      </Providers>,

      { providerProps }
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("renders Get More section with correct avatar and welcome message", () => {
    const providerProps = {
      value: mockLoginData,
    };

    renderWithContext(
      <Providers>
        <SideDrawer {...mockProps} />
      </Providers>,
      { providerProps }
    );

    expect(screen.getByText("Welcome John Doe")).toBeInTheDocument();
    expect(screen.getByAltText("avatar")).toBeInTheDocument();
  });

  test("calls onClose when a link is clicked", () => {
    const providerProps = {
      value: mockLoginData,
    };

    renderWithContext(
      <Providers>
        <SideDrawer {...mockProps} />
      </Providers>,

      { providerProps }
    );

    fireEvent.click(screen.getByText("Dashboard"));
    expect(mockProps.onClose).toHaveBeenCalled();
  });
});
