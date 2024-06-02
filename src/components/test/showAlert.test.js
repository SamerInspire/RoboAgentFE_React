import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { AlertContext } from "../../hooks/Context/AlertContext";
import ShowAlert from "../ShowAlert";

const mockAlertInfo = {
  alertType: "error",
  alertMsg: "This is an error message",
  sleep: 1000,
  redirectTo: "/new-page",
};

const mocksetAlert = jest.fn();

const renderWithProviders = (
  ui,
  { alertValue, updateAlertValue, ...renderOptions } = {}
) => {
  return render(
    <AlertContext.Provider
      value={{
        alertInfo: mockAlertInfo,
        handleCloseAlert: jest.fn(),
        setAlert: jest.fn(),
        handleOpenAlert: jest.fn(),
        openFailerAlert: false,
      }}
    >
      {ui}
    </AlertContext.Provider>,
    renderOptions
  );
};

describe("ShowAlert Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders alert when alertInfo is provided", async () => {
    renderWithProviders(<ShowAlert />, {
      alertValue: mockAlertInfo,
      updateAlertValue: mocksetAlert,
    });

    expect(screen.getByText("This is an error message")).toBeInTheDocument();
  });

  // test("closes alert after specified duration", async () => {
  //   renderWithProviders(<ShowAlert />, {
  //     alertValue: mockAlertInfo,
  //     updateAlertValue: mocksetAlert,
  //   });

  //   await waitFor(
  //     () => {
  //       expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  //     },
  //     { timeout: mockAlertInfo.sleep + 500 } // Adding extra time to account for any delays
  //   );

  //   expect(mocksetAlert).toHaveBeenCalledWith(null);
  // });

  // test("scrolls to top and redirects when alertInfo is provided", async () => {
  //   window.scroll = jest.fn();
  //   delete window.location;
  //   window.location = { href: "" };

  //   renderWithProviders(<ShowAlert />, {
  //     alertValue: mockAlertInfo,
  //     updateAlertValue: mocksetAlert,
  //   });

  //   expect(window.scroll).toHaveBeenCalledWith(0, 0);

  //   await waitFor(
  //     () => {
  //       expect(window.location.href).toBe(mockAlertInfo.redirectTo);
  //     },
  //     { timeout: mockAlertInfo.sleep + 500 }
  //   );

  //   expect(mocksetAlert).toHaveBeenCalledWith(null);
  // });

  test("does not render alert when alertInfo is not provided", () => {
    renderWithProviders(<ShowAlert />, {
      alertValue: null,
      updateAlertValue: mocksetAlert,
    });

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
