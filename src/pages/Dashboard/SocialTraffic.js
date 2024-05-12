import DashCard from "./DashCard";
import DashCardHeader from "./DashCardHeader";
import SocialTrafficItem from "./SocialTrafficItem";

// icons
import {
  RiFacebookFill,
  RiGoogleFill,
  RiLinkedinFill,
  RiTwitterFill,
} from "react-icons/ri";
import { Box, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

const BoxContainerStyle = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "grid",
  gap: theme.spacing(2),
  gridTemplateColumns: `repeat(2, 1fr)`,
}));

// items list

const SocialTraffic = () => {
  const { t } = useTranslation();
  const list = [
    {
      title: t("dashboard.Facebook"),
      amount: "47.10k",
      icon: <RiFacebookFill />,
    },
    {
      title: t("dashboard.Google"),
      amount: "65.60k",
      icon: <RiGoogleFill />,
    },
    {
      title: t("dashboard.LinkedIn"),
      amount: "84.14k",
      icon: <RiLinkedinFill />,
    },
    {
      title: t("dashboard.Twitter"),
      amount: "15.70k",
      icon: <RiTwitterFill />,
    },
  ];
  return (
    <DashCard>
      <DashCardHeader title={t("dashboard.Traffic by Site")} />

      <BoxContainerStyle>
        {list.map((el) => (
          <SocialTrafficItem
            key={el.title}
            icon={el.icon}
            amount={el.amount}
            title={el.title}
          />
        ))}
      </BoxContainerStyle>
    </DashCard>
  );
};

export default SocialTraffic;
