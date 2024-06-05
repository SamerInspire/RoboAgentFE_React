import { CircularProgress } from "@mui/material";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { useContext } from "react";
import { AlertContext } from "hooks/context/AlertContext";

export default function ShowAlert() {
  const { handleCloseAlert, alertInfo, openFailerAlert } =
    useContext(AlertContext);
  console.log(openFailerAlert);

  if (!alertInfo) return null;
  return (
    <Collapse in={openFailerAlert} sx={{ mb: 2 }}>
      <Alert
        variant="filled"
        onClose={handleCloseAlert}
        icon={
          alertInfo.alertType === "info" ? (
            <CircularProgress size={28} color="inherit" />
          ) : null
        }
        severity={alertInfo.alertType}
      >
        {alertInfo.alertMsg}
      </Alert>
    </Collapse>
  );
}
