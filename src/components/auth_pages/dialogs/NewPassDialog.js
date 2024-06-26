/* eslint-disable no-unused-vars */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "components/buttons/LoadingButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormStyle from "styles/styles";
import { handleRestPassword } from "utils/api/auth/otp";

function NewPassDialog({
  handleNext,
  steps,
  setSnackbarData,
  setAlert,
  handleClose,
  otpToken,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Dialog
      open={steps === 3}
      fullWidth={true}
      maxWidth={"sm"}
      onClose={() => {
        reset();
        setIsLoading(false);
      }}
      sx={{
        textAlign: "center",
        "& .MuiPaper-root": {
          padding: 1.5,
        },
      }}
    >
      <DialogTitle>
        <Typography fontSize={20} fontWeight={"bold"}>
          {t("forgotPassword.Change Your Password")}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ paddingX: 1, paddingY: 0 }}>
        <DialogContentText fontWeight={"bold"}>
          {t(
            "forgotPassword.Enter a new password below to change your password"
          )}
        </DialogContentText>
        <FormStyle sx={{ width: "100%" }}>
          <TextField
            variant="outlined"
            fullWidth
            type={showPassword ? "text" : "password"}
            label={t("passwordLabel")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            // error={errors.email ? true : false}
            // helperText={errors.email && "Enter a valid email address"}
            {...register("password", {
              required: true,
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d).+$/,
                message: t(
                  "forgotPassword.Password must contain at least one capital letter one small and one number"
                ),
              },
              // minLength: {
              //   value: 8,
              //   message: "Password must be at least 8 characters",
              // },
            })}
          />
        </FormStyle>
        {errors?.password?.message && (
          <Typography variant="body2" color={"#FF0000"} marginTop={2}>
            {errors?.password?.message}
          </Typography>
        )}
        <FormStyle sx={{ width: "100%" }}>
          <TextField
            variant="outlined"
            fullWidth
            // disabled={errors.password ? true : false}
            type={showConfirmPassword ? "text" : "password"}
            label={t("forgotPassword.Confirm Password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            // error={errors.email ? true : false}
            // helperText={errors.email && "Enter a valid email address"}
            {...register("restConfirmPass", { required: true })}
          />
        </FormStyle>
        {errors?.otp?.message && (
          <Typography variant="body2" color={"#FF0000"} marginTop={2}>
            {errors?.otp?.message}
          </Typography>
        )}
        {watch("restConfirmPass") !== watch("password") &&
        getValues("restConfirmPass") ? (
          <Typography color={"#FF0000"} marginTop={2} variant="body2">
            {t("forgotPassword.Passwords do not match")}
          </Typography>
        ) : null}
      </DialogContent>
      <DialogActions sx={{ paddingTop: 4 }}>
        <Grid container item spacing={4}>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                handleClose();
                reset();
              }}
            >
              {t("forgotPassword.Cancel")}
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <LoadingButton
              title={t("forgotPassword.Change Password")}
              isLoading={isLoading}
              clickHandler={handleSubmit(async (data) => {
                await handleRestPassword({
                  newPass: data.password,
                  handleNext,
                  setAlert,
                  otpToken,
                  setIsLoading,
                  handleClose,
                });
                reset();
              })}
            />
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default NewPassDialog;
