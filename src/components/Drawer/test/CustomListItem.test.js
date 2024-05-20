import { render, screen } from "@testing-library/react";
import CustomListItem from "../CustomListItem";
import Providers from "src/components/Providers";
import { BrowserRouter } from "react-router-dom";

describe("CustomListItem Component", () => {
  const mockOnClick = jest.fn();

  test("renders the ListItem with icon and title", () => {
    render(
      <BrowserRouter>
        <Providers>
          <CustomListItem
            path="/"
            icon={<div>Icon</div>}
            title="Title"
            onClick={mockOnClick}
          />
        </Providers>
      </BrowserRouter>
    );

    const iconElement = screen.getByText("Icon");
    expect(iconElement).toBeInTheDocument();

    const titleElement = screen.getByText("Title");
    expect(titleElement).toBeInTheDocument();
  });

  test("executes onClick handler when clicked", () => {
    render(
      <BrowserRouter>
        <Providers>
          <CustomListItem
            path="/"
            icon={<div>Icon</div>}
            title="Title"
            onClick={mockOnClick}
          />
        </Providers>
      </BrowserRouter>
    );

    const listItem = screen.getByText("Title");
    listItem.click();

    expect(mockOnClick).toHaveBeenCalled();
  });
});
