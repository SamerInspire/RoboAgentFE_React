import { Typography } from "@mui/material";
import { styled } from "@mui/material";
import { Box } from "@mui/system";

// styles
const LeftPaneStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  borderRadius: theme.spacing(1),
  boxShadow:
    "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px",

  "& img": {
    alignSelf: "center",
    width: "100%",
    maxWidth: 400,
    objectFit: "cover",
  },

  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const LeftPanel = ({ title, img, imgAlt, children }) => {
  return (
    <LeftPaneStyle p={4}>
      <Typography variant="h4">{title}</Typography>
      {children}
      <Box component="img" src={img} alt={imgAlt} loading="lazy" />
    </LeftPaneStyle>
  );
};

export default LeftPanel;
