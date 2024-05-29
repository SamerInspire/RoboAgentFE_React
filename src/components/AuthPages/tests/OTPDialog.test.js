import { render, screen } from "@testing-library/react";
import OTPDialog from "../dialogs/OTPDialog";

describe("otp Dialog", () => {
  const registerMock = jest.fn();
  test("renders otp  dialog", () => {
    render(<OTPDialog steps={2} register={registerMock} />);
    // expect(screen.getByLabelText("OTP")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Verify" })).toBeInTheDocument();
  });
});
