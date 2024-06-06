import { Grid, styled } from "@mui/material";
import { Helmet } from "react-helmet";
import ChartCurrentSubject from "pages/dashboard/ChartCurrentSubject";
import ChartSiteVisits from "pages/dashboard/ChartSiteVisits";
import ConversionRate from "pages/dashboard/ConversionRate";
import CurrentVisits from "pages/dashboard/CurrentVisits";
import InfoCards from "pages/dashboard/InfoCards";
import NewsUpdate from "pages/dashboard/NewsUpdate";
import OrderTimeline from "pages/dashboard/OrderTimeline";
import SocialTraffic from "pages/dashboard/SocialTraffic";
import Tasks from "pages/dashboard/Tasks";

// grid container style
const GridContainerStyle = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const Dashboard = () => {
  console.log("SSSS=> Dashboard");
  return (
    <>
      <Helmet>
        <title>Dashboard | RoboAgent</title>
      </Helmet>

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
