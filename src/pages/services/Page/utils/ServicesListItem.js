import { Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import i18n from "src/dictonaries/i18n";
import { AlertContext } from "src/hooks/Context/AlertContext";
import { glassMorphisimStyle } from "src/styles/styles";
const ServicesListItem = ({
  service,
  queryCenterSignup,
  eligiableServices,
  currentUserData,
}) => {
  const lang = i18n.language;
  const [queryCenterAnchorEl, setQueryCenterAnchorEl] = useState(null);
  const { setAlert } = useContext(AlertContext);
  const handleClick = (event) => {
    setQueryCenterAnchorEl(queryCenterAnchorEl ? null : event.currentTarget);
  };
  const isEligiableService =
    queryCenterSignup ||
    !eligiableServices[service.enName] ||
    currentUserData.role == "ADMIN"
      ? true
      : false;
  console.log(eligiableServices);
  return (
    <Link
      component={isEligiableService ? "div" : RouterLink}
      sx={{ textDecoration: "none" }}
      to={
        isEligiableService ? "" : `/dash/services/getAnswer/${service.enName}`
      }
    >
      <Grid
        container
        item
        onClick={() => {
          if (!isEligiableService) {
            setAlert({
              alertType: "warning",
              alertMsg:
                "Please Register in the query center to be able to use the services",
              sleep: 5000,
            });
          }
        }}
        sx={{
          ...glassMorphisimStyle,
          cursor: isEligiableService ? "not-allowed" : "pointer",
          border: "2px solid #4abb7d",
          "&:hover": {
            background: isEligiableService ? "" : "#d9ffea",
          },
          bgcolor: isEligiableService ? "#f0f0f0" : "",
        }}
      >
        <Grid
          container
          position={"relative"}
          item
          sx={{
            height: "240px",
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            component={"img"}
            src={service.backgroundImg}
            sx={{ width: "90px", height: "80px" }}
          />
          <Typography variant="h5" fontWeight={700} textAlign={"center"}>
            {lang == "en" ? service.enName : service.arName}
          </Typography>
        </Grid>
      </Grid>
    </Link>
  );
};

export default ServicesListItem;
