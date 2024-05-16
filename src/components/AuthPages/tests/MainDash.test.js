import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "src/pages/Dashboard/Dashboard";
import InfoCards from "src/pages/Dashboard/InfoCards";
import ChartSiteVisits from "src/pages/Dashboard/ChartSiteVisits";
import CurrentVisits from "src/pages/Dashboard/CurrentVisits";
import ConversionRate from "src/pages/Dashboard/ConversionRate";
import ChartCurrentSubject from "src/pages/Dashboard/ChartCurrentSubject";
import NewsUpdate from "src/pages/Dashboard/NewsUpdate";
import OrderTimeline from "src/pages/Dashboard/OrderTimeline";
import SocialTraffic from "src/pages/Dashboard/SocialTraffic";
import Tasks from "src/pages/Dashboard/Tasks";
import Providers from "src/components/Providers";
import DashboardLayout from "src/components/layout/DashboardLayout";
import { BrowserRouter } from "react-router-dom";

jest.mock("src/pages/Dashboard/InfoCards");
jest.mock("src/pages/Dashboard/ChartSiteVisits");
jest.mock("src/pages/Dashboard/CurrentVisits");
jest.mock("src/pages/Dashboard/ConversionRate");
jest.mock("src/pages/Dashboard/ChartCurrentSubject");
jest.mock("src/pages/Dashboard/NewsUpdate");
jest.mock("src/pages/Dashboard/OrderTimeline");
jest.mock("src/pages/Dashboard/SocialTraffic");
jest.mock("src/pages/Dashboard/Tasks");

describe("Dashboard Component", () => {
  beforeAll(() => {
    InfoCards.mockImplementation(() => <div>InfoCards</div>);
    ChartSiteVisits.mockImplementation(() => <div>ChartSiteVisits</div>);
    CurrentVisits.mockImplementation(() => <div>CurrentVisits</div>);
    ConversionRate.mockImplementation(() => <div>ConversionRate</div>);
    ChartCurrentSubject.mockImplementation(() => (
      <div>ChartCurrentSubject</div>
    ));
    NewsUpdate.mockImplementation(() => <div>NewsUpdate</div>);
    OrderTimeline.mockImplementation(() => <div>OrderTimeline</div>);
    SocialTraffic.mockImplementation(() => <div>SocialTraffic</div>);
    Tasks.mockImplementation(() => <div>Tasks</div>);
  });

  test("renders without crashing", () => {
    render(
      <Providers>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Providers>
    );
  });

  test("renders InfoCards component", () => {
    render(
      <Providers>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Providers>
    );
    expect(screen.getByText("InfoCards")).toBeInTheDocument();
  });

  test("renders all chart and info components", () => {
    render(
      <Providers>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Providers>
    );

    expect(screen.getByText("ChartSiteVisits")).toBeInTheDocument();
    expect(screen.getByText("CurrentVisits")).toBeInTheDocument();
    expect(screen.getByText("ConversionRate")).toBeInTheDocument();
    expect(screen.getByText("ChartCurrentSubject")).toBeInTheDocument();
    expect(screen.getByText("NewsUpdate")).toBeInTheDocument();
    expect(screen.getByText("OrderTimeline")).toBeInTheDocument();
    expect(screen.getByText("SocialTraffic")).toBeInTheDocument();
    expect(screen.getByText("Tasks")).toBeInTheDocument();
  });
});
