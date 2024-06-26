/* eslint-disable */
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Providers from "components/Providers";
import { LoginContext } from "hooks/context/LoginInfoContext";
import SideDrawer from "../SideDrawer";

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
      <LoginContext.Provider value={{ loginData: mockLoginData }}>
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

    renderWithContext(<SideDrawer {...mockProps} />, { providerProps });

    expect(screen.getAllByText("RoboAgent portal")[0]).toBeInTheDocument();
  });

  test("renders user card with avatar and name", () => {
    const providerProps = {
      value: mockLoginData,
    };

    renderWithContext(<SideDrawer {...mockProps} />, { providerProps });

    expect(screen.getAllByText("John")[0]).toBeInTheDocument();
    expect(screen.getAllByAltText(/User Image/i)[0]).toBeInTheDocument();
  });

  // test("renders the correct links based on login state", () => {
  //   const providerProps = {
  //     value: mockLoginData,
  //   };

  //   renderWithContext(<SideDrawer {...mockProps} />, { providerProps });

  //   // expect(screen.getByText("Dashboard")).toBeInTheDocument();
  //   // expect(screen.getByText("User")).toBeInTheDocument();
  //   // expect(screen.getByText("Manual")).toBeInTheDocument();
  //   // expect(screen.getByText("Services")).toBeInTheDocument();
  //   // expect(screen.getByText("Register")).toBeInTheDocument();

  //   providerProps.value.isLoggedIn = false;

  //   renderWithContext(
  //     <SideDrawer {...mockProps} />,

  //     { providerProps }
  //   );
  // });

  test("renders Get More section with correct avatar and welcome message", () => {
    const providerProps = {
      value: mockLoginData,
    };

    renderWithContext(<SideDrawer {...mockProps} />, { providerProps });

    expect(screen.getAllByText("Welcome John Doe")[0]).toBeInTheDocument();
    expect(screen.getAllByAltText("avatar")[0]).toBeInTheDocument();
  });

  // test("calls onClose when a link is clicked", () => {
  //   const providerProps = {
  //     value: mockLoginData,
  //   };

  //   renderWithContext(<SideDrawer {...mockProps} />, { providerProps });

  //   fireEvent.click(screen.getByText("Dashboard"));
  //   expect(mockProps.onClose).toHaveBeenCalled();
  // });
});
