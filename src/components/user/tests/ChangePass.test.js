import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChangePassDialog from '../dialogs/ChangePassDialog';

describe('ChangePassDialog Component', () => {
  const mockHandleClose = jest.fn();
  const mockSetSnackbarData = jest.fn();
  const mockSetAlert = jest.fn();

  const setup = (props = {}) => {
    return render(
      <ChangePassDialog
        changePass={true}
        setSnackbarData={mockSetSnackbarData}
        email="test@example.com"
        setAlert={mockSetAlert}
        handleClose={mockHandleClose}
        {...props}
      />
    );
  };

  test("change pass dialog", () => {
    render(<ChangePassDialog changePass={true}/>);
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(
        screen.getByRole("button", { name: "Change Password" })
    ).toBeInTheDocument();
    });

  test('calls handleClose when cancel button is clicked', () => {
    setup();

    // Click on the Cancel button
    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    fireEvent.click(cancelButton);

    // Verify that handleClose was called
    expect(mockHandleClose).toHaveBeenCalled();
  });

  test('submits the form and calls handleChangePassword', async () => {
    const mockHandleChangePassword = jest.fn();
    jest.mock('utils/users/users', () => ({
      handleChangePassword: () => mockHandleChangePassword,
    }));
});

});
