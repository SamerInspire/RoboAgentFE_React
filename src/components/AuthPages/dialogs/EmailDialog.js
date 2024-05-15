import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import FormStyle from "src/styles/styles";
import { handleVerifyEmail } from "src/utils/api/auth/otp";

function EmailDialog({
  register,
  setOtpToken,
  setSnackbarData,
  handleNext,
  steps,
  getValues,
  handleClose,
}) {
  const {
    handleSubmit: emailHandleSubmit,
    register: restEmailRegister,
    formState: { errors: emailErrors },
  } = useForm();
  return (
    <Dialog
      open={steps == 1}
      sx={{
        textAlign: "center",
        "& .MuiPaper-root": {
          padding: 1.5,
        },
      }}
    >
      <DialogTitle>
        <Typography fontSize={20} fontWeight={"bold"}>
          Reset a Password
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ paddingX: 1, paddingY: 0 }}>
        <DialogContentText fontWeight={"bold"}>
          Please enter your email that you wish to change a password for
        </DialogContentText>
        <FormStyle sx={{ width: "100%" }}>
          <TextField
            fullWidth
            {...register("rest_email", { required: "Email is Required" })}
            label={"Email"}
          />
        </FormStyle>
        {emailErrors?.email?.message && (
          <Typography color={"red"} marginTop={2}>
            {emailErrors?.email?.message}
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ paddingTop: 4 }}>
        <Grid container item spacing={4}>
          <Grid item xs={12} md={6}>
            <Button fullWidth variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="contained"
              onClick={emailHandleSubmit((data) =>
                handleVerifyEmail({
                  email: getValues("rest_email"),
                  handleNext,
                  setAlertInfo: setSnackbarData,
                  setOtpToken,
                })
              )}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default EmailDialog;
