import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import "react-phone-number-input/style.css";
import { AlertContext } from "hooks/Context/AlertContext";
import {
  handleFetchAuthorities,
  handleFetchServiceList,
} from "utils/users/users";
export async function handleFinalRegistration(
  userRole,
  userTeam,
  userServices,
  userMainService,
  userId
) {
  try {
    const rolePromise = axios.post(
      `/api/user-roles/${userId}/roles/${userRole}`
    );
    const mainServicePromise = axios.post(
      `/service/${userId}/service/${userMainService}`
    );
    const servicePromise = axios.post(`/api/user-auth`, userServices);
    const teamPromise = axios.post(`/userTeam/${userId}/${userTeam}`);
    Promise.all([
      rolePromise,
      mainServicePromise,
      servicePromise,
      teamPromise,
    ]).then((values) => {
      console.log(values);
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
const FinalRegister = ({ handleBack, handleNext }) => {
  const [selectedRole, setSelectedRole] = useState("MEMBER");
  const [serviceList, setServiceList] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("L2");
  const [selectedAuthorities, setSelectedAuthorities] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const { t } = useTranslation();
  const { setAlert } = useContext(AlertContext);
  const userRoles = [
    { value: "TEAM_LEAD", title: t("register.Team Lead") },
    { value: "MEMBER", title: t("register.Member") },
  ];
  const teams = ["L1", "L2"];
  const {
    handleSubmit,
    reset: clearFinalForm,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    handleFetchAuthorities({
      setAuthorities,
      requestAction: "GET_ALL_AUTHORITIES",
      setIsLoading: () => {},
      setAlert,
    });
    handleFetchServiceList({
      setServiceList,
      requestAction: "SET_SERVICE_LIST",
      setIsLoading: () => {},
      setAlert,
    });
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const values = typeof value === "string" ? value.split(",") : value;
    const authArr = [];
    values.map((value) => {
      const newObj = { authId: value };
      authArr.push(newObj);
    });
    setSelectedAuthorities(authArr);
  };
  return (
    <form
      noValidate
      onSubmit={handleSubmit(() =>
        handleNext(
          {
            role: selectedRole,
            team: selectedTeam,
            roboAuthorities: selectedAuthorities,
            service: selectedService,
          },
          clearFinalForm
        )
      )}
    >
      <Grid container item gap={4}>
        <Grid container item>
          <Grid container item gap={4} xs={12} md={6} justifyContent={"center"}>
            <Grid item xs={12} textAlign={"center"}>
              <Typography variant="h5">
                {t("register.Choose user role")}{" "}
              </Typography>
            </Grid>
            {userRoles.map((role) => (
              <Grid item xs={12} md={4} key={role.value}>
                <Button
                  fullWidth
                  variant={
                    role.value == selectedRole ? "contained" : "outlined"
                  }
                  onClick={() => setSelectedRole(role.value)}
                >
                  {role.title}
                </Button>
              </Grid>
            ))}
          </Grid>
          <Grid container item xs={12} md={6} gap={4} justifyContent={"center"}>
            <Grid item xs={12} textAlign={"center"}>
              <Typography variant="h5">
                {t("register.Choose user team")}{" "}
              </Typography>
            </Grid>
            {teams.map((team) => (
              <Grid item xs={12} md={4} key={team}>
                <Button
                  fullWidth
                  variant={team == selectedTeam ? "contained" : "outlined"}
                  onClick={(e) => setSelectedTeam(team)}
                >
                  {team}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid container item gap={4} justifyContent={"center"}>
          <Grid container item spacing={8}>
            <Grid container item xs={12} md={6} gap={4}>
              <Grid item xs={12} textAlign={"center"}>
                <Typography variant="h5">
                  {t("register.Choose User Services")}
                </Typography>
              </Grid>
              <FormControl fullWidth>
                <InputLabel>{t("register.Services")}</InputLabel>
                <Select
                  value={selectedAuthorities.map((e) => e.authId)}
                  label={t("register.Services")}
                  multiple
                  onChange={handleChange}
                >
                  {authorities.map((auth) => (
                    <MenuItem key={auth.authId} value={auth.authId}>
                      {auth.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid container item xs={12} md={6} gap={4}>
              <Grid item xs={12} textAlign={"center"}>
                <Typography variant="h5">
                  {t("register.Choose User Main Service")}
                </Typography>
              </Grid>
              <FormControl fullWidth>
                <InputLabel>{t("register.Service")}</InputLabel>
                <Select
                  value={selectedService}
                  label={t("register.Service")}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  {serviceList.map((service) => (
                    <MenuItem key={service.service} value={service.service}>
                      {service.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12} justifyContent={"flex-end"} spacing={4}>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="outlined"
              sx={{ p: 2 }}
              onClick={handleBack}
              aria-label="back"
            >
              {t("backButton")}
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ p: 2 }}
              aria-label="register"
              disableElevation
            >
              {t("register.registerButton")}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default FinalRegister;
