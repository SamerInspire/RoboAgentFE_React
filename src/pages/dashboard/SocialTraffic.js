import DashCard from "./DashCard";
import DashCardHeader from "./DashCardHeader";
import SocialTrafficItem from "./SocialTrafficItem";

// icons
import { Grid, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  RiFacebookFill,
  RiGoogleFill,
  RiLinkedinFill,
  RiTwitterFill,
} from "react-icons/ri";

const BoxContainerStyle = styled(Grid)(({ theme }) => ({
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
      title: t("Facebook"),
      amount: "47.10k",
      icon: <RiFacebookFill />,
    },
    {
      title: t("Google"),
      amount: "65.60k",
      icon: <RiGoogleFill />,
    },
    {
      title: t("LinkedIn"),
      amount: "84.14k",
      icon: <RiLinkedinFill />,
    },
    {
      title: t("Twitter"),
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
