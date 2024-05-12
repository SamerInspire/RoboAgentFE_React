import { Box, styled } from "@mui/material";
import DashCard from "./DashCard";
import DashCardHeader from "./DashCardHeader";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";

const DivStyle = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  "& .apexcharts-legend": {
    borderTop: `1px solid ${theme.palette.gray.light}`,
    padding: `20px 4px 4px 4px`,
  },
}));

// series data for radar

const ChartCurrentSubject = () => {
  const { t } = useTranslation();
  const SERIES_DATA = [
    {
      name: t("dashboard.Series 1"),
      data: [80, 50, 30, 40, 100, 20],
    },
    {
      name: t("dashboard.Series 2"),
      data: [20, 30, 40, 80, 20, 80],
    },
    {
      name: t("dashboard.Series 3"),
      data: [44, 76, 78, 13, 43, 10],
    },
  ];
  const chartOptions = {
    chart: { toolbar: { show: false } },
    stroke: { width: 2 },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    markers: { size: 0 },
    xaxis: {
      categories: [
        t("dashboard.Employee Transfeer"),
        t("dashboard.Visas"),
        t("dashboard.User managments"),
        t("dashboard.Privilages"),
        t("dashboard.Work Permits"),
        t("dashboard.Other services"),
      ],
    },
    fill: {
      opacity: 0.5,
    },
  };
  return (
    <DashCard>
      <DashCardHeader title="New Incomming Tickets" />

      <DivStyle>
        <ReactApexChart
          options={chartOptions}
          series={SERIES_DATA}
          type="radar"
          height={350}
        />
      </DivStyle>
    </DashCard>
  );
};

export default ChartCurrentSubject;
