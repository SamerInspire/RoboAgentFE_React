import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Services } from "../Schema/ServicesSchema";
import ServicesListItem from "./utils/ServicesListItem";
import { handleFetchCurrentUser } from "src/utils/users/users";

const ServicesList = () => {
  const [currentUserData, setCurrentUserData] = useState({});
  useEffect(() => {
    handleFetchCurrentUser({
      requestAction: "SET_CURRENT_USER",
      setCurrentUserData,
    });
  }, []);
  if (
    currentUserData.role === "TEAM_LEAD" ||
    currentUserData.role === "ADMIN"
  ) {
    return (
      <Grid container item spacing={4}>
        {Services.map((service) => (
          <Grid key={service.value} item xs={12} sm={6} md={4} lg={3}>
            <ServicesListItem service={service} />
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return (
      <Grid container item spacing={4}>
        {Services.map((service) => {
          const showService = currentUserData?.roboAuthorities?.some((auth) =>
            service?.allowedAuthorities?.includes(auth.name)
          );
          return showService ? (
            <Grid key={service.value} item xs={12} sm={6} md={4} lg={3}>
              <ServicesListItem key={service.value} service={service} />
            </Grid>
          ) : service.allowedAuthorities[0] === "all" ? (
            <Grid key={service.value} item xs={12} sm={6} md={4} lg={3}>
              <ServicesListItem key={service.value} service={service} />
            </Grid>
          ) : null;
        })}
      </Grid>
    );
  }
};

export default ServicesList;
