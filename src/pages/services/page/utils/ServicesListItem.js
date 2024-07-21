import InfoIcon from '@mui/icons-material/Info';
import { Grid, Link, Popper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import i18n from 'dictonaries/i18n';
import { AlertContext } from 'hooks/context/AlertContext';
import { themeContext } from 'hooks/context/ThemeContext';
import { useContext, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { glassMorphisimStyle } from 'styles/styles';
import generalImg from 'assets/images/services/apps-svgrepo-com.svg';
import ChangeOccupationImg from 'assets/images/services/change-record-type-svgrepo-com.svg';
import ContractManagerImg from 'assets/images/services/contract-sign-line-svgrepo-com.svg';
import EmployeeListImg from 'assets/images/services/list-svgrepo-com.svg';
import WorkPermitImg from 'assets/images/services/location-permit-svgrepo-com.svg';
import VisasImg from 'assets/images/services/passport-svgrepo-com.svg';
import PrivilegesImg from 'assets/images/services/permissions-svgrepo-com.svg';
import EmployeesTransferImg from 'assets/images/services/transfer-svgrepo-com.svg';
import UserManagmentImg from 'assets/images/services/user-id-svgrepo-com.svg';

const ServicesListItem = ({ service, queryCenterSignup, eligiableServices, currentUserData }) => {
  const lang = i18n.language;
  const [queryCenterAnchorEl, setQueryCenterAnchorEl] = useState(null);

  const open = Boolean(queryCenterAnchorEl);
  const id = open ? 'simple-popper' : undefined;
  const { setAlert } = useContext(AlertContext);
  const handleClick = (event) => {
    setQueryCenterAnchorEl(queryCenterAnchorEl ? null : event.currentTarget);
  };
  const IconsMap = [{ key: 'generalImg', value: generalImg },
  { key: 'ChangeOccupationImg', value: ChangeOccupationImg },
  { key: 'ContractManagerImg', value: ContractManagerImg },
  { key: 'EmployeeListImg', value: EmployeeListImg },
  { key: 'WorkPermitImg', value: WorkPermitImg },
  { key: 'VisasImg', value: VisasImg },
  { key: 'PrivilegesImg', value: PrivilegesImg },
  { key: 'EmployeesTransferImg', value: EmployeesTransferImg },
  { key: 'UserManagmentImg', value: UserManagmentImg }]
  // console.log('service ===>', service);
  //uncomment this line
  // const [update, setUpdate] = useState(false);
  // const isEligiableService =
  //   queryCenterSignup &&
  //   (!eligiableServices[service.enName] || currentUserData.role != "MEMBER");

  //change this line to be the above commented code i dont have access to the query center in jordan
  const isEligiableService =
    queryCenterSignup && (!eligiableServices[service.description] || currentUserData.role != 'MEMBER');
  const handleClosePopper = () => setQueryCenterAnchorEl(null);
  const { direction } = useContext(themeContext);
  useEffect(() => { }, [direction]);
  let bcUrl = IconsMap.find(icon => icon.key == service.bcUrl)?.value
  bcUrl = bcUrl ? bcUrl : generalImg
  return (
    <Link
      component={isEligiableService ? '' : RouterLink}
      sx={{ textDecoration: 'none', position: 'relative' }}
      to={isEligiableService ? '' : `/dash/services/getAnswer/${service.service}`}
    >
      <Grid
        container
        item
        onClick={() => {
          if (isEligiableService) {
            setAlert({
              alertType: 'warning',
              alertMsg: 'Please Register in the query center to be able to use the services',
              sleep: 5000,
            });
          }
        }}
        sx={{
          ...glassMorphisimStyle,
          cursor: isEligiableService ? 'not-allowed' : 'pointer',
          border: isEligiableService ? '2px solid gray' : '2px solid #4abb7d',
          '&:hover': {
            background: isEligiableService ? '' : '#d9ffea',
          },
          bgcolor: isEligiableService ? '#ededed ' : '',
        }}
      >
        <Grid
          container
          position={'relative'}
          item
          sx={{
            height: '240px',
            borderTopRightRadius: '10px',
            borderTopLeftRadius: '10px',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Box
            component={'img'}
            src={bcUrl}
            sx={{ width: '90px', height: '80px' }}
          />
          <Typography variant="h5" fontWeight={700} textAlign={'center'}>
            {lang == 'en' ? service.description : service.descriptionAr}
          </Typography>
        </Grid>
      </Grid>
      {isEligiableService && (
        <Popper id={id} placement={'bottom-end'} open={open} anchorEl={queryCenterAnchorEl}>
          <Box
            sx={{
              border: 1,
              borderColor: 'primary.main',
              p: 1,
              bgcolor: 'background.paper',
              borderRadius: '10px',
            }}
          >
            <Typography variant="body1" fontWeight={700} color={'gray.main'}>
              {queryCenterSignup
                ? 'Please Register in the query center to be able to use the services'
                : isEligiableService && "You don't have access to view this service"}
            </Typography>
          </Box>
        </Popper>
      )}
      {isEligiableService && (
        <Box
          onClick={handleClick}
          onMouseLeave={handleClosePopper}
          position={'absolute'}
          top={10}
          right={'10px'}
          sx={{ cursor: 'pointer' }}
        >
          <InfoIcon sx={{ color: '#808080', fontSize: 24 }} />
        </Box>
      )}
    </Link>
  );
};

export default ServicesListItem;
