import ReactApexChart from "react-apexcharts";
import DashCard from "./DashCard";
import DashCardBox from "./DashCardBox";
import DashCardHeader from "./DashCardHeader";
import { useTranslation } from "react-i18next";
import "./charts.css";
import i18n from "dictonaries/i18n";
const SERIES_DATA = [
  {
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
  },
];

const ConversionRate = () => {
  const { t } = useTranslation();
  const chartOptions = {
    chart: { toolbar: { show: false } },

    //markers: { show: false },
    yaxis: {
      opposite: i18n.language == "ar" ? true : false,
      labels: {
        style: {
          fontSize: 15,
        },
      },
    },
    xaxis: {
      opposite: i18n.language == "ar" ? true : false,
      labels: {
        style: {
          direction: "rtl",
        },
      },
      categories: [
        t("dashboard.Employee Transfeer"),
        t("dashboard.Visas"),
        t("dashboard.Work Permit"),
        t("dashboard.Establishment Information"),
        t("dashboard.User Managment"),
        t("dashboard.Privileges"),
        t("dashboard.Indivisuals"),
        t("dashboard.E-Adviser"),
        t("dashboard.Violations"),
        t("dashboard.Policies"),
      ],
    },
    plotOptions: {
      bar: {
        barHeight: "25%",
        borderRadius: 4,
        horizontal: true,

        colors: {
          ranges: [
            {
              color: "#ff0",
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      marker: { show: false },

      x: { show: false },
      y: {
        title: {
          formatter: (sname) => `#${sname}`,
        },
      },
    },
  };
  return (
    <DashCard>
      <DashCardHeader
        title={t("dashboard.Conversion Rates")}
        subheader={t("dashboard.(+43%) than last year")}
      />

      <DashCardBox>
        <ReactApexChart
          type="bar"
          series={SERIES_DATA}
          options={chartOptions}
          height={350}
        />
      </DashCardBox>
    </DashCard>
  );
};

export default ConversionRate;
