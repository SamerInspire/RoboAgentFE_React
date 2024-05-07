import {
  Box,
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
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateAlert } from "src/hooks/Context/AlertContext";
import { LoginContext } from "src/hooks/Context/LoginInfoContext";
import FormStyle from "src/styles/styles";
import { handleVerifyEmail, handleVerifyOTP } from "src/utils/api/auth/otp";
function OTPDialog({
  otpToken,
  email,
  steps,
  handleNext,
  setSnackbarData,
  setOtpToken,
  handleClose,
}) {
  const {
    register: otpRegister,
    handleSubmit: otpHandleSubmit,
    formState: { errors: otpErrors },
    setError,
  } = useForm();
  const [counter, setCounter] = useState(60);
  const Ref = useRef(null);
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  const setAlertInfo = useUpdateAlert();
  return (
    <Dialog
      open={steps === 2}
      sx={{
        textAlign: "center",
        "& .MuiPaper-root": {
          padding: 1.5,
        },
      }}
    >
      <DialogTitle>
        <Typography fontSize={20} fontWeight={"bold"}>
          OTP Verification
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ paddingX: 1, paddingY: 0 }}>
        <DialogContentText fontWeight={"bold"}>
          Please enter OTP sent to your email
        </DialogContentText>
        <FormStyle sx={{ width: "100%" }}>
          <TextField
            fullWidth
            {...otpRegister("otp", { required: "OTP is Required" })}
          />
        </FormStyle>
        {otpErrors?.otp?.message && (
          <Typography color={"#FF0000"} marginTop={2}>
            {otpErrors?.otp?.message}
          </Typography>
        )}
        <Box
          marginTop={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="subtitle1">
            Haven't recieved the OTP ?
          </Typography>
          {!counter ? (
            <Button
              onClick={() => {
                handleVerifyEmail({
                  email: email,
                  handleNext: () => {},
                  setAlertInfo: setSnackbarData,
                  setOtpToken,
                });
                setCounter(60);
              }}
              style={{ color: "#2e7d32", mx: 4 }}
            >
              Resend
            </Button>
          ) : (
            <Typography
              variant="body2"
              fontSize={14}
              fontWeight={"bold"}
              marginLeft={1}
            >
              {counter}
            </Typography>
          )}
        </Box>
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
              onClick={otpHandleSubmit((data) =>
                handleVerifyOTP({
                  otp: data.otp,
                  token: otpToken,
                  handleNext,
                  setAlertInfo,
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

export default OTPDialog;
