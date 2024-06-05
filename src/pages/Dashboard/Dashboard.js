import { Grid, styled } from "@mui/material";
import { Helmet } from "react-helmet";
import ChartCurrentSubject from "pages/Dashboard/ChartCurrentSubject";
import ChartSiteVisits from "pages/Dashboard/ChartSiteVisits";
import ConversionRate from "pages/Dashboard/ConversionRate";
import CurrentVisits from "pages/Dashboard/CurrentVisits";
import InfoCards from "pages/Dashboard/InfoCards";
import NewsUpdate from "pages/Dashboard/NewsUpdate";
import OrderTimeline from "pages/Dashboard/OrderTimeline";
import SocialTraffic from "pages/Dashboard/SocialTraffic";
import Tasks from "pages/Dashboard/Tasks";

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
