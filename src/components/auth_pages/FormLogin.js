import { Checkbox, FormControlLabel, IconButton, InputAdornment, Link, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { AlertContext } from 'hooks/context/AlertContext';
import { LoginContext } from 'hooks/context/LoginInfoContext';
import { t } from 'i18next';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import FormStyle from 'styles/styles';
import LoadingButton from '../buttons/LoadingButton';
import CustomToast from '../toast/CustomToast';
import EmailDialog from './dialogs/EmailDialog';
import NewPassDialog from './dialogs/NewPassDialog';
import OTPDialog from './dialogs/OTPDialog';
const FormLogin = () => {
  const [showPassword, setShowPassord] = useState(false);
  const [remember, setRemember] = useState(true);
  const [steps, setSteps] = useState(0);
  const [snackbarData, setSnackbarData] = useState({
    alertType: '',
    alertMsg: '',
    open: false,
  });
  const { login } = useContext(LoginContext);
  const handleTogglePassword = () => setShowPassord(!showPassword);
  const handleToggleRemember = () => setRemember(!remember);
  const { setAlert } = useContext(AlertContext);
  const [otpToken, setOtpToken] = useState('');
  const [restEmail, setRestEmail] = useState('');
  const handleNext = () => {
    setSteps((prev) => prev + 1);
  };
  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberUser: true,
    },
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarData((prev) => ({ ...prev, open: false }));
  };
  const handleCloseDialogs = () => setSteps(0);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {steps == 1 && (
        <EmailDialog
          handleNext={handleNext}
          steps={steps}
          setRestEmail={setRestEmail}
          setSnackbarData={setSnackbarData}
          setOtpToken={setOtpToken}
          handleClose={handleCloseDialogs}
          setAlert={setAlert}
        />
      )}
      {steps === 2 && (
        <OTPDialog
          handleNext={handleNext}
          setSnackbarData={setSnackbarData}
          email={restEmail}
          steps={steps}
          errors={errors}
          otpToken={otpToken}
          setAlert={setAlert}
          setOtpToken={setOtpToken}
          handleClose={handleCloseDialogs}
        />
      )}
      {steps == 3 && (
        <NewPassDialog
          setSnackbarData={setSnackbarData}
          setAlert={setAlert}
          email={restEmail}
          handleNext={handleNext}
          steps={steps}
          otpToken={otpToken}
          handleClose={handleCloseDialogs}
        />
      )}
      <FormStyle
        noValidate
        component="form"
        onSubmit={handleSubmit((loginData) => login(loginData, setAlert, setIsLoading))}
      >
        {/* Email */}
        <TextField
          variant="outlined"
          fullWidth
          type="email"
          label={t('emailLabel')}
          error={errors.email ? true : false}
          helperText={errors.email && t('Enter a valid email address')}
          {...register('email', { required: true })}
        />

        {/* Password */}
        <TextField
          variant="outlined"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={handleTogglePassword}>
                  {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          label={t('passwordLabel')}
          error={errors.password ? true : false}
          helperText={errors.password && t('login_page.Enter a valid password (6-15 characters)')}
          {...register('password', {
            required: true,
            minLength: 6,
            maxLength: 16,
          })}
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Checkbox */}
          <FormControlLabel
            control={<Checkbox className="ckbox" checked={remember} onChange={handleToggleRemember} />}
            label={t('Remember me')}
            {...register('rememberUser')}
          />

          <Link onClick={() => setSteps(1)} href="#" underline="always">
            {t('Forgot password?')}
          </Link>
        </Box>

        <LoadingButton setIsLoading={setIsLoading} isLoading={isLoading} title={t('Login')} clickHandler={() => {}} />
      </FormStyle>
      {snackbarData.open && <CustomToast snackbarData={snackbarData} handleClose={handleClose} />}
    </>
  );
};

export default FormLogin;
