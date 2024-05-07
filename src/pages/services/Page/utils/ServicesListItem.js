import { Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import i18n from "src/dictonaries/i18n";
import { glassMorphisimStyle } from "src/styles/styles";
import { Link as RouterLink } from "react-router-dom";
const ServicesListItem = ({ service }) => {
  const lang = i18n.language;

  return (
    <Link
      component={RouterLink}
      sx={{ textDecoration: "none" }}
      to={`/dash/services/getAnswer/${service.enName}`}
    >
      <Grid
        container
        item
        sx={{
          ...glassMorphisimStyle,
          cursor: "pointer",
          border: "2px solid #4abb7d",
          "&:hover": {
            background: "#d9ffea",
          },
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
