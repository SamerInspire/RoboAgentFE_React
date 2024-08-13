/* eslint-disable */
import { Grid, TextField, Typography } from '@mui/material';
import GetAnswerToolbar from 'components/services/GetAnswerToolbar';
import ServicesSidebar from 'components/services/ServicesSidebar';
import { AlertContext } from 'hooks/context/AlertContext';
import i18next from 'i18next';
import TasksItem from 'pages/dashboard/TasksItem';
import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { numbersOnly } from 'utils/DefualtValidators';
import { handleGetResponse } from 'utils/api/answer/service';
import { handleFetchCurrentUser } from 'utils/users/users';

const ServicesGetAnswer = ({}) => {
  let { servicename = 'General' } = useParams();
  const [answer, setAnswer] = useState('');
  const [currentUserData, setCurrentUserData] = useState({});
  const [estNumber,setEstNumber] = useState('');
  const [idNum,setIdNum] = useState('');
  const estNumberRequired = !idNum;
  const idNumRequired = !estNumber;
  const isEligiable = useRef(false);
  const { t } = useTranslation();
  const [Services] = useState(JSON.parse(localStorage.getItem('ServiceList')));
  const [currService, setCurrService] = useState(
    Services.filter((service) => service.service == servicename)[0] || Services[0],
  );
  const [loading, setLoading] = useState();
  const { setAlert, handleCloseAlert } = useContext(AlertContext);
  const lang = i18next.language;
  const navigate = useNavigate();
  const [options, setOptions] = useState({});

  // () => {
  //   const options = {};
  //   if (!!currService) {
  //     currService.serviceOptions.map((o) => {
  //       options[o['name']] = false;
  //       options[o['active']] = false;
  //       o['active'] = true;
  //     });
  //   }
  //   return options;
  // }
  useEffect(() => {
    const newOptions = {};
    currService.serviceOptions.forEach(option => {
        newOptions[option.name] = false;
        newOptions.active = false;
        option.active=true;
    });
    setOptions(newOptions);
    setLoading(false);
    setAnswer('');
    handleCloseAlert();
  }, [currService]);
  // form submit
  const handelCheckValue = (id, status) => {
    let optionsChange = options;
    options[id] = status;
    setOptions(optionsChange);
    console.log('options changed',options);
  };
  // hook form
  useEffect(() => {
    handleFetchCurrentUser({
      requestAction: 'SET_CURRENT_USER',
      setCurrentUserData,
      setAlert,
    });
  }, []);
  useEffect(() => {
    // if (servicename == 'General' || currentUserData.role == 'ADMIN') {
    isEligiable.current = true;
    // } else {
    //   if (currentUserData.roboAuthorities) {
    //     currentUserData.roboAuthorities.map((auth) => {
    //       allowedAuthorities = currService.allowedAuthorities.map(auths => auths.name)
    //       if (allowedAuthorities.includes(auth.name)) isEligiable.current = true;
    //     });
    //     if (!isEligiable.current) navigate('/dash/services');
    //   }
    // }
    return setAlert();
  }, [currentUserData]);
  function handleChangeCurrentService(serviceName, setCurrService) {
    navigate('/dash/services/getAnswer/' + serviceName, { replace: true });
    setCurrService(Services.filter((service) => service.service == serviceName)[0]);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      establishmentNumber: '',
      id_number: '',
      check_options: '',
    },
  });
  return (
    <Grid container item alignItems={'flex-start'} flexWrap={'nowrap'} gap={8}>
      <Grid container item sm={12} md={10} gap={4}>
        <Grid item xs={12}>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            {console.log('CurrService', currService)}
            {lang === 'en' ? currService.description : currService.descriptionAr}
          </Typography>
        </Grid>
        <form
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          onSubmit={handleSubmit(async (data) => {
            if (isEligiable.current) {
              setLoading(true);
              setAnswer('');
              setAlert({
                alertType: 'info',
                sleep: 5000000,
                alertMsg: 'Generating Answer',
              });
              await handleGetResponse({
                requestAction: 'SET_ANSWER',
                setAnswer,
                data,
                servicename: currService.service,
                options,
                setAlert,
              });

              setLoading(false);
            } else {
              setAlert({
                alertType: 'error',
                alertMsg: 'Sorry You Are not Eligiable to use this service',
              });
            }
          })}
        >
          <Grid container item position={'relative'} xs={12} gap={4}>
            <Grid container item spacing={4}>
              <Grid container item xs={12} gap={1}>
                <Grid item xs={12}>
                  <Typography variant="body2" fontWeight={500}>
                    {t('getAnswerForm.Reason')} *
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-multiline-static"
                    fullWidth
                    {...register('reason', {
                      required: true,
                      maxLength:30,
                      // onChange: (e) =>
                      //   numbersOnly(e, {
                      //     type: 'IDNo',
                      //     maxNumber: 30,
                      //     replaceWith: '',
                      //   }),
                      // onPaste: (e) =>
                      //   numbersOnly(e, {
                      //     type: 'IDNo',
                      //     maxNumber: 30,
                      //     replaceWith: '',
                      //   }),
                    })}
                    disabled={loading}
                    error={errors.reason ? true : false}
                    helperText={
                      errors.reason &&
                      t('getAnswerForm.reason required')
                    }
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={4}>
                <Grid container item xs={12} gap={1} md={6}>
                  <Grid item xs={12}>
                    <Typography variant="body2" fontWeight={500}>
                      {t('getAnswerForm.Establishment Number')} *
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="outlined-multiline-static"
                      pattern="/^\d{1,14}-?\d{0,14}$/"
                      {...register('establishmentNumber', {
                        onChange: (e) => {
                          numbersOnly(e,{maxNumber:14});
                          setEstNumber(e.target.value);
                          console.log(estNumber);
                        },
                        onPaste: (e) => {
                          numbersOnly(e,{maxNumber:14})
                          setEstNumber(e.target.value);
                        },
                        maxLength:14,
                        required: estNumberRequired,
                      })}
                      disabled={loading}
                      error={errors.establishmentNumber && errors.id_number? true : false}
                      // helperText={errors.email && 'Enter a valid email address'}
                      helperText={
                        (errors.establishmentNumber && errors.id_number) &&
                        t('getAnswerForm.establishmentNumber or IdNumber required')
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12} md={6} gap={1}>
                  <Grid item xs={12}>
                    <Typography variant="body2" fontWeight={500}>
                      {t('getAnswerForm.ID or Iqameh')} *
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      pattern="/^\d{10}$/"
                      id="outlined-multiline-static"
                      {...register('id_number', {
                        required: idNumRequired,
                        minLength:10,
                        maxLength:10,
                        onChange: (e) =>
                        {
                          numbersOnly(e, {
                            type: 'IDNo',
                            maxNumber: 10,
                            replaceWith: '',
                          });
                          setIdNum(e.target.value);
                        }
                          ,
                        onPaste: (e) =>
                        {
                          numbersOnly(e, {
                            type: 'IDNo',
                            maxNumber: 10,
                            replaceWith: '',
                          });
                          setIdNum(e.target.value);
                        }
                      })}
                      disabled={loading}
                      error={ errors.id_number && errors.establishmentNumber ? true : false}
                      helperText={
                        (errors.establishmentNumber && errors.id_number) &&
                        t('getAnswerForm.establishmentNumber or IdNumber required')
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item>
              <Grid container gap={4} item xs={12}>
                {currService.serviceOptions.map((el) => (
                  <Grid key={el.enDescription} item>
                    <TasksItem
                      key={el.optionId}
                      id={el.name}
                      status={false}
                      label={lang === 'en' ? el.enDescription : el.arDescription}
                      mission={false}
                      checkOptions={handelCheckValue}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                readOnly
                id="outlined-multiline-static"
                label={t('getAnswerForm.answer')}
                value={answer}
                style={{ direction: 'rtl' }}
                InputProps={{
                  readOnly: true,
                  style: { fontSize: '20px' },
                }}
                disabled
                multiline
                rows={10}
                fullWidth
              />
            </Grid>
            <GetAnswerToolbar
              searchLabel={t('getAnswerForm.searchButton')}
              backLabel={t('getAnswerForm.backButton')}
              loading={loading}
            />
          </Grid>
        </form>
      </Grid>
      <ServicesSidebar
        currService={currService}
        currentUserData={currentUserData}
        handleChangeCurrentService={handleChangeCurrentService}
        setCurrService={setCurrService}
      />
    </Grid>
  );
};

export default ServicesGetAnswer;
