import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import generalImg from 'assets/images/services/apps-svgrepo-com.svg';
import i18next from 'i18next';
import { useState } from 'react';
import ChangeOccupationImg from 'assets/images/services/change-record-type-svgrepo-com.svg';
import ContractManagerImg from 'assets/images/services/contract-sign-line-svgrepo-com.svg';
import EmployeeListImg from 'assets/images/services/list-svgrepo-com.svg';
import WorkPermitImg from 'assets/images/services/location-permit-svgrepo-com.svg';
import VisasImg from 'assets/images/services/passport-svgrepo-com.svg';
import PrivilegesImg from 'assets/images/services/permissions-svgrepo-com.svg';
import EmployeesTransferImg from 'assets/images/services/transfer-svgrepo-com.svg';
import UserManagmentImg from 'assets/images/services/user-id-svgrepo-com.svg';


function ServicesSidebar({ handleChangeCurrentService, currService, setCurrService, currentUserData }) {
  const [Services] = useState(
    JSON.parse(localStorage.getItem('ServiceList'))
      ? JSON.parse(localStorage.getItem('ServiceList'))
      : ['', '', '', ''],
  );
  
  const IconsMap = [{ key: 'generalImg', value: generalImg },
    { key: 'ChangeOccupationImg', value: ChangeOccupationImg },
    { key: 'ContractManagerImg', value: ContractManagerImg },
    { key: 'EmployeeListImg', value: EmployeeListImg },
    { key: 'WorkPermitImg', value: WorkPermitImg },
    { key: 'VisasImg', value: VisasImg },
    { key: 'PrivilegesImg', value: PrivilegesImg },
    { key: 'EmployeesTransferImg', value: EmployeesTransferImg },
    { key: 'UserManagmentImg', value: UserManagmentImg }]

    
  console.log('Services ', JSON.parse(localStorage.getItem('ServiceList')));

  const lang = i18next.language;
  return (
    <Grid
      container
      item
      borderLeft={'1px solid darkgray'}
      maxHeight={'80vh'}
      sx={{ overflowY: 'scroll' }}
      display={{ sm: 'none', md: 'grid' }}
      md={2}
      gap={2}
    >
      {Services.map((service, index) => {
        const showService = currentUserData?.roboAuthorities?.some((auth) =>
          service?.allowedAuthorities?.includes(auth.name),
        );
        return currentUserData.role == 'ADMIN' ? (
          <Grid key={service.description + index} item xs={12}>
            <Grid
              container
              item
              gap={2}
              alignItems={'center'}
              p={2}
              onClick={() => handleChangeCurrentService(service.service, setCurrService)}
              sx={{
                cursor: 'pointer',
                fontWeight: service.description === currService.description ? '600' : '',
                color: service.description === currService.description ? '#04554C' : '',
                backgroundColor: service.description === currService.description ? '#d9ffea' : '',
              }}
            >
              <Box
                component={'img'}
                src={service.bcUrl ? service.bcUrl : generalImg}
                sx={{ width: '20px', height: '20px' }}
              />
              <Typography variant="body1" fontWeight={'600'} color={'gray'}>
                {' '}
                {lang == 'en' ? service.description : service.descriptionAr}
              </Typography>
            </Grid>
          </Grid>
        ) : showService ? (
          <Grid key={service.description + index} py={2} item xs={12}>
            <Grid
              container
              item
              gap={2}
              alignItems={'center'}
              p={1}
              onClick={() => handleChangeCurrentService(service.service, setCurrService)}
              sx={{
                cursor: 'pointer',
                fontWeight: service.description === currService.description ? '600' : '',
                color: service.description === currService.description ? '#04554C' : '',
                backgroundColor: service.description === currService.description ? '#d9ffea' : '',
              }}
            >
              <Box
                component={'img'}
                src={service.bcUrl ? service.bcUrl : generalImg}
                sx={{ width: '20px', height: '20px' }}
              />
              <Typography variant="body1" fontWeight={'600'} color={'gray'}>
                {' '}
                {lang == 'en' ? service.description : service.descriptionAr}
              </Typography>
            </Grid>
          </Grid>
        ) : service.allowedAuthorities[0] === 'all' ? (
          <Grid
            container
            item
            key={service.description + index}
            gap={2}
            p={1}
            onClick={() => handleChangeCurrentService(service.service, setCurrService)}
            alignItems={'center'}
            sx={{
              cursor: 'pointer',
              fontWeight: service.description === currService.description ? '600' : '',
              color: service.description === currService.description ? '#04554C' : '',
              backgroundColor: service.description === currService.description ? '#d9ffea' : '',
            }}
          >
            <Box
              component={'img'}
              src={service.bcUrl ? service.bcUrl : generalImg}
              sx={{ width: '20px', height: '20px' }}
            />
            <Typography variant="body1" fontWeight={'600'} color={'gray'}>
              {' '}
              {lang == 'en' ? service.description : service.descriptionAr}
            </Typography>
          </Grid>
        ) : null;
      })}
    </Grid>
  );
}

export default ServicesSidebar;
