import { Button, IconButton, InputAdornment } from "@mui/material";
import { Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useUpdateAlert } from "src/hooks/Context/AlertContext";
import FormStyle from "src/styles/styles";

const FormRegister = ({
  handleNext,
  setRegisteredId,
  setUserData,
  userData,
  register,
  errors,
  handleSubmit,
}) => {
  const [passwordsInfo, setPasswordsInfo] = useState({
    togglePassword: false,
    valuePass: "",
    toggleconfPassword: false,
    valueConf: "",
  });

  const setAlertInfo = useUpdateAlert();
  const { t } = useTranslation();
  // submit

  return (
    <FormStyle
      component="form"
      onSubmit={handleSubmit((data) => handleNext(data))}
    >
      <Box
        sx={{
          display: "grid",
          gap: { xs: 3, sm: 1 },
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          type="text"
          label={t("firstnameLabel")}
          {...register("firstName", {
            required: true,
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: t("register.invalid first name"),
            },
          })}
          error={errors.firstName ? true : false}
          helperText={
            !!errors.firstName?.message
              ? errors.firstName?.message
              : errors.firstName && t("register.Enter the first name")
          }
        />
        <TextField
          variant="outlined"
          fullWidth
          type="text"
          label={t("middlenameLabel")}
          {...register("middleName", {
            required: true,
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: t("register.invalid middle name"),
            },
          })}
          error={errors.middleName ? true : false}
          helperText={
            !!errors.middleName?.message
              ? errors.middleName?.message
              : errors.middleName && t("register.Enter the middle name")
          }
        />
        <TextField
          variant="outlined"
          fullWidth
          type="text"
          label={t("lastnameLabel")}
          {...register("lastName", {
            required: true,
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: t("register.invalid last name"),
            },
          })}
          error={errors.lastName ? true : false}
          helperText={
            !!errors.lastName?.message
              ? errors.lastName?.message
              : errors.lastName && t("register.Enter the last name")
          }
        />
      </Box>

      {/* email */}
      <TextField
        variant="outlined"
        fullWidth
        type="email"
        label={t("emailLabel")}
        {...register("email", {
          required: true,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: t("register.invalid email address"),
          },
        })}
        error={errors.email ? true : false}
        helperText={errors.email && t("register.Enter a valid email address")}
      />
      <PhoneInput
        // id="phoneNumber"
        // name="phoneNumber"
        international
        countryCallingCodeEditable={false}
        defaultCountry="SA"
        keyboardType="phone-pad"
        maxLength="16"
        value={userData?.phoneNumber}
        onChange={(value) => {
          console.log("value ===> ",value)
          value = !!value ? value?.substring(0, 13) : "" 
          setUserData((prev) => ({ ...prev, phoneNumber: value}));
        }}
      />
      <TextField
        variant="standard"
        type="hidden"
        hidden={true}
        value={userData?.phoneNumber}
        {...register("phone_Number", {
          pattern: {
            value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
            message: t("register.Enter A valid Phone number"),
          },
        })}
        helperText={
          errors.phoneNumber && t("register.Enter a valid phone number")
        }
      // error={phoneNumber.length != 14 ? true : false}
      />
      {/* password */}
      <TextField
        variant="outlined"
        fullWidth
        type={passwordsInfo.togglePassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() =>
                  setPasswordsInfo({
                    ...passwordsInfo,
                    togglePassword: !passwordsInfo.togglePassword,
                  })
                }
              >
                {passwordsInfo.togglePassword ? (
                  <RiEyeFill />
                ) : (
                  <RiEyeOffFill />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        label={t("passwordLabel")}
        {...register("password", {
          required: true,
          minLength: 5,
          maxLength: 15,
          onChange: (e) =>
            setPasswordsInfo({ ...passwordsInfo, valuePass: e.target.value }),
        })}
        error={errors.password ? true : false}
        helperText={
          errors.password &&
          t("register.Enter a valid password (5-15 characters)")
        }
      />
      <TextField
        variant="outlined"
        fullWidth
        onPaste={(e) => e.preventDefault()}
        type={passwordsInfo.toggleconfPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() =>
                  setPasswordsInfo({
                    ...passwordsInfo,
                    toggleconfPassword: !passwordsInfo.toggleconfPassword,
                  })
                }
              >
                {passwordsInfo.toggleconfPassword ? (
                  <RiEyeFill />
                ) : (
                  <RiEyeOffFill />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        label={t("confirmPasswordLabel")}
        {...register("confPassword", {
          required: true,
          onChange: (e) =>
            setPasswordsInfo({ ...passwordsInfo, valueConf: e.target.value }),
        })}
        error={
          errors.confPassword ||
          passwordsInfo.valueConf !== passwordsInfo.valuePass
        }
        helperText={
          errors.confPassword
            ? t("register.Please Confirm the password")
            : passwordsInfo.valueConf !== passwordsInfo.valuePass &&
            t("register.Passwords did not match")
        }
      />
      {/* submit */}
      <Grid container item xs={12} justifyContent={"flex-end"}>
        <Button fullWidth type="submit" variant="contained" disableElevation>
          {t("nextButton")}
        </Button>
      </Grid>
    </FormStyle>
  );
};

export default FormRegister;
