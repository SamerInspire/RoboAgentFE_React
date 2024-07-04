// etc
import { Box, styled } from "@mui/material";
import InfoCard from "./InfoCard";
import {
  AiFillAndroid,
  AiFillApple,
  AiFillWindows,
  AiFillBug,
} from "react-icons/ai";
import { useTranslation } from "react-i18next";

// info card item list

const ContainerStyle = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(7),
  display: "grid",
  gap: theme.spacing(3),
  gridTemplateColumns: "repeat( auto-fit, minmax(200px, 1fr) )",
}));

const InfoCards = () => {
  const { t } = useTranslation();
  const items = [
    {
      id: "green",
      icon: <AiFillAndroid />,
      count: "714k",
      title: t("dashboard.Current Tickets"),
    },
    {
      id: "blue",
      icon: <AiFillApple />,
      count: "15k",
      title: t("dashboard.Users Online"),
    },
    {
      id: "yellow",
      icon: <AiFillWindows />,
      count: "1.5k",
      title: t("dashboard.Automation Handeled Tickets"),
    },
    {
      id: "maroon",
      icon: <AiFillBug />,
      count: "234",
      title: t("dashboard.Total active Issues"),
    },
  ];
  return (
    <ContainerStyle>
      {items.map((el) => (
        <InfoCard
          key={el.id}
          colorId={el.id}
          icon={el.icon}
          amount={el.count}
          title={el.title}
        />
      ))}
    </ContainerStyle>
  );
};

export default InfoCards;
