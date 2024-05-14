import { Button, Typography, styled } from "@mui/material";
import { Box } from "@mui/system";
import { Helmet } from "react-helmet";
import Lottie from "react-lottie";
import { Link as RouterLink } from "react-router-dom";
import animated404 from "src/assets/lottie/Animation - 1715605056269 (3).json";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animated404,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
// style
const BoxStyle = styled(Box)(({ theme }) => ({
  maxWidth: theme.breakpoints.values.sm,
  minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight * 2}px)`,
  margin: "0 auto",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  "& .MuiTypography-paragraph": {
    marginTop: 20,
    marginBottom: 20,
  },
  "& img": {
    width: "100%",
    maxWidth: 400,
    objectFit: "cover",
  },
  "& .MuiButton-root": {
    backgroundColor: theme.palette.green.darker,
    color: "#fff",
    marginTop: 40,
  },

  [theme.breakpoints.down("sm")]: {
    "& .MuiTypography-h3": { fontSize: 30, fontWeight: 500 },
  },
}));

const ErrorPage = () => {
  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>404 | RoboAgent</title>
      </Helmet>

      <BoxStyle>
        <Typography variant="h3" color={"primary.light"}>
          Sorry, page not found!
        </Typography>

        <Typography paragraph color="textSecondary">
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </Typography>

        {/* <img src={image} alt="404 Error" loading="lazy" /> */}
        <Lottie options={defaultOptions} height={400} width={400} />

        <Button
          to="/"
          variant="contained"
          component={RouterLink}
          disableElevation
        >
          Go to Home
        </Button>
      </BoxStyle>
    </>
  );
};

export default ErrorPage;
