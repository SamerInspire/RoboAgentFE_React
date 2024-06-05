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
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingButton from "components/buttons/LoadingButton";
import FormStyle from "styles/styles";
import { handleVerifyEmail } from "utils/api/auth/otp";

function EmailDialog({
  setOtpToken,
  setSnackbarData,
  handleNext,
  steps,
  getValues,
  handleClose,
  register,
}) {
  const {
    handleSubmit: emailHandleSubmit,
    formState: { errors: emailErrors },
    reset,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  return (
    <Dialog
      open={steps == 1}
      fullWidth={true}
      maxWidth={"sm"}
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
            <Button
              sx={{ height: "45px" }}
              fullWidth
              variant="contained"
              onClick={() => {
                handleClose();
                reset();
              }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <LoadingButton
              title="Send OTP"
              isLoading={isLoading}
              clickHandler={emailHandleSubmit(async () => {
                await handleVerifyEmail({
                  email: getValues("rest_email"),
                  handleNext,
                  setAlert: setSnackbarData,
                  setOtpToken,
                  setIsLoading,
                });
                setIsLoading(false);
              })}
            />
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default EmailDialog;
