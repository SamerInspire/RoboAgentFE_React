import { Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import i18n from "src/dictonaries/i18n";
import { useUpdateAlert } from "src/hooks/Context/AlertContext";
import { glassMorphisimStyle } from "src/styles/styles";
const ServicesListItem = ({ service, queryCenterSignup }) => {
  const lang = i18n.language;
  const [queryCenterAnchorEl, setQueryCenterAnchorEl] = useState(null);
  const setAlertInfo = useUpdateAlert();
  const handleClick = (event) => {
    setQueryCenterAnchorEl(queryCenterAnchorEl ? null : event.currentTarget);
  };
  console.log(queryCenterSignup);
  return (
    <Link
      component={queryCenterSignup ? "div" : RouterLink}
      sx={{ textDecoration: "none" }}
      to={queryCenterSignup ? "" : `/dash/services/getAnswer/${service.enName}`}
    >
      <Grid
        container
        item
        onClick={() =>
          setAlertInfo({
            alertType: "warning",
            alertMsg:
              "Please Register in the query center to be able to use the services",
            sleep: 5000,
          })
        }
        sx={{
          ...glassMorphisimStyle,
          cursor: queryCenterSignup ? "not-allowed" : "pointer",
          border: "2px solid #4abb7d",
          "&:hover": {
            background: queryCenterSignup ? "" : "#d9ffea",
          },
          bgcolor: queryCenterSignup ? "#f6f6f6" : "",
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
