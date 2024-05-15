import { render } from "@testing-library/react";
import Providers from "src/components/Providers";
import UserTable from "../UserTable";

describe("UserTable Component", () => {
  test("renders UserTable component with the title", () => {
    const { queryAllByText } = render(
      <Providers>
        <UserTable />
      </Providers>
    );
    expect(queryAllByText("Users List")[0]).toBeInTheDocument();
  });
});
test("renders all defined columns", () => {
  const { getByText } = render(<UserTable />);
  expect(getByText("First Name")).toBeInTheDocument();
  expect(getByText("Middle Name")).toBeInTheDocument();
  expect(getByText("Last Name")).toBeInTheDocument();
  expect(getByText("Status")).toBeInTheDocument();
  expect(getByText("Role")).toBeInTheDocument();
  expect(getByText("Email")).toBeInTheDocument();
  expect(getByText("Service")).toBeInTheDocument();
  expect(getByText("Services")).toBeInTheDocument();
  expect(getByText("Team")).toBeInTheDocument();
});
