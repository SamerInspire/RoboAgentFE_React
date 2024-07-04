import i18n from "dictonaries/i18n";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import DashCard from "./DashCard";
import DashCardBox from "./DashCardBox";
import DashCardHeader from "./DashCardHeader";

// chart data series

const ChartSiteVisits = () => {
  const { t } = useTranslation();
  const SERIES = [
    {
      name: t("dashboard.L1 Team"),
      type: "column",
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
    },
    {
      name: t("dashboard.L2 Team"),
      type: "area",
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
    },
    {
      name: t("dashboard.Admins"),
      type: "line",
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
    },
  ];

  const options = {
    chart: {
      id: "basic-bar",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "15%",
        borderRadius: 4,
      },
    },
    stroke: { curve: "smooth", width: [0, 2, 3] },
    markers: { size: 0 },
    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
    xaxis: {
      type: "datetime",
    },

    labels: [
      "01/01/2003",
      "02/01/2003",
      "03/01/2003",
      "04/01/2003",
      "05/01/2003",
      "06/01/2003",
      "07/01/2003",
      "08/01/2003",
      "09/01/2003",
      "10/01/2003",
      "11/01/2003",
    ],
    tooltip: {
      shared: true,
      opposite: true,

      intersect: false,
      x: { show: false },
      y: {
        formatter: (val) =>
          val !== undefined ? `${val.toFixed(0)} visits` : val,
      },
      style: {
        fontFamily: "inherit",
      },
    },

    legend: {
      labels: {
        style: {
          fontSize: 30,
        },
      },
      position: "top",
      horizontalAlign: i18n.language == "ar" ? "left" : "right",
    },
  };

  return (
    <DashCard>
      <DashCardHeader
        title={t("dashboard.Website Visits")}
        subheader={t("dashboard.(+43%) than last year")}
      />

      <DashCardBox>
        <Chart options={options} series={SERIES} type="line" height={300} />
      </DashCardBox>
    </DashCard>
  );
};

export default ChartSiteVisits;
