import { Container, Typography, styled } from "@mui/material";
import { Box } from "@mui/system";
import { Helmet } from "react-helmet";
import LoginPhoto from "assets/Images/image_processing20210907-13511-1juj33d.gif";
import FormLogin from "components/AuthPages/FormLogin";
import LeftPanel from "components/AuthPages/LeftPanel";
import { ContainerBoxStyle } from "styles/styles";

const RightPanelStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  "& .account_switch": {
    textAlign: "right",
    paddingRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    "& .MuiLink-underlineNone	": {
      color: theme.palette.green.darker,
      fontWeight: 500,
    },
    [theme.breakpoints.down("sm")]: {
      paddingRight: theme.spacing(1),
    },
  },

  "& .form_Container": {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    "& .MuiTypography-h4": {
      fontSize: 25,
      fontWeight: 500,
    },
    "& .MuiTypography-paragraph": {
      margin: "8px 0 20px 0",
    },
  },
}));
const Login = () => {
  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>Login | RoboAgent</title>
      </Helmet>

      <ContainerBoxStyle>
        <LeftPanel
          title="Hi, Login to continue"
          img={LoginPhoto}
          imgAlt="Login Image"
        />

        <RightPanelStyle>
          <Container maxWidth="md" className="form_Container">
            <Typography variant="h4">Sign in</Typography>
            <Typography paragraph color="textSecondary">
              Enter your details below.
            </Typography>
            {/* Buttons */}
            {/* <AuthButtonGroup /> */}
            {/* <SectionDivider /> */}
            {/* The Actual Form 👇 */}
            <FormLogin />
          </Container>
        </RightPanelStyle>
      </ContainerBoxStyle>
    </>
  );
};

export default Login;
