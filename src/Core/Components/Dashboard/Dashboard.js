import { Grid, Typography } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { Helmet } from "react-helmet";
import ChartCurrentSubject from "src/Core/Components/Dashboard/ChartCurrentSubject";
import ChartSiteVisits from "src/Core/Components/Dashboard/ChartSiteVisits";
import ConversionRate from "src/Core/Components/Dashboard/ConversionRate";
import CurrentVisits from "src/Core/Components/Dashboard/CurrentVisits";
import InfoCards from "src/Core/Components/Dashboard/InfoCards";
import NewsUpdate from "src/Core/Components/Dashboard/NewsUpdate";
import OrderTimeline from "src/Core/Components/Dashboard/OrderTimeline";
import SocialTraffic from "src/Core/Components/Dashboard/SocialTraffic";
import Tasks from "src/Core/Components/Dashboard/Tasks";

// grid container style
const GridContainerStyle = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const Dashboard = () => {
  console.log("SSSS=> Dashboard")
  return (
    <>
      <Helmet>
        <title>Dashboard | RoboAgent</title>
      </Helmet>
      {/*
      <Typography variant="h6" component="h2">
        Hi, Welcome in RoboAgent.
      </Typography> */}

      {/* Info Cards */}
      <InfoCards />

      <GridContainerStyle container spacing={3}>
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
      </GridContainerStyle>
    </>
  );
};

export default Dashboard;
