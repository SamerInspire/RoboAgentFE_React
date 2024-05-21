import { Grid } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Providers from "src/components/Providers";
import ChartCurrentSubject from "src/pages/Dashboard/ChartCurrentSubject";
import ChartSiteVisits from "src/pages/Dashboard/ChartSiteVisits";
import ConversionRate from "src/pages/Dashboard/ConversionRate";
import CurrentVisits from "src/pages/Dashboard/CurrentVisits";
import Dashboard from "src/pages/Dashboard/Dashboard";
import InfoCards from "src/pages/Dashboard/InfoCards";
import NewsUpdate from "src/pages/Dashboard/NewsUpdate";
import OrderTimeline from "src/pages/Dashboard/OrderTimeline";
import SocialTraffic from "src/pages/Dashboard/SocialTraffic";
import Tasks from "src/pages/Dashboard/Tasks";

describe("Dashboard Component", () => {
  test("renders without crashing", () => {
    render(
      <BrowserRouter>
        <Providers>
          <Dashboard />
        </Providers>
      </BrowserRouter>
    );
  });

  test("renders InfoCards component", () => {
    render(
      <BrowserRouter>
        <Providers>
          <InfoCards />
        </Providers>
      </BrowserRouter>
    );
    // expect(screen.getByText(/CURRENT TICKETS/i)).toBeInTheDocument();
    // expect(screen.getByText(/USERS ONLINE/i)).toBeInTheDocument();
    // expect(
    //   screen.getByText(/AUTOMATION HANDELED TICKETS/i)
    // ).toBeInTheDocument();
  });

  test("renders all chart and info components", () => {
    render(
      <BrowserRouter>
        <Providers>
          {/* Site visits chart */}
          <Grid item xs={12} md={6} lg={8}>
            <ChartSiteVisits />
          </Grid>

          {/* Current Visits */}
          <Grid item xs={12} md={6} lg={4}>
            <CurrentVisits />
          </Grid>

          {/* Conversion Rates */}
          <Grid item xs={12} md={6} lg={8}>
            <ConversionRate />
          </Grid>

          {/* Current Subject */}
          <Grid item xs={12} md={6} lg={4}>
            <ChartCurrentSubject />
          </Grid>

          {/* News Update */}
          <Grid item xs={12} md={6} lg={8}>
            <NewsUpdate />
          </Grid>

          {/* Order Timeline */}
          <Grid item xs={12} md={6} lg={4}>
            <OrderTimeline />
          </Grid>

          {/* Traffic by Site */}
          <Grid item xs={12} md={6} lg={4}>
            <SocialTraffic />
          </Grid>

          {/* Traffic by Site */}
          <Grid item xs={12} md={6} lg={8}>
            <Tasks />
          </Grid>
        </Providers>
      </BrowserRouter>
    );

    expect(screen.getByText(/Website Visits/i)).toBeInTheDocument();
    expect(screen.getByText(/CurrentVisits/i)).toBeInTheDocument();
    expect(screen.getByText(/ConversionRate/i)).toBeInTheDocument();
    expect(screen.getByText(/ChartCurrentSubject/i)).toBeInTheDocument();
    expect(screen.getByText(/NewsUpdate/i)).toBeInTheDocument();
    expect(screen.getByText(/OrderTimeline/i)).toBeInTheDocument();
    expect(screen.getByText(/SocialTraffic/i)).toBeInTheDocument();
    expect(screen.getByText(/Tasks/i)).toBeInTheDocument();
  });
});
