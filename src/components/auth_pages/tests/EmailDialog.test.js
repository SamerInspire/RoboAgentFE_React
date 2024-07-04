import { render, screen } from "@testing-library/react";
import EmailDialog from "../dialogs/EmailDialog";

describe("email Dialog", () => {
  const registerMock = jest.fn();
  test("renders email  dialog", () => {
    render(<EmailDialog steps={1} register={registerMock} />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Send OTP" })
    ).toBeInTheDocument();
  });
});
