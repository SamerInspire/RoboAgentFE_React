import { fireEvent, render, screen } from "@testing-library/react";
import Providers from "components/Providers";
import { LoginContext } from "hooks/context/LoginInfoContext";
import UserMenu from "../main_header/UserMenu";

const mockProps = {
  onOpen: jest.fn(),
  onClose: jest.fn(),
  anchorEl: null,
};

const mockLoginData = {
  firstName: "John",
  email: "john.doe@example.com",
  isLoggedIn: true,
};

const mockLogout = jest.fn();

const renderWithProviders = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <Providers>
      <LoginContext.Provider value={providerProps}>{ui}</LoginContext.Provider>
    </Providers>,

    renderOptions
  );
};

describe("UserMenu Component", () => {
  test("renders avatar button", () => {
    const providerProps = {
      loginData: mockLoginData,
      logout: mockLogout,
    };

    renderWithProviders(
      <Providers>
        <UserMenu {...mockProps} />
      </Providers>,
      { providerProps }
    );

    const avatarButton = screen.getByRole("button");
    expect(avatarButton).toBeInTheDocument();
  });

  test("opens and closes the menu on avatar button click", () => {
    const providerProps = {
      loginData: mockLoginData,
      logout: mockLogout,
    };

    renderWithProviders(
      <Providers>
        <UserMenu {...mockProps} />
      </Providers>,

      { providerProps }
    );

    const avatarButton = screen.getByRole("button");
    fireEvent.click(avatarButton);

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    expect(screen.getByText(/settings/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  test("displays user information", () => {
    const providerProps = {
      loginData: mockLoginData,
      logout: mockLogout,
    };

    renderWithProviders(
      <Providers>
        <LoginContext
          value={{ loginData: { ...mockLoginData, isLoggedIn: true } }}
        >
          <UserMenu {...mockProps} />
        </LoginContext>
      </Providers>,
      { providerProps }
    );

    const avatarButton = screen.getByRole("button");
    fireEvent.click(avatarButton);

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
  });

  test("renders links correctly", () => {
    const providerProps = {
      loginData: mockLoginData,
      logout: mockLogout,
    };

    renderWithProviders(
      <Providers>
        <UserMenu {...mockProps} />
      </Providers>,

      { providerProps }
    );

    const avatarButton = screen.getByRole("button");
    fireEvent.click(avatarButton);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  // test("calls logout function on logout button click", () => {
  //   const providerProps = {
  //     loginData: mockLoginData,
  //     logout: mockLogout,
  //   };

  //   renderWithProviders(
  //     <Providers>
  //       <UserMenu {...mockProps} />
  //     </Providers>,
  //     { providerProps }
  //   );

  //   const avatarButton = screen.getByRole("button");
  //   fireEvent.click(avatarButton);

  //   const logoutButton = screen.getByText(/logout/i);
  //   fireEvent.click(logoutButton);

  //   expect(mockLogout).toHaveBeenCalled();
  // });
});
