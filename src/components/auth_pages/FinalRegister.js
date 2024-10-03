/* eslint-disable no-unused-vars */
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import 'react-phone-number-input/style.css';
import { AlertContext } from 'hooks/context/AlertContext';
import { handleFetchAuthorities, handleFetchServiceList,handleFetchAllUsers, handleFetchCurrentUser } from 'utils/users/users';
import i18next from 'i18next';
export async function handleFinalRegistration(userRole, userTeam, userServices, userMainService, userId) {
  try {
    const rolePromise = axios.post(`/api/user-roles/${userId}/roles/${userRole}`);
    const mainServicePromise = axios.post(`/service/${userId}/service/${userMainService}`);
    const servicePromise = axios.post(`/api/user-auth`, userServices);
    const teamPromise = axios.post(`/userTeam/${userId}/${userTeam}`);
    Promise.all([rolePromise, mainServicePromise, servicePromise, teamPromise]).then((values) => {
      console.log(values);
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

const FinalRegister = ({selectedAuthorities, setSelectedAuthorities,selectedService, setSelectedService, register,handleBack, handleNext }) => {
  const [currentUserData, setCurrentUserData] = useState({});
  const [serviceList, setServiceList] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const [teams, setTeams]=useState(JSON.parse(localStorage.getItem('Teams')) ? JSON.parse(localStorage.getItem('Teams')) : [] );
  const [userRoles,setUserRoles]= useState(JSON.parse(localStorage.getItem('Roles')) ? JSON.parse(localStorage.getItem('Roles')) : []);
  const [selectedTeam, setSelectedTeam] = useState(teams.filter((t)=> t.team=='L2')[0]);
  const [selectedRole, setSelectedRole] = useState(userRoles.filter((r)=> r.role=='MEMBER')[0]);
  const { t } = useTranslation();
  const { setAlert } = useContext(AlertContext);
  const {
    handleSubmit,
    reset: clearFinalForm,
    formState: { errors },
  } = useForm({});
  const lang = i18next.language;

  useEffect(() => {
    handleFetchAuthorities({
      setAuthorities,
      // setTeams,
      // setUserRoles,
      requestAction: 'GET_ALL_AUTHORITIES',
      setIsLoading: () => {},
      setAlert,
    });
    handleFetchServiceList({
      setServiceList,
      requestAction: 'SET_SERVICE_LIST',
      setIsLoading: () => {},
      setAlert,
    });
    handleFetchCurrentUser({
      requestAction: 'SET_CURRENT_USER',
      setCurrentUserData,
      setAlert,
    });
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const values = typeof value === 'string' ? value.split(',') : value;
    const authArr = [];
    values.map((value) => {
      const newObj = { authId: value };
      authArr.push(newObj);
    });
    setSelectedAuthorities(authArr);
  };
  return (
    <form
      noValidate
      onSubmit={handleSubmit(() => {
        handleNext(
          {
            role: selectedRole,
            team: selectedTeam,
            roboAuthorities: selectedAuthorities,
            service: selectedService,
          },
          clearFinalForm,
        )
      }
      )}
    >
      <Grid container item gap={4}>
        <Grid container item>
          <Grid container item gap={4} xs={12} md={6} justifyContent={'center'}>
            <Grid item xs={12} textAlign={'center'}>
              <Typography variant="h5">{t('register.Choose user role')} </Typography>
            </Grid>
            {userRoles.map((role) => (
              <Grid item xs={12} md={4} key={role.id}>
                <Button
                  fullWidth
                  variant={role.id == selectedRole.id ? 'contained' : 'outlined'}
                  onClick={() => setSelectedRole(role.role)}
                >
                  {lang == 'en' ? role.descriptionEn : role.descriptionAr}
                </Button>
              </Grid>
            ))}
          </Grid>
          <Grid container item xs={12} md={6} gap={4} justifyContent={'center'}>
            <Grid item xs={12} textAlign={'center'}>
              <Typography variant="h5">{t('register.Choose user team')} </Typography>
            </Grid>
            {teams.map((team) => (
              <Grid item xs={12} md={3} key={team}>
                <Button
                  fullWidth
                  variant={team.id == selectedTeam.id ? 'contained' : 'outlined'}
                  onClick={(e) => setSelectedTeam(team)}
                >
                  {lang == 'en' ? team.descriptionEn : team.descriptionAr}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid container item gap={4} justifyContent={'center'}>
          <Grid container item spacing={8}>
            <Grid container item xs={12} md={6} gap={4}>
              <Grid item xs={12} textAlign={'center'}>
                <Typography variant="h5">{t('register.Choose User Services')}</Typography>
              </Grid>
              <FormControl fullWidth>
                <InputLabel>{t('register.Services')}</InputLabel>
                <Select
                  value={selectedAuthorities.map((e) => e.authId)}
                  label={t('register.Services')}
                  multiple
                  onChange={handleChange}
                >
                  {console.log('authorities',currentUserData)}
                  {authorities.map((auth) => (
                    <MenuItem key={auth.authId} value={auth.authId}>
                      {/* {auth.description} */}
                      {lang == 'en' ? auth.descriptionEn : auth.descriptionAr}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid container item xs={12} md={6} gap={4}>
              <Grid item xs={12} textAlign={'center'}>
                <Typography variant="h5">{t('register.Choose User Main Service')}</Typography>
              </Grid>
              <FormControl fullWidth>
                <InputLabel>{t('register.Service')}</InputLabel>
                <Select
                  value={selectedService?.id}
                  label={t('register.Service')}
                  onChange={(e) => setSelectedService(serviceList.filter((s)=> s.id == e.target.value )[0] )}
                >
                  {serviceList.map((service) => (
                    <MenuItem key={service.service} value={service.id}>
                      {/* {service.description} */}
                      {lang == 'en' ? service.descriptionEn : service.descriptionAr}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12} justifyContent={'flex-end'} spacing={4}>
          <Grid item xs={12} md={6}>
            <Button fullWidth variant="outlined" sx={{ p: 2 }} onClick={handleBack} aria-label="back">
              {t('backButton')}
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button fullWidth type="submit" variant="contained" sx={{ p: 2 }} aria-label="register" disableElevation>
              {t('register.registerButton')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default FinalRegister;
