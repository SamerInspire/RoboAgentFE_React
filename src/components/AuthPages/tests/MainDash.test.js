import { Grid } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Providers from "src/components/Providers";
import ChartSiteVisits from "src/pages/Dashboard/ChartSiteVisits";
import ConversionRate from "src/pages/Dashboard/ConversionRate";
import InfoCards from "src/pages/Dashboard/InfoCards";
import OrderTimeline from "src/pages/Dashboard/OrderTimeline";
import Tasks from "src/pages/Dashboard/Tasks";
import ChartCurrentSubject from "src/pages/Dashboard/ChartCurrentSubject";
import CurrentVisits from "src/pages/Dashboard/CurrentVisits";
import Dashboard from "src/pages/Dashboard/Dashboard";

jest.mock("react-apexcharts", () => ({
  __esModule: true,
  default: () => <div />,
}));

describe("Dashboard Component", () => {
  test("renders all the elements without crashing without crashing", () => {
    render(
      <BrowserRouter>
        <Providers>
          <Dashboard />
        </Providers>
      </BrowserRouter>
    );
    expect(screen.getByText(/New Incomming Tickets/i)).toBeInTheDocument();
    expect(screen.getByText(/Current Visits/i)).toBeInTheDocument();
    expect(screen.getByText(/Conversion Rates/i)).toBeInTheDocument();
    expect(screen.getByText(/Website Visits/i)).toBeInTheDocument();
    expect(screen.getByText(/Automation Time line/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Tasks/)[0]).toBeInTheDocument();
  });

  test("renders InfoCards component", () => {
    render(
      <BrowserRouter>
        <Providers>
          <InfoCards />
        </Providers>
      </BrowserRouter>
    );
    expect(screen.getByText(/CURRENT TICKETS/i)).toBeInTheDocument();
    expect(screen.getByText(/USERS ONLINE/i)).toBeInTheDocument();
    expect(screen.getByText(/TOTAL ACTIVE ISSUES/i)).toBeInTheDocument();
    expect(
      screen.getByText(/AUTOMATION HANDELED TICKETS/i)
    ).toBeInTheDocument();
  });

  test("renders New Incomming Tickets  correctly ", () => {
    render(
      <BrowserRouter>
        <Providers>
          {/* Site visits chart */}
          <Grid item xs={12} md={6} lg={8}>
            <ChartCurrentSubject />
          </Grid>
        </Providers>
      </BrowserRouter>
    );
    expect(screen.getByText(/New Incomming Tickets/i)).toBeInTheDocument();
  });
  test("renders Current Visits  Tickets  correctly ", () => {
    render(
      <BrowserRouter>
        <Providers>
          {/* Site visits chart */}
          <Grid item xs={12} md={6} lg={8}>
            <CurrentVisits />
          </Grid>
        </Providers>
      </BrowserRouter>
    );
    expect(screen.getByText(/Current Visits/i)).toBeInTheDocument();
  });
  test("renders Conversion Rates  element correctly ", () => {
    render(
      <BrowserRouter>
        <Providers>
          {/* Site visits chart */}
          <Grid item xs={12} md={6} lg={8}>
            <ConversionRate />
          </Grid>
        </Providers>
      </BrowserRouter>
    );
    expect(screen.getByText(/Conversion Rates/i)).toBeInTheDocument();
  });
  test("renders Website Visits  element correctly ", () => {
    render(
      <BrowserRouter>
        <Providers>
          {/* Site visits chart */}
          <Grid item xs={12} md={6} lg={8}>
            <ChartSiteVisits />
          </Grid>
        </Providers>
      </BrowserRouter>
    );
    expect(screen.getByText(/Website Visits/i)).toBeInTheDocument();
  });

  test("renders Traffic by Site  element correctly ", () => {
    render(
      <BrowserRouter>
        <Providers>
          {/* Site visits chart */}
          <Grid item xs={12} md={6} lg={8}>
            <OrderTimeline />
          </Grid>
        </Providers>
      </BrowserRouter>
    );
    expect(screen.getByText(/Automation Time line/i)).toBeInTheDocument();
    expect(
      screen.getByText(/500 tickets, Missing information, Answered/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/900 tickets, Nitaqat & Balance, Answered/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/work payment included/i)).toBeInTheDocument();
    expect(screen.getByText(/New order for work payment/i)).toBeInTheDocument();
  });
  test("renders news element correctly ", () => {
    render(
      <BrowserRouter>
        <Providers>
          <Grid item xs={12} md={6} lg={8}>
            <Tasks />
          </Grid>
        </Providers>
      </BrowserRouter>
    );
    expect(screen.getAllByText(/Tasks/)[0]).toBeInTheDocument();
    expect(screen.getByText(/Add Task/i)).toBeInTheDocument();
    expect(screen.getByText(/finished tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/active tasks/i)).toBeInTheDocument();
    expect(screen.getAllByText(/selected/i)[0]).toBeInTheDocument();
  });
});
