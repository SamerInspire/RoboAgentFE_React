import { render, screen } from "@testing-library/react";
import Providers from "src/components/Providers";
import TasksItem from "../TasksItem";
import DashCardHeader from "../DashCardHeader";
import SocialTraffic from "../SocialTraffic";
import { BrowserRouter } from "react-router-dom";
import Tasks from "../Tasks";

describe("Tasks Component", () => {
  beforeEach(() => {
    render(
      <Providers>
        <BrowserRouter>
          <Tasks />
        </BrowserRouter>
      </Providers>
    );
  });
  console.log(screen);

  test("renders the Tasks component without crashing", () => {
    expect(screen.getByText("Tasks")).toBeInTheDocument();
  });

  test("renders the Add Task button", () => {
    const addButton = screen.getByRole("button", { name: /Add Task/i });
    expect(addButton).toBeInTheDocument();
  });

  test("renders the dialog with the correct title when open", () => {
    const addButton = screen.getByRole("button", { name: /Add Task/i });
    addButton.click();
    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });
});

describe("TasksItem Component", () => {
  test("renders TasksItem component with label", () => {
    render(
      <Providers>
        <TasksItem
          id="1"
          status={false}
          label="Test Task"
          mission={false}
          checkOptions={jest.fn()}
        />
      </Providers>
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  test("renders a checkbox with the correct initial status", () => {
    render(
      <Providers>
        <TasksItem
          id="1"
          status={false}
          label="Test Task"
          mission={false}
          checkOptions={jest.fn()}
        />
      </Providers>
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test("applies the correct styles when checked", () => {
    render(
      <Providers>
        <TasksItem
          id="1"
          status={true}
          label="Test Task"
          mission={true}
          checkOptions={jest.fn()}
        />
      </Providers>
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
    expect(screen.getByText("Test Task")).toHaveStyle(
      "text-decoration: line-through"
    );
  });
});
describe("DashCardHeader Component", () => {
  test("renders DashCardHeader component with title and subheader", () => {
    render(
      <Providers>
        <DashCardHeader title="Test Title" subheader="Test Subheader" />
      </Providers>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subheader")).toBeInTheDocument();
  });
});

jest.mock("react-i18next", () => ({
  ...jest.requireActual("react-i18next"),
  useTranslation: () => ({ t: (key) => key }),
}));
describe("SocialTraffic Component", () => {
  test("renders SocialTraffic component without crashing", () => {
    render(
      <Providers>
        <SocialTraffic />
      </Providers>
    );
  });

  test("renders the DashCardHeader component with correct title", () => {
    render(
      <Providers>
        <SocialTraffic />
      </Providers>
    );
    expect(screen.getByText("dashboard.Traffic by Site")).toBeInTheDocument();
  });
  test("renders all SocialTrafficItem components with correct data", () => {
    render(
      <Providers>
        <SocialTraffic />
      </Providers>
    );

    expect(screen.getByText("dashboard.Facebook")).toBeInTheDocument();
    expect(screen.getByText("47.10k")).toBeInTheDocument();
    expect(screen.getByText("dashboard.Google")).toBeInTheDocument();
    expect(screen.getByText("65.60k")).toBeInTheDocument();
    expect(screen.getByText("dashboard.LinkedIn")).toBeInTheDocument();
    expect(screen.getByText("84.14k")).toBeInTheDocument();
    expect(screen.getByText("dashboard.Twitter")).toBeInTheDocument();
    expect(screen.getByText("15.70k")).toBeInTheDocument();
  });
});
