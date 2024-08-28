/* eslint-disable */
import { Grid, Skeleton } from '@mui/material';
import { AlertContext } from 'hooks/context/AlertContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { handleFetchCurrentUser, handleFetchServiceList } from 'utils/users/users';
import ServicesListItem from './utils/ServicesListItem';
const ServicesList = () => {
  const [currentUserData, setCurrentUserData] = useState({});
  const queryCenterSignup = useRef(currentUserData?.status?.startsWith('0') && currentUserData.team !== 'L1');
  // console.log("queryCenterSignup ===> Siminz ===> ", queryCenterSignup.current);
  const { setAlert } = useContext(AlertContext);
  const [eligiableServices, setEligiableSevices] = useState({ General: true });
  const [Services, setServices] = useState(!!JSON.parse(localStorage.getItem('ServiceList'))? JSON.parse(localStorage.getItem('ServiceList')): Array(12).fill(''))
  const [isLoading, setIsLoading] = useState(true)
  const prepareData = async() => {
    await handleFetchServiceList({
      setServiceList: setServices,
      requestAction: "SET_SERVICE_LIST",
      setIsLoading: () => { },
      setAlert: () => { },
    });
    console.log("Services ", 'ServiceList')
    await handleFetchCurrentUser({
      requestAction: 'SET_CURRENT_USER',
      setCurrentUserData,
      setAlert,
    });
    setIsLoading(false);
    if (queryCenterSignup.current)
      setAlert({
        alertType: 'warning',
        alertMsg: 'Please Register in the query center to be able to use the services',
        sleep: 1000000,
      });
    return () =>
      setAlert({
        alertType: '',
        alertMsg: '',
        sleep: 0,
      });

  }
  useEffect(() => {
   prepareData();
  }, []);
  useEffect(() => {
    if (currentUserData.roboAuthorities) {
      Services.map((service, index) => {
        const showService = currentUserData.roboAuthorities.some((auth) =>
          service?.allowedAuthorities?.includes(auth.name),
        );
        if (showService) setEligiableSevices((prev) => ({ ...prev, [service.description]: true }));
      });
      console.log(eligiableServices);
    }
  }, [currentUserData]);
  //if (currentUserData) {
    return (
    <>
      {isLoading && (<Grid container item spacing={4}>
        <Helmet>
          <title>Services | RoboAgent</title>
        </Helmet>
        {Services.map((service, index) => (
          <Grid key={service.description + index} item xs={12} sm={6} md={4} lg={3}>
            <Skeleton variant="rectangular" width={370} height={250} />
          </Grid>
        ))}
      </Grid>)}
      
      {!isLoading && (<Grid container item spacing={4}>
          <Helmet>
            <title>Services | RoboAgent</title>
          </Helmet>
          {Services.map((service, index) => (
            <Grid key={service.description + index} item xs={12} sm={6} md={4} lg={3}>
              <ServicesListItem
                eligiableServices={eligiableServices}
                currentUserData={currentUserData}
                service={service}
                queryCenterSignup={queryCenterSignup.current}
              />
            </Grid>
          ))}
        </Grid>)}
        </>
        );
        }
//};
        export default ServicesList;
