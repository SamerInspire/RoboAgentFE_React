import { Services } from "../Schema/ServicesSchema";

import { Button, Grid, TextField, Typography } from "@mui/material";
import i18next from "i18next";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { AlertContext } from "src/hooks/Context/AlertContext";
import TasksItem from "src/pages/Dashboard/TasksItem";
import { TopPaneStyle } from "src/styles/styles";
import { numbersOnly } from "src/utils/DefualtValidators";
import { handleGetResponse } from "src/utils/api/answer/service";
import { handleFetchCurrentUser } from "src/utils/users/users";

const ServicesGetAnswer = ({}) => {
  let { servicename } = useParams();
  const [answer, setAnswer] = useState("");
  const [currentUserData, setCurrentUserData] = useState(null);
  const isEligiable = useRef(false);
  console.log("answer ===> Siminz ", answer);
  const currService = Services.filter(
    (service) => service.enName == servicename
  )[0];
  const [loading, setLoading] = useState();
  const { setAlert } = useContext(AlertContext);
  const lang = i18next.language;
  const navigate = useNavigate();
  const [options, setOptions] = useState(() => {
    const options = {};
    currService.options.map((o) => (options[o["id"]] = false));
    return options;
  });

  // form submit
  const handelCheckValue = (id, status) => {
    options[id] = status;
  };
  // hook form
  useEffect(() => {
    handleFetchCurrentUser({
      requestAction: "SET_CURRENT_USER",
      setCurrentUserData,
      setAlert,
    });
  }, []);
  useEffect(() => {
    if (servicename == "General") {
      isEligiable.current = true;
    } else {
      if (currentUserData) {
        currentUserData.roboAuthorities.map((auth) => {
          if (currService.allowedAuthorities.includes(auth.name)) {
            isEligiable.current = true;
            return;
          }
        });
      }
    }
    return setAlert();
  }, [currentUserData]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      establishment_number: "",
      id_number: "",
      check_options: "",
    },
  });

  return (
    <Grid container justifyContent={"center"} position={"relative"} gap={4}>
      <Grid item xs={6}>
        <TopPaneStyle
          item="true"
          textAlign="center"
          alignContent="center"
          width="100%"
          padding={1}
        >
          <Typography margin={2} variant="h3" style={{ fontWeight: "bold" }}>
            {lang === "en" ? currService.enName : currService.arName}
          </Typography>
        </TopPaneStyle>
      </Grid>
      <form
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        onSubmit={handleSubmit(async (data) => {
          if (isEligiable.current) {
            setLoading(true);
            setAlert({
              alertType: "info",
              alertMsg: "Generating Ticket Answer",
              sleep: 999999,
            });
            await handleGetResponse({
              requestAction: "SET_ANSWER",
              setAnswer,
              data,
              servicename,
              options,
              setAlert,
            });
            setLoading(false);
          } else {
            setAlert({
              alertType: "error",
              alertMsg: "Sorry You Are not Eligiable to use this service",
            });
          }
        })}
      >
        <Grid container item xs={12} gap={4}>
          <Grid container item spacing={4}>
            <Grid container item xs={6} gap={1}>
              <Grid item xs={12}>
                <Typography variant="body1" fontWeight={500}>
                  Reason *
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  fullWidth
                  {...register("reason", {
                    onChange: (e) =>
                      numbersOnly(e, {
                        type: "IDNo",
                        maxNumber: 10,
                        replaceWith: "",
                      }),
                    onPaste: (e) =>
                      numbersOnly(e, {
                        type: "IDNo",
                        maxNumber: 10,
                        replaceWith: "",
                      }),
                  })}
                  disabled={loading}
                />
              </Grid>
            </Grid>
            <Grid container item xs={6} gap={1}>
              <Grid item xs={12}>
                <Typography variant="body1" fontWeight={500}>
                  Establishment Number *
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  pattern="[0-9]*"
                  {...register("establishmentNumber", {
                    onChange: (e) => numbersOnly(e),
                    onPaste: (e) => numbersOnly(e),
                    require: true,
                  })}
                  disabled={loading}
                  error={errors.email ? true : false}
                  helperText={errors.email && "Enter a valid email address"}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container item spacing={4}>
            <Grid container item xs={6} gap={1}>
              <Grid item xs={12}>
                <Typography variant="body1" fontWeight={500}>
                  ID or Iqameh *
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  {...register("id_number", {
                    onChange: (e) =>
                      numbersOnly(e, {
                        type: "IDNo",
                        maxNumber: 10,
                        replaceWith: "",
                      }),
                    onPaste: (e) =>
                      numbersOnly(e, {
                        type: "IDNo",
                        maxNumber: 10,
                        replaceWith: "",
                      }),
                  })}
                  disabled={loading}
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={6}
              justifyContent={"space-between"}
              spacing={4}
            >
              {currService.options.map((el) => (
                <Grid
                  container
                  key={el.label.enLabel}
                  item
                  xs={12}
                  md={6}
                  xl={3}
                >
                  <TasksItem
                    key={el.id}
                    id={el.id}
                    status={!el.active}
                    label={lang === "en" ? el.label.enLabel : el.label.arLabel}
                    mission={false}
                    checkOptions={handelCheckValue}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              readOnly
              id="outlined-multiline-static"
              label="Answer"
              textAlign="right"
              value={answer}
              style={{ direction: "rtl" }}
              InputProps={{
                readOnly: true,
              }}
              disabled
              multiline
              rows={10}
              fullWidth
            />
          </Grid>
          <Grid container item spacing={4}>
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                variant="contained"
                color="error"
                style={{
                  width: "100%",
                  color: "white",
                }}
                href="/dash/services"
              >
                back
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                isLoading={loading}
                disableElevation
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default ServicesGetAnswer;
