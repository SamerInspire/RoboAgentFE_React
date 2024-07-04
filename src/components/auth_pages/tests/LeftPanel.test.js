import { render, screen } from "@testing-library/react";
import Providers from "components/Providers";
import LeftPanel from "../LeftPanel";

describe("LeftPanel Component", () => {
  test("renders without crashing", () => {
    render(
      <Providers>
        <LeftPanel title="Test Title" img="test.jpg" imgAlt="Test Image" />
      </Providers>
    );
  });

  test("renders title correctly", () => {
    render(
      <Providers>
        <LeftPanel title="Test Title" img="test.jpg" imgAlt="Test Image" />
      </Providers>
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  test("renders image with correct src and alt attributes", () => {
    render(
      <Providers>
        <LeftPanel title="Test Title" img="test.jpg" imgAlt="Test Image" />
      </Providers>
    );
    const img = screen.getByAltText("Test Image");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "test.jpg");
  });

  test("renders children correctly", () => {
    render(
      <Providers>
        <LeftPanel title="Test Title" img="test.jpg" imgAlt="Test Image">
          <div>Test Child</div>
        </LeftPanel>{" "}
      </Providers>
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  test("applies correct styles", () => {
    const { container } = render(
      <Providers>
        <LeftPanel title="Test Title" img="test.jpg" imgAlt="Test Image" />
      </Providers>
    );
    const leftPaneStyle = container.firstChild;
    expect(leftPaneStyle).toHaveStyle("display: flex");
    expect(leftPaneStyle).toHaveStyle("flex-direction: column");
    expect(leftPaneStyle).toHaveStyle("justify-content: center");
    expect(leftPaneStyle).toHaveStyle("border-radius: 8px");
    expect(leftPaneStyle).toHaveStyle(
      "box-shadow: rgb(145 158 171 / 24%) 0px 0px 2px 0px,rgb(145 158 171 / 24%) 0px 16px 32px -4px"
    );
  });

  test(" render on small screens", () => {
    window.innerWidth = 500;
    render(
      <Providers>
        <LeftPanel title="Test Title" img="test.jpg" imgAlt="Test Image" />
      </Providers>
    );
    const leftPaneStyle = screen.queryByText("Test Title");
    expect(leftPaneStyle).toBeInTheDocument();
  });
});
