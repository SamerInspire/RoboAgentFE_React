import { Box, Grid, Typography } from "@mui/material";
import { redirect } from "react-router-dom";
import i18n from "src/dictonaries/i18n";
import { glassMorphisimStyle } from "src/styles/styles";
import CreditCardIcon from "@mui/icons-material/CreditCard";
// card style

const ServicesListItem = ({ service }) => {
  const lang = i18n.language;
  const navigateToService = () =>
    redirect(`/dash/services/getAnswer/${service.enName}`);
  return (
    <Grid
      container
      item
      sx={{ ...glassMorphisimStyle, cursor: "pointer" }}
      onClick={navigateToService}
    >
      <Grid
        container
        position={"relative"}
        item
        sx={{
          height: "60px",
          borderTopRightRadius: "10px",
          borderTopLeftRadius: "10px",
        }}
      >
        <Box
          sx={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            position: "absolute",
            top: "100%",
            left: "50px",
            transform: "translate(-50%,-50%)",
            bgcolor: "#fff",
            border: "1px solid ",
            borderColor: "primary.main",
            zIndex: 11,
          }}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CreditCardIcon sx={{ fontSize: 36, color: "primary.main" }} />
        </Box>
      </Grid>
      <Grid
        container
        item
        className="cardImage"
        justifyContent={"center"}
        p={4}
        sx={{ paddingTop: 0 }}
        position={"relative"}
        height={"150px"}
      >
        <Box
          position={"absolute"}
          sx={{
            objectFit: "conver",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            zIndex: -1,
          }}
          width={"100%"}
          height={"100%"}
          component={"img"}
          src={service.backgroundImg}
        />
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          position={"absolute"}
          sx={{
            "&:hover": {
              bgcolor: "rgba(0,0,0,.3)",
            },
            bgcolor: "rgba(0,0,0,.4)",
            zIndex: 0,
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
          width={"100%"}
          height={"100%"}
        >
          <Typography
            variant="h5"
            color={"#fff"}
            fontWeight={600}
            textAlign={"center"}
          >
            {lang == "en" ? service.enName : service.arName}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ServicesListItem;
{
  /* <Link
component={RouteLink}
to={`/dash/services/getAnswer/${service.enName}`}
underline="hover"
color="inherit"
>
<Box
  sx={{ pt: "100%", position: "relative" }}
  href="/dash/services/getAnswer"
></Box>
</Link> */
}
