import { Timeline } from "@mui/lab";
import DashCard from "./DashCard";
import DashCardHeader from "./DashCardHeader";
import OrderTimelineItem from "./OrderTimelineItem";
import { styled } from "@mui/material";
import { useTranslation } from "react-i18next";

const TimelineStyle = styled(Timeline)(({ theme }) => ({
  paddingLeft: theme.spacing(6),

  "& .MuiTimelineItem-missingOppositeContent:before": {
    display: "none",
  },
  "& .MuiTimelineContent-root": {
    paddingTop: 3,
  },
}));

// timeline list

const OrderTimeline = () => {
  const { t } = useTranslation();

  const timelineList = [
    {
      title: t("dashboard.500 tickets, Missing information, Answered"),
      time: "08 Aug 2024 21:53",
      type: "order1",
    },
    {
      title: t("dashboard.900 tickets, Nitaqat & Balance, Answered"),
      time: "29 Jun 2024 08:40",
      type: "order2",
    },
    {
      title: t("dashboard.work payment included"),
      time: "02 Aug 2024 04:21",
      type: "order3",
    },
    {
      title: t("dashboard.New order for work payment"),
      time: "18 Apr 2024 21:51",
      type: "order4",
    },
    {
      title: t(
        "dashboard.Automation started for Nitaqat, 9000 tickets are beaing managed"
      ),
      time: "03 Oct 2023 04:27",
      type: "order5",
    },
  ];
  return (
    <DashCard>
      <DashCardHeader title={t("dashboard.Automation Time line")} />

      <TimelineStyle>
        {timelineList.map((item, index) => (
          <OrderTimelineItem
            key={item.type}
            type={item.type}
            title={item.title}
            time={item.time}
            isLast={index === timelineList.length - 1}
          />
        ))}
      </TimelineStyle>
    </DashCard>
  );
};

export default OrderTimeline;
