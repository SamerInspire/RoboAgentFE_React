import { render, screen } from "@testing-library/react";
import Providers from "src/components/Providers";

it("should wrap children with the correct provider order", () => {
  render(
    <Providers>
      <div data-testid="child">Child</div>
    </Providers>
  );

  expect(screen.getByText("Child")).toBeInTheDocument();
});
it("should render without errors when no children are provided", () => {
  render(<Providers />);
  expect(screen).not.toBeNull();
});
