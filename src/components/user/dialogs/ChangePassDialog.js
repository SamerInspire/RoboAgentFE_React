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
import i18n from "dictonaries/i18n";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormStyle from "styles/styles";
import { handleChangePassword } from "utils/users/users";

function ChangePassDialog({
  changePass,
  setSnackbarData,
  email,
  setAlert,
  handleClose
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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Prevent the default form submission
      event.preventDefault();
      // Trigger the button click or form submission
      document.getElementById('changePassButton').click();
    }
  };

  return (
    <Dialog
      open={changePass}
      fullWidth={true}
      maxWidth={"sm"}
      onClose={() => {
        reset();
        setIsLoading(false);
      }}
      sx={{
        textAlign: "center",
        direction: i18n.language == "ar" ? "ltr" : "ltr",

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
        {/* current password input */}
        <FormStyle sx={{ width: "100%" }}>
          <TextField
            variant="outlined"
            fullWidth
            type={showPassword ? "text" : "password"}
            label={t("currentPasswordLabel")}
            onKeyDown={handleKeyDown}
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
            {...register("currentPassword", {
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
        {errors?.currentPassword?.message && (
          <Typography variant="body2" color={"#FF0000"} marginTop={2}>
            {errors?.currentPassword?.message}
          </Typography>
        )}
        <FormStyle sx={{ width: "100%" }}>
          <TextField
            variant="outlined"
            fullWidth
            type={showPassword ? "text" : "password"}
            label={t("newPasswordLabel")}
            onKeyDown={handleKeyDown}
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
            onKeyDown={handleKeyDown}
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
        {watch("password") == watch("currentPassword") &&
        getValues("password") ? (
          <Typography color={"#FF0000"} marginTop={2} variant="body2">
            {t("forgotPassword.New Password cannot be same as current password")}
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
              id="changePassButton"
              title={t("forgotPassword.Change Password")}
              isLoading={isLoading}
              clickHandler={handleSubmit(async (data) => {
                console.log('change password data ::',data);
                console.log('change password email',email);
                await handleChangePassword({
                    newPass: data.password,
                    currentPass: data.currentPassword,
                    confirmPass: data.restConfirmPass,
                    email: email,
                    setAlert,
                    setIsLoading,
                    handleClose
                })
                reset();
              })}
            />
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default ChangePassDialog;
