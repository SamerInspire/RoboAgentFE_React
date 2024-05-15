import { render, screen } from "@testing-library/react";
import NewPassDialog from "../dialogs/NewPassDialog";

describe("NEW PASS Dialog", () => {
  const registerMock = jest.fn();
  test("new pass  dialog", () => {
    render(<NewPassDialog steps={3} register={registerMock} />);
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Change Password" })
    ).toBeInTheDocument();
  });
});
