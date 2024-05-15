import {
  render,
  fireEvent,
  getByRole,
  getByLabelText,
} from "@testing-library/react";
import Register from "../register/Register";
import { BrowserRouter } from "react-router-dom";
import Providers from "src/components/Providers";
import FinalRegister from "src/components/AuthPages/FinalRegister";

describe("Register Component", () => {
  test("renders Register component with initial step", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Providers>
          <Register />
        </Providers>
      </BrowserRouter>
    );
    expect(getByText("User registration")).toBeInTheDocument();
    expect(getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("First Name")).toBeInTheDocument();
    expect(getByLabelText("Middle Name")).toBeInTheDocument();
    expect(getByLabelText("Last Name")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
  });

  test("displays the stepper with the correct initial active step", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Providers>
          <Register />
        </Providers>
      </BrowserRouter>
    );

    expect(getByText("User Main Information")).toBeInTheDocument();
  });
});

test("transitions from FormRegister to FinalRegister on button click", () => {
  const { getByText, queryByText } = render(
    <BrowserRouter>
      <Providers>
        <Register />
      </Providers>
    </BrowserRouter>
  );
  const nextButton = getByText("Next");
  fireEvent.click(nextButton);

  expect(queryByText("Choose user role")).toBeInTheDocument();
});

describe("FinalRegister Component", () => {
  test("renders FinalRegister with all components", () => {
    const { getByText, getByLabelText } = render(
      <BrowserRouter>
        <Providers>
          <FinalRegister />
        </Providers>
      </BrowserRouter>
    );

    // Check for headings and buttons
    expect(getByText("Choose user role")).toBeInTheDocument();
    expect(getByText("Choose user team")).toBeInTheDocument();
    expect(getByText("Choose User Services")).toBeInTheDocument();
    expect(getByText("Choose User Main Service")).toBeInTheDocument();
    expect(getByText("BACK")).toBeInTheDocument();
    expect(getByText("REGISTER")).toBeInTheDocument();

    // Check for selectors
    expect(getByLabelText("Services")).toBeInTheDocument();
    expect(getByLabelText("Service")).toBeInTheDocument();
  });
});

test("interactions with next and back buttons", () => {
  const handleBack = jest.fn();
  const handleNext = jest.fn();

  render(
    <BrowserRouter>
      <Providers>
        <FinalRegister handleBack={handleBack} handleNext={handleNext} />
      </Providers>
    </BrowserRouter>
  );

  const backButton = getByRole("button", { name: /BACK/i });
  const nextButton = getByRole("button", { name: /REGISTER/i });

  fireEvent.click(backButton);
  expect(handleBack).toHaveBeenCalled();

  fireEvent.click(nextButton);
  expect(handleNext).toHaveBeenCalled();
});
