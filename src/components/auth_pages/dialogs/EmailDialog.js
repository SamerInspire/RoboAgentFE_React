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
} from '@mui/material';
import LoadingButton from 'components/buttons/LoadingButton';
import i18n from 'dictonaries/i18n';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormStyle from 'styles/styles';
import { handleVerifyEmail } from 'utils/api/auth/otp';

function EmailDialog({ setOtpToken, setSnackbarData, handleNext, steps, handleClose, setRestEmail }) {
  const {
    handleSubmit: emailHandleSubmit,
    reset,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog
      open={steps == 1}
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
        onSubmit={emailHandleSubmit(async (data, e) => {
          e.preventDefault();
          await handleVerifyEmail({
            email: getValues('rest_email'),
            handleNext,
            setAlert: setSnackbarData,
            setOtpToken,
            setIsLoading,
          });
          setRestEmail(getValues('rest_email'));
          setIsLoading(false);
        })}
      >
        <DialogTitle>
          <Typography fontSize={20} fontWeight={'bold'}>
            {t('forgotPassword.Reset a Password')}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ paddingX: 1, paddingY: 0 }}>
          <DialogContentText fontWeight={'bold'} marginBottom={4}>
            {t('forgotPassword.Please enter your email that you wish to change a password for')}
          </DialogContentText>

          <TextField
            fullWidth
            {...register('rest_email', {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: t('register.invalidEmail'),
              },
            })}
            helperText={errors?.rest_email?.message}
            error={errors.rest_email ? true : false}
            label={t('emailLabel')}
          />
        </DialogContent>
        <DialogActions sx={{ paddingTop: 4 }}>
          <Grid container item spacing={4}>
            <Grid item xs={12} md={6}>
              <Button
                sx={{ height: '45px' }}
                fullWidth
                variant="contained"
                onClick={() => {
                  handleClose();
                  reset();
                }}
              >
                {t('forgotPassword.Cancel')}
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <LoadingButton title={t('forgotPassword.Send OTP')} isLoading={isLoading} clickHandler={() => {}} />
            </Grid>
          </Grid>
        </DialogActions>
      </FormStyle>
    </Dialog>
  );
}

export default EmailDialog;
