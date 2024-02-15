import { Button, IconButton, InputAdornment } from "@material-ui/core";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import PhoneInput from "react-phone-number-input"
import 'react-phone-number-input/style.css';
import AxiosHit from "src/Core/API/AxiosHit";
import { useUpdateAlert } from "src/Core/Context/AlertContext";
import { useUpdateLoginInfo } from "src/Core/Context/LoginInfoContext";
import FormStyle from "src/Core/Styles/Styles";
import { HandelRegularHit } from "src/Core/Utils/HitHandiling";


const FormRegister = () => {
  const [passwordsInfo, setPasswordsInfo] = useState({
    togglePassword: false, valuePass: "", toggleconfPassword: false, valueConf: ""
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const setAlertInfo = useUpdateAlert()
  // const loginUpdate = useUpdateLoginInfo()

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  // submit
  const onSubmit = async (data) => {
    data["phoneNumber"] = phoneNumber
    let hitResult = await AxiosHit({
      method: "post", url: "users/signup", data: data
    })
    // hitResult = {...hitResult,redirectTo:"/"}
    HandelRegularHit({ hitResult: hitResult, setAlertInfo, values: data })
  };
  return (
    <FormStyle component="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Names box */}
      {/* <TextField
        variant="outlined"
        fullWidth
        type="text"
        label="user name"
        {...register("userName", {
          required: true
        })}
        error={errors.userName ? true : false}
        helperText={errors.userName && "Enter the UserName"}
      /> */}
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
          label="First Name"
          {...register("firstName", {
            required: true,
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: "invalid first name"
            }
          })}
          error={errors.firstName ? true : false}
          helperText={!!errors.firstName?.message ? errors.firstName?.message : errors.firstName && "Enter the first name"}
        />
        <TextField
          variant="outlined"
          fullWidth
          type="text"
          label="Middle  Name"
          {...register("middleName", {
            required: true,
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: "invalid middle name"
            }
          })}
          error={errors.middleName ? true : false}
          helperText={!!errors.middleName?.message ? errors.middleName?.message : errors.middleName && "Enter the middle name"}
        />
        <TextField
          variant="outlined"
          fullWidth
          type="text"
          label="Last Name"
          {...register("lastName", {
            required: true,
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: "invalid last name"
            }
          })}
          error={errors.lastName ? true : false}
          helperText={!!errors.lastName?.message ? errors.lastName?.message : errors.lastName && "Enter the last name"}
        />
      </Box>

      {/* email */}
      <TextField
        variant="outlined"
        fullWidth
        type="email"
        label="Email address"
        {...register("email", {
          required: true,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address"
          }
        })}
        error={errors.email ? true : false}
        helperText={errors.email && "Enter a valid email address"}
      />
      <PhoneInput
        // id="phoneNumber"
        // name="phoneNumber"
        international
        countryCallingCodeEditable={false}
        defaultCountry="SA"
        maxLength="16"
        onChange={(value) => { setPhoneNumber(!!value ? value?.replace(0, 10) : "") }}
      />
      <TextField
        variant="standard"
        type="hidden"
        hidden={true}
        value={phoneNumber}
        helperText={phoneNumber.length != 14 && "Enter a valid phone number"}
        error={phoneNumber.length != 14 ? true : false}
      />
      {/* password */}
      <TextField
        variant="outlined"
        fullWidth
        type={passwordsInfo.togglePassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={() => setPasswordsInfo({ ...passwordsInfo, togglePassword: !passwordsInfo.togglePassword })}>
                {passwordsInfo.togglePassword ? <RiEyeFill /> : <RiEyeOffFill />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        label="Password"
        {...register("password", {
          required: true,
          minLength: 5,
          maxLength: 15,
          onChange: (e) => setPasswordsInfo({ ...passwordsInfo, valuePass: e.target.value })
        })}
        error={errors.password ? true : false}
        helperText={
          errors.password && "Enter a valid password (5-15 characters)"
        }
      />
      <TextField
        variant="outlined"
        fullWidth
        onPaste={e => e.preventDefault()}
        type={passwordsInfo.toggleconfPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={() => setPasswordsInfo({ ...passwordsInfo, toggleconfPassword: !passwordsInfo.toggleconfPassword })}>
                {passwordsInfo.toggleconfPassword ? <RiEyeFill /> : <RiEyeOffFill />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        label="Confirm Password"
        {...register("confPassword", {
          required: true,
          onChange: (e) => setPasswordsInfo({ ...passwordsInfo, valueConf: e.target.value })
        })}
        error={errors.confPassword || passwordsInfo.valueConf !== passwordsInfo.valuePass}
        helperText={
          errors.confPassword ? "Please Confirm the password" : passwordsInfo.valueConf !== passwordsInfo.valuePass && "Passwords did not match"
        }
      />
      {/* submit */}
      <Button type="submit" variant="contained" disableElevation>
        Register
      </Button>
    </FormStyle>
  );
};

export default FormRegister;
