import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormLogin from "../FormLogin";
import LoginProvider from "hooks/context/LoginInfoContext";

describe("FormLogin", () => {
  test("renders initial login form", () => {
    render(
      <LoginProvider>
        <FormLogin />
      </LoginProvider>
    );

    // Check for elements in the initial login form
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: "Remember me" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByText("Forgot password?")).toBeInTheDocument();
  });

  test("renders email dialog when steps = 1", () => {
    render(
      <LoginProvider>
        <FormLogin />
      </LoginProvider>
    );
    userEvent.click(screen.getByText("Forgot password?"));

    // Check for elements in the email dialog
    expect(screen.getByText("Reset a Password")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Please enter your email that you wish to change a password for"
      )
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Send OTP" })
    ).toBeInTheDocument();
  });
});
