import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { useAlert, useUpdateAlert } from "../hooks/Context/AlertContext";
import { CircularProgress } from "@mui/material";
export default function ShowAlert() {
  const [openFailerAlert, setOpenFailerAlert] = useState(false);
  const setAlertInfo = useUpdateAlert();
  const alertInfo = useAlert();

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  useEffect(() => {
    (async () => {
      if (!!alertInfo) {
        setOpenFailerAlert(true);
        window.scroll(0, 0);
        console.log(alertInfo);
        await sleep(alertInfo.sleep || 5000);
        setOpenFailerAlert(false);
        setAlertInfo(null);
        if (!!alertInfo.redirectTo) {
          console.log("redirect ??");
          window.location.href = alertInfo.redirectTo;
        }
      } else {
        setOpenFailerAlert(false);
      }
    })();
  }, [alertInfo, setAlertInfo]);
  if (!!alertInfo) {
    return (
      <Collapse in={openFailerAlert} sx={{ mb: 2 }}>
        <Alert
          variant="filled"
          icon={
            alertInfo.alertType == "info" ? (
              <CircularProgress size={28} color="inherit" />
            ) : (
              ""
            )
          }
          severity={alertInfo.alertType}
        >
          {alertInfo.alertMsg}
        </Alert>
      </Collapse>
    );
  } else {
    return "";
  }
}
