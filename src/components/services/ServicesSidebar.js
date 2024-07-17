import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import generalImg from "assets/images/services/apps-svgrepo-com.svg";
import i18next from "i18next";
import { useState } from "react";
import { Services as ServicesSchema }  from "pages/services/schema/ServicesSchema";

function ServicesSidebar({
  handleChangeCurrentService,
  currService,
  setCurrService,
  currentUserData,
}) {
  const [Services] = useState(JSON.parse(localStorage.getItem('ServiceList'))? JSON.parse(localStorage.getItem('ServiceList')): ['','','',''])

  console.log("Services ", JSON.parse(localStorage.getItem('ServiceList')))

  const lang = i18next.language;
  return (
    <Grid
      container
      item
      borderLeft={"1px solid darkgray"}
      display={{ sm: "none", md: "grid" }}
      md={2}
      gap={2}
    >
      {Services.map((service, index) => {
        const showService = currentUserData?.roboAuthorities?.some((auth) =>
          service?.allowedAuthorities?.includes(auth.name)
        );
        return currentUserData.role == "ADMIN" ? (
          <Grid key={service.description + index} item xs={12}>
            <Grid
              container
              item
              gap={2}
              alignItems={"center"}
              p={2}
              onClick={() =>
                handleChangeCurrentService(service.service, setCurrService)
              }
              sx={{
                cursor: "pointer",
                fontWeight: service.description === currService.description ? "600" : "",
                color: service.description === currService.description ? "#04554C" : "",
                backgroundColor:
                  service.description === currService.description ? "#d9ffea" : "",
              }}
            >
              <Box
                component={"img"}
                src={service.bcUrl ? service.bcUrl : generalImg}
                sx={{ width: "20px", height: "20px" }}
              />
              <Typography variant="body1" fontWeight={"600"} color={"gray"}>
                {" "}
                {lang == "en" ? service.description : ServicesSchema[service.id -1].descriptionAr}
              </Typography>
            </Grid>
          </Grid>
        ) : showService ? (
          <Grid key={service.description + index} py={2} item xs={12}>
            <Grid
              container
              item
              gap={2}
              alignItems={"center"}
              p={1}
              onClick={() =>
                handleChangeCurrentService(service.service, setCurrService)
              }
              sx={{
                cursor: "pointer",
                fontWeight: service.description === currService.description ? "600" : "",
                color: service.description === currService.description ? "#04554C" : "",
                backgroundColor:
                  service.description === currService.description ? "#d9ffea" : "",
              }}
            >
              <Box
                component={"img"}
                src={service.bcUrl ? service.bcUrl : generalImg}
                sx={{ width: "20px", height: "20px" }}
              />
              <Typography variant="body1" fontWeight={"600"} color={"gray"}>
                {" "}
                {lang == "en" ? service.description : ServicesSchema[service.id -1].descriptionAr}
              </Typography>
            </Grid>
          </Grid>
        ) : service.allowedAuthorities[0] === "all" ? (
          <Grid
            container
            item
            key={service.description + index}
            gap={2}
            p={1}
            onClick={() =>
              handleChangeCurrentService(service.service, setCurrService)
            }
            alignItems={"center"}
            sx={{
              cursor: "pointer",
              fontWeight: service.description === currService.description ? "600" : "",
              color: service.description === currService.description ? "#04554C" : "",
              backgroundColor:
                service.description === currService.description ? "#d9ffea" : "",
            }}
          >
            <Box
              component={"img"}
              src={service.bcUrl ? service.bcUrl : generalImg}
              sx={{ width: "20px", height: "20px" }}
            />
            <Typography variant="body1" fontWeight={"600"} color={"gray"}>
              {" "}
              {lang == "en" ? service.description :ServicesSchema[service.id -1].descriptionAr}
            </Typography>
          </Grid>
        ) : null;
      })}
    </Grid>
  );
}

export default ServicesSidebar;
