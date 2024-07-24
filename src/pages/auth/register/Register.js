/* eslint-disable no-unused-vars */
import { Container, Link, Typography, styled } from '@mui/material';
import { Box } from '@mui/system';
import FormRegister from 'components/auth_pages/FormRegister';
import LeftPanel from 'components/auth_pages/LeftPanel';
import { Helmet } from 'react-helmet';

// img
import RegisterPhoto from 'assets/images/auth/register.png';
import FinalRegister from 'components/auth_pages/FinalRegister';
import CustomStepper from 'components/auth_pages/stepper/CustomStepper';
import { AlertContext } from 'hooks/context/AlertContext';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { handleSubmitNewUser } from 'utils/users/users';

// styles
const ContainerBoxStyle = styled(Box)(({ theme }) => ({
  minHeight: `calc(100vh - 150px)`,
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: `350px 1fr`,

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: `1fr`,
  },
}));

const RightPanelStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  '& .account_switch': {
    textAlign: 'right',
    paddingRight: theme.spacing(3),
    marginBottom: theme.spacing(7),
    '& .MuiLink-underlineNone	': {
      color: theme.palette.green.darker,
      fontWeight: 500,
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(2),
    },
  },

  '& .form_Container': {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    '& .MuiTypography-h4': {
      fontSize: 25,
      fontWeight: 500,
    },
    '& .MuiTypography-paragraph': {
      margin: '8px 0 20px 0',
    },
  },

  '& .terms': {
    display: 'block',
    marginTop: '24px !important',
    fontSize: 12,
    textAlign: 'justify',

    '& a': {
      textDecorationColor: theme.palette.success.light,
      '&:hover': {
        textDecorationColor: theme.palette.common.black,
      },
    },
  },
}));
const Register = () => {
  const preventDefault = (e) => e.preventDefault();
  const [activeStep, setActiveStep] = useState(0);
  const [registeredId, setRegisteredId] = useState(null);
  const [userData, setUserData] = useState({});
  // const [isLoading, setIsLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const { t } = useTranslation();
  // const myref = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      userRole: 'MEMBER',
      userTeam: 'L2',
    },
  });
  const handleNext = async (data, clearFinalForm) => {
    if (activeStep == 0) {
      setUserData((prev) => ({ ...prev, ...data }));
      setActiveStep((prev) => prev + 1);
    } else {
      setAlert({
        alertType: 'info',
        alertMsg: t('register.Registering User'),
        sleep: 99999,
      });
      await handleSubmitNewUser(
        { ...userData, ...data },
        {
          setRegisteredId,
          setAlert,
          requestAction: 'REGISTER_NEW_USER',
          reset,
          clearFinalForm,
        },
      );
    }
  };
  const handleBack = () => setActiveStep((prev) => prev - 1);
  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>Register | RoboAgent</title>
      </Helmet>

      <ContainerBoxStyle>
        <LeftPanel title={t('register.User registration')} img={RegisterPhoto} imgAlt="Register Image" />

        <RightPanelStyle>
          <CustomStepper activeStep={activeStep} />
          <Container className="form_Container" maxWidth="md">
            {/* The Actual Form 👇 */}

            {activeStep == 0 && (
              <FormRegister
                register={register}
                handleNext={handleNext}
                setUserData={setUserData}
                userData={userData}
                handleSubmit={handleSubmit}
                errors={errors}
              />
            )}
            {activeStep == 1 && <FinalRegister handleBack={handleBack} handleNext={handleNext} />}
            {/* Terms */}
            <Typography paragraph color="textSecondary" className="terms">
              {t('register.By registering, I agree to RoboAgent')}{' '}
              <Link href="#" onClick={preventDefault} underline="always" color="textPrimary">
                {t('register.Terms of Service')}
              </Link>{' '}
              {t('register.and')}{' '}
              <Link href="#" onClick={preventDefault} underline="always" color="textPrimary">
                {t('register.Privacy Policy')}
              </Link>
              .
            </Typography>
          </Container>
        </RightPanelStyle>
      </ContainerBoxStyle>
    </>
  );
};

export default Register;
