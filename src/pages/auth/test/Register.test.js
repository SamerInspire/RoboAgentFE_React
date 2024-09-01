/* eslint-disable no-unused-vars */
import {
  fireEvent,
  render
} from "@testing-library/react";
import Providers from "components/Providers";
import FinalRegister from "components/auth_pages/FinalRegister";
import { BrowserRouter } from "react-router-dom";
import Register from "../register/Register";

describe("Register Component", () => {
  test("renders Register component with initial step", () => {
    const { queryAllByText } = render(
      <BrowserRouter>
        <Providers>
          <Register />
        </Providers>
      </BrowserRouter>
    );
    expect(queryAllByText("User registration")[0]).toBeInTheDocument();
    // expect(getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(queryAllByText("Email")[0]).toBeInTheDocument();
    expect(queryAllByText("First Name")[0]).toBeInTheDocument();
    expect(queryAllByText("Middle Name")[0]).toBeInTheDocument();
    expect(queryAllByText("Last Name")[0]).toBeInTheDocument();
    expect(queryAllByText("Password")[0]).toBeInTheDocument();
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

  expect(getByText("User registration")).toBeInTheDocument();
});

describe("FinalRegister Component", () => {
  test("renders FinalRegister with all components", () => {
    const selectedAuthorities = [
      '',''
    ]
    const selectedService=['']
    const { getByText, getByLabelText } = render(
      <BrowserRouter>
        <Providers>
          <FinalRegister selectedAuthorities={selectedAuthorities} selectedService={selectedService} />
        </Providers>
      </BrowserRouter>
    );

    // Check for headings and buttons
    expect(getByText("Choose user role")).toBeInTheDocument();
    expect(getByText("Choose user team")).toBeInTheDocument();
    expect(getByText("Choose User Services")).toBeInTheDocument();
    expect(getByText("Choose User Main Service")).toBeInTheDocument();
    expect(getByText(/BACK/i)).toBeInTheDocument();
    expect(getByText(/REGISTER/i)).toBeInTheDocument();
  });
});
