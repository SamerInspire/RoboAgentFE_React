import { render, screen } from "@testing-library/react";
import CustomToast from "../CustomToast";

describe("CustomToast Component", () => {
  const mockHandleClose = jest.fn();

  test("renders the Snackbar when open is true", () => {
    render(
      <CustomToast
        snackbarData={{
          open: true,
          alertType: "success",
          alertMsg: "Test message",
        }}
        handleClose={mockHandleClose}
      />
    );

    // Check if the Snackbar is in the document
    expect(screen.getByRole("alert")).toBeInTheDocument();
    // Check if the Alert message is displayed
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  test("does not render the Snackbar when open is false", () => {
    render(
      <CustomToast
        snackbarData={{
          open: false,
          alertType: "success",
          alertMsg: "Test message",
        }}
        handleClose={mockHandleClose}
      />
    );

    // Check if the Snackbar is not in the document
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  test("renders the Alert with the correct severity", () => {
    render(
      <CustomToast
        snackbarData={{
          open: true,
          alertType: "error",
          alertMsg: "Error message",
        }}
        handleClose={mockHandleClose}
      />
    );

    // Check if the Alert has the correct severity
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("MuiAlert-filledError");
    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  test("Alert message changes based on props", () => {
    render(
      <CustomToast
        snackbarData={{
          open: true,
          alertType: "info",
          alertMsg: "Information message",
        }}
        handleClose={mockHandleClose}
      />
    );

    // Check if the Alert message is updated
    expect(screen.getByText("Information message")).toBeInTheDocument();
  });
});
