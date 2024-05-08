import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { handleFetchCurrentUser } from "src/utils/users/users";
import { Services } from "../Schema/ServicesSchema";
import ServicesListItem from "./utils/ServicesListItem";

const ServicesList = () => {
  const [currentUserData, setCurrentUserData] = useState({});
  useEffect(() => {
    handleFetchCurrentUser({
      requestAction: "SET_CURRENT_USER",
      setCurrentUserData,
    });
  }, []);
  if (currentUserData.role !== "MEMBER") {
    return (
      <Grid container item spacing={4}>
        {Services.map((service, index) => (
          <Grid key={service.enName + index} item xs={12} sm={6} md={4} lg={3}>
            <ServicesListItem
              currentUserData={currentUserData}
              service={service}
            />
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return (
      <Grid container item spacing={4}>
        {Services.map((service, index) => {
          const showService = currentUserData?.roboAuthorities?.some((auth) =>
            service?.allowedAuthorities?.includes(auth.name)
          );
          return showService ? (
            <Grid
              key={service.enName + index}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <ServicesListItem
                currentUserData={currentUserData}
                key={service.value}
                service={service}
              />
            </Grid>
          ) : service.allowedAuthorities[0] === "all" ? (
            <Grid
              key={service.enName + index}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <ServicesListItem
                currentUserData={currentUserData}
                key={service.value}
                service={service}
              />
            </Grid>
          ) : null;
        })}
      </Grid>
    );
  }
};

export default ServicesList;
