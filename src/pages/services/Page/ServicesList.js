import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { handleFetchCurrentUser } from "src/utils/users/users";
import { Services } from "../Schema/ServicesSchema";
import ServicesListItem from "./utils/ServicesListItem";
import { useAlert, useUpdateAlert } from "src/hooks/Context/AlertContext";

const ServicesList = () => {
  const [currentUserData, setCurrentUserData] = useState({});
  const queryCenterSignup = useRef(currentUserData.status ? false : true);
  const setAlertInfo = useUpdateAlert();

  useEffect(() => {
    handleFetchCurrentUser({
      requestAction: "SET_CURRENT_USER",
      setCurrentUserData,
    });
  }, []);

  useEffect(() => {
    if (queryCenterSignup.current)
      setAlertInfo({
        alertType: "warning",
        alertMsg:
          "Please Register in the query center to be able to use the services",
        sleep: 1000000,
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
                queryCenterSignup={queryCenterSignup.current}
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
                queryCenterSignup={queryCenterSignup.current}
              />
            </Grid>
          ) : null;
        })}
      </Grid>
    );
  }
};

export default ServicesList;
