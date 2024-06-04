import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import i18next from "i18next";
import { Services } from "src/pages/services/Schema/ServicesSchema";

function ServicesSidebar({
  handleChangeCurrentService,
  currService,
  setCurrService,
  currentUserData,
}) {
  const lang = i18next.language;

  return (
    <Grid
      container
      item
      borderLeft={"1px solid darkgray"}
      display={{ sm: "none", md: "grid" }}
      md={2}
      gap={4}
    >
      {Services.map((service, index) => {
        const showService = currentUserData?.roboAuthorities?.some((auth) =>
          service?.allowedAuthorities?.includes(auth.name)
        );
        return currentUserData.role == "ADMIN" ? (
          <Grid key={service.enName + index} item xs={12}>
            <Grid
              container
              item
              gap={2}
              alignItems={"center"}
              p={2}
              onClick={() =>
                handleChangeCurrentService(service.enName, setCurrService)
              }
              sx={{
                cursor: "pointer",
                fontWeight: service.enName === currService.enName ? "600" : "",
                color: service.enName === currService.enName ? "#04554C" : "",
                backgroundColor:
                  service.enName === currService.enName ? "#d9ffea" : "",
              }}
            >
              <Box
                component={"img"}
                src={service.backgroundImg}
                sx={{ width: "20px", height: "20px" }}
              />
              <Typography variant="body1" fontWeight={"600"} color={"gray"}>
                {" "}
                {lang == "en" ? service.enName : service.arName}
              </Typography>
            </Grid>
          </Grid>
        ) : showService ? (
          <Grid key={service.enName + index} py={2} item xs={12}>
            <Grid
              container
              item
              gap={2}
              alignItems={"center"}
              p={1}
              onClick={() =>
                handleChangeCurrentService(service.enName, setCurrService)
              }
              sx={{
                cursor: "pointer",
                fontWeight: service.enName === currService.enName ? "600" : "",
                color: service.enName === currService.enName ? "#04554C" : "",
                backgroundColor:
                  service.enName === currService.enName ? "#d9ffea" : "",
              }}
            >
              <Box
                component={"img"}
                src={service.backgroundImg}
                sx={{ width: "20px", height: "20px" }}
              />
              <Typography variant="body1" fontWeight={"600"} color={"gray"}>
                {" "}
                {lang == "en" ? service.enName : service.arName}
              </Typography>
            </Grid>
          </Grid>
        ) : service.allowedAuthorities[0] === "all" ? (
          <Grid
            container
            item
            key={service.enName + index}
            gap={2}
            p={1}
            onClick={() =>
              handleChangeCurrentService(service.enName, setCurrService)
            }
            alignItems={"center"}
            sx={{
              cursor: "pointer",
              fontWeight: service.enName === currService.enName ? "600" : "",
              color: service.enName === currService.enName ? "#04554C" : "",
              backgroundColor:
                service.enName === currService.enName ? "#d9ffea" : "",
            }}
          >
            <Box
              component={"img"}
              src={service.backgroundImg}
              sx={{ width: "20px", height: "20px" }}
            />
            <Typography variant="body1" fontWeight={"600"} color={"gray"}>
              {" "}
              {lang == "en" ? service.enName : service.arName}
            </Typography>
          </Grid>
        ) : null;
      })}
    </Grid>
  );
}

export default ServicesSidebar;
