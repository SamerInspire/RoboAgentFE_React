/* eslint-disable no-unused-vars */
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
} from '@mui/material';
import LoadingButton from 'components/buttons/LoadingButton';
import i18n from 'dictonaries/i18n';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormStyle from 'styles/styles';
import { handleVerifyEmail, handleVerifyOTP } from 'utils/api/auth/otp';
function OTPDialog({ otpToken, email, steps, handleNext, setSnackbarData, setOtpToken, handleClose }) {
  const {
    register: otpRegister,
    handleSubmit: otpHandleSubmit,
    formState: { errors },
  } = useForm();
  const [counter, setCounter] = useState(60);
  // const Ref = useRef(null);
  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog
      open={steps === 2}
      fullWidth={true}
      maxWidth={'sm'}
      sx={{
        textAlign: 'center',
        direction: i18n.language == 'ar' ? 'ltr' : 'ltr',

        '& .MuiPaper-root': {
          padding: 1.5,
        },
      }}
    >
      <FormStyle
        onSubmit={otpHandleSubmit(async (data, e) => {
          e.preventDefault();
          await handleVerifyOTP({
            otp: data.otp,
            token: otpToken,
            handleNext,
            setAlert: setSnackbarData,
            setIsLoading,
          });
        })}
        sx={{ width: '100%' }}
      >
        <DialogTitle>
          <Typography fontSize={20} fontWeight={'bold'}>
            {t('forgotPassword.OTP Verification')}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ paddingX: 1, paddingY: 0 }}>
          <DialogContentText fontWeight={'bold'} marginBottom={4}>
            {t('forgotPassword.Please enter OTP sent to your email')}
          </DialogContentText>
          <TextField
            fullWidth
            sx={{
              '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                display: 'none',
              },
              '& input[type=number]': {
                MozAppearance: 'textfield',
              },
            }}
            type="number"
            label={t('forgotPassword.OTP')}
            {...otpRegister('otp', {
              required: t('forgotPassword.OTP is Required'),
              maxLength: 4,
            })}
            error={errors.OTP ? true : false}
            helperText={errors?.OTP?.message}
          />

          <Box marginTop={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Typography variant="subtitle1">{t("forgotPassword.Haven't recieved the OTP ?")}</Typography>
            {!counter ? (
              <Button
                disabled={isLoading ? true : false}
                onClick={async () => {
                  await handleVerifyEmail({
                    email: email,
                    handleNext: () => {},
                    setAlert: setSnackbarData,
                    setOtpToken,
                    setIsLoading,
                  });
                  setIsLoading(false);
                  setCounter(60);
                }}
                style={{ color: '#2e7d32', mx: 4 }}
              >
                {t('forgotPassword.Resend')}
              </Button>
            ) : (
              <Typography variant="body2" fontSize={14} fontWeight={'bold'} marginLeft={1}>
                {counter}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ paddingTop: 4 }}>
          <Grid container item spacing={4}>
            <Grid item xs={12} md={6}>
              <Button fullWidth aria-label="cancel" variant="contained" onClick={handleClose}>
                {t('forgotPassword.Cancel')}
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <LoadingButton setIsLoading={setIsLoading} isLoading={isLoading} title={t('forgotPassword.Verify')} />
            </Grid>
          </Grid>
        </DialogActions>
      </FormStyle>
    </Dialog>
  );
}

export default OTPDialog;
