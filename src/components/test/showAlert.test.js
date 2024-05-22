import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import {
  AlertContext,
  NewAlertContext,
} from "../../hooks/Context/AlertContext";
import ShowAlert from "../ShowAlert";

const mockAlertInfo = {
  alertType: "error",
  alertMsg: "This is an error message",
  sleep: 1000,
  redirectTo: "/new-page",
};

const mockSetAlertInfo = jest.fn();

const renderWithProviders = (
  ui,
  { alertValue, updateAlertValue, ...renderOptions } = {}
) => {
  return render(
    <AlertContext.Provider value={alertValue}>
      <NewAlertContext.Provider value={updateAlertValue}>
        {ui}
      </NewAlertContext.Provider>
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
      updateAlertValue: mockSetAlertInfo,
    });

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("This is an error message")).toBeInTheDocument();
  });

  test("closes alert after specified duration", async () => {
    renderWithProviders(<ShowAlert />, {
      alertValue: mockAlertInfo,
      updateAlertValue: mockSetAlertInfo,
    });

    expect(screen.getByRole("alert")).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      },
      { timeout: mockAlertInfo.sleep + 500 } // Adding extra time to account for any delays
    );

    expect(mockSetAlertInfo).toHaveBeenCalledWith(null);
  });

  test("scrolls to top and redirects when alertInfo is provided", async () => {
    window.scroll = jest.fn();
    delete window.location;
    window.location = { href: "" };

    renderWithProviders(<ShowAlert />, {
      alertValue: mockAlertInfo,
      updateAlertValue: mockSetAlertInfo,
    });

    expect(window.scroll).toHaveBeenCalledWith(0, 0);

    await waitFor(
      () => {
        expect(window.location.href).toBe(mockAlertInfo.redirectTo);
      },
      { timeout: mockAlertInfo.sleep + 500 }
    );

    expect(mockSetAlertInfo).toHaveBeenCalledWith(null);
  });

  test("does not render alert when alertInfo is not provided", () => {
    renderWithProviders(<ShowAlert />, {
      alertValue: null,
      updateAlertValue: mockSetAlertInfo,
    });

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
