import { getByLabelText, render } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader component", () => {
  test("renders without crashing", () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toHaveClass("loader");
  });

  test("applies custom styles", () => {
    const customStyles = {
      backgroundColor: "red",
      width: "50px",
      height: "50px",
    };
    const { getByRole } = render(<Loader styles={customStyles} />);

    const loaderDiv = getByLabelText("loader");
    expect(loaderDiv).toHaveStyle("background-color: red");
    expect(loaderDiv).toHaveStyle("width: 50px");
    expect(loaderDiv).toHaveStyle("height: 50px");
  });
});
