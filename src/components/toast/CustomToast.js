import { Alert, Snackbar } from "@mui/material";

function CustomToast({ snackbarData, handleClose }) {
  console.log(snackbarData);
  return (
    <Snackbar
      open={snackbarData.open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={snackbarData.alertType}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbarData.alertMsg}
      </Alert>
    </Snackbar>
  );
}

export default CustomToast;
