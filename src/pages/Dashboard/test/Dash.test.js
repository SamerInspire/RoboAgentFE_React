import { render } from "@testing-library/react";
import Providers from "src/components/Providers";
import { lightTheme } from "src/styles/theme";
import ConversionRate from "../ConversionRate";
import CurrentVisits from "../CurrentVisits";
import DashCard from "../DashCard";
import DashCardHeader from "../DashCardHeader";
import NewsUpdate from "../NewsUpdate";
import OrderTimeline from "../OrderTimeline";
import SocialTraffic from "../SocialTraffic";
import Tasks from "../Tasks";
import DashboardLayout from "src/components/layout/DashboardLayout";
import { BrowserRouter } from "react-router-dom";
import { Dashboard } from "@mui/icons-material";
describe("DashCard Component", () => {
  test("it should render children properly", () => {
    const { getByText } = render(
      <Providers>
        <DashboardLayout>
          <DashCard>
            <h1>Test Child</h1>
          </DashCard>
        </DashboardLayout>
      </Providers>
    );
    expect(getByText("Test Child")).toBeInTheDocument();
  });
});

describe("ConversionRate Component", () => {
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      constructor(callback) {
        this.callback = callback;
      }
      observe() {}
      disconnect() {}
    };
  });

  afterAll(() => {
    delete global.ResizeObserver;
  });
  test("renders conversion rate chart", () => {
    const { getByText } = render(
      <Providers theme={lightTheme}>
        <DashboardLayout>
          <ConversionRate />
        </DashboardLayout>
      </Providers>
    );
    expect(getByText("Conversion Rates")).toBeInTheDocument();
    expect(getByText("(+43%) than last year")).toBeInTheDocument();
  });
});
describe("CurrentVisits Component", () => {
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      constructor(callback) {
        this.callback = callback;
      }
      observe() {}
      disconnect() {}
    };
  });

  afterAll(() => {
    delete global.ResizeObserver;
  });
  test("renders current visits chart", () => {
    const { getByText } = render(
      <Providers>
        <BrowserRouter>
          <DashboardLayout>
            <CurrentVisits />
          </DashboardLayout>
        </BrowserRouter>
      </Providers>
    );

    expect(getByText("Current Visits")).toBeInTheDocument();
    expect(getByText("Employee Transfeer")).toBeInTheDocument();
    expect(getByText("Work Permits")).toBeInTheDocument();
    expect(getByText("User Managments")).toBeInTheDocument();
  });
});
describe("OrderTimeline Component", () => {
  test("renders timeline with items", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Providers>
          <DashboardLayout>
            <OrderTimeline />
          </DashboardLayout>
        </Providers>
      </BrowserRouter>
    );
    expect(getByText("Automation Time line")).toBeInTheDocument();
    expect(
      getByText("500 tickets, Missing information, Answered")
    ).toBeInTheDocument();
    expect(getByText("08 Aug 2024 21:53")).toBeInTheDocument();
  });
});
describe("SocialTraffic Component", () => {
  test("renders social media traffic data", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Providers>
          <DashboardLayout>
            <SocialTraffic />
          </DashboardLayout>
        </Providers>
      </BrowserRouter>
    );
    expect(getByText("Traffic by Site")).toBeInTheDocument();
    expect(getByText("47.10k")).toBeInTheDocument();
    expect(getByText("65.60k")).toBeInTheDocument();
    expect(getByText("15.70k")).toBeInTheDocument();
    expect(getByText("84.14k")).toBeInTheDocument();
    expect(getByText("Facebook")).toBeInTheDocument();
    expect(getByText("Twitter")).toBeInTheDocument();
    expect(getByText("LinkedIn")).toBeInTheDocument();
    expect(getByText("Google")).toBeInTheDocument();
  });
});
describe("NewsUpdate Component", () => {
  test("renders news updates correctly", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Providers>
          <DashboardLayout>
            <NewsUpdate />
          </DashboardLayout>
        </Providers>
      </BrowserRouter>
    );
    expect(getByText("Releases")).toBeInTheDocument();
    expect(getByText("about 12 hours")).toBeInTheDocument();
    expect(
      getByText(
        "New Update for Employees that has Borders numbers can accept the new ET"
      )
    ).toBeInTheDocument();
  });
});
describe("Tasks Component", () => {
  test("renders tasks and allows adding a task", () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <Providers>
          <DashboardLayout>
            <Tasks />
          </DashboardLayout>
        </Providers>
      </BrowserRouter>
    );
    expect(getByText("Tasks")).toBeInTheDocument();

    // Simulate adding a task
    const addButton = screen.getByRole("button", {
      name: /ADD TASK/i,
    });
    fireEvent.click(addButton);

    // Check if dialog for adding a task is opened
    expect(getByText("Add Task Information")).toBeInTheDocument();
  });
});
