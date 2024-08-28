/* eslint-disable no-unused-vars */
import {
    fireEvent,
    render,
    screen
  } from "@testing-library/react";
  import Providers from "components/Providers";
  import { BrowserRouter } from "react-router-dom";
  import Profile from "pages/profile/Profile";
  
  describe("Profile Component", () => {
    test("renders profile component with initial step", () => {
      const { queryAllByText } = render(
        <BrowserRouter>
          <Providers>
            <Profile />
          </Providers>
        </BrowserRouter>
      );
      expect(queryAllByText("Profile")[0]).toBeInTheDocument();
      expect(queryAllByText("E-mail")[0]).toBeInTheDocument();
      expect(queryAllByText("First Name")[0]).toBeInTheDocument();
      expect(queryAllByText("Middle Name")[0]).toBeInTheDocument();
      expect(queryAllByText("Last Name")[0]).toBeInTheDocument();
      expect(queryAllByText("Password")[0]).toBeInTheDocument();
      expect(queryAllByText("Role")[0]).toBeInTheDocument();
      expect(queryAllByText("Main Service")[0]).toBeInTheDocument();
      expect(queryAllByText("Team")[0]).toBeInTheDocument();
      // expect(
      //   screen.getByRole("button", { name: "EDIT" })
      // ).toBeInTheDocument();
    });
  
    // test("displays the stepper with the correct initial active step", () => {
    //   const { getByText } = render(
    //     <BrowserRouter>
    //       <Providers>
    //         <Register />
    //       </Providers>
    //     </BrowserRouter>
    //   );
  
    //   expect(getByText("User Main Information")).toBeInTheDocument();
    // });
  });
  
  // test("transitions from click on edit button click", () => {
  //   const { getByText, queryByText } = render(
  //     <BrowserRouter>
  //       <Providers>
  //         <Profile />
  //       </Providers>
  //     </BrowserRouter>
  //   );
  //   const editButton = screen.getByRole("button", { name: "EDIT" });
  //   fireEvent.click(editButton);
  
  //   expect(getByText("Profile")).toBeInTheDocument();
  //   expect(
  //     screen.getByRole("button", { name: "SAVE" })
  //   ).toBeInTheDocument();

  // });
// test('inputs should be disabled by default and enabled after clicking the edit button', () => {
//     render(<BrowserRouter>
//         <Providers>
//           <Profile />
//         </Providers>
//       </BrowserRouter>);

//     const textboxes = screen.getAllByRole('textbox');

//     // Get the input fields
//     const firstNameInput = textboxes[0];
//     const middleNameInput = textboxes[1];
//     const lastNameInput = textboxes[2];
//     const phoneNumberInput = textboxes[3];

//     // Assert that the inputs are initially disabled
//     expect(firstNameInput).toBeDisabled();
//     expect(middleNameInput).toBeDisabled();
//     expect(lastNameInput).toBeDisabled();
//     expect(phoneNumberInput).toBeDisabled();

//     // Get the edit button and click it
//     const editButton = screen.getByRole('button', { name: /edit/i });
//     fireEvent.click(editButton);

//     // Assert that the inputs are enabled after clicking the edit button
//     expect(firstNameInput).not.toBeDisabled();
//     expect(middleNameInput).not.toBeDisabled();
//     expect(lastNameInput).not.toBeDisabled();
//     expect(phoneNumberInput).not.toBeDisabled();
//   });
  