/* eslint-disable */
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Grid, Modal, Popper, Typography } from '@mui/material';
import { AlertContext } from 'hooks/context/AlertContext';
import MUIDataTable from 'mui-datatables';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { glassMorphisimStyle } from 'styles/styles';
import { handleFilterAuthorities } from 'utils/table/tableReshape';
import {
  handleFetchAllUsers,
  handleFetchAuthorities,
  handleFetchCurrentUser,
  handleFetchServiceList,
} from 'utils/users/users';
import DNDServicesModal from './dialogs/DNDServicesModal';

import { Skeleton } from '@mui/material';
import ServiceDialog from './dialogs/ServiceDialog';
import RolesPopper from './poppers/RolesPopper';
import './usersTable.css';
function UserTable() {
  const [tableData, setTableData] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const { setAlert } = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(true);
  const [serviceList, setServiceList] = useState([]);
  const [userData, setUserData] = useState({ userId: null });
  const [isEditServiceDialogOpen, setIsEditServiceDialogOpen] = useState(false);
  const [statusAnchorEl, setStatusAnchorEl] = useState(null);
  const [currentUserData, setCurrentUserData] = useState({});
  const [isOpenServicesModal, setIsOpenServicesModal] = useState(false);
  const [isServicesModalLoading, setIsServicesModalLoading] = useState(false);
  const { t } = useTranslation();
  const handleCloseRolePopper = () => setStatusAnchorEl(undefined);

  const handleCloseServicesModal = (event,reason) => {
    if (reason && reason ==="backdropClick")
      return;
    setIsOpenServicesModal(false);
  };
  const handleCloseServiceDialog = () => {
    setIsEditServiceDialogOpen(false);
  };
  const handleOpenServiceDialog = (tableData) => {
    setUserData(tableData);
    setIsEditServiceDialogOpen(true);
  };
  const handleStatusClick = (event, rowData) => {
    setUserData(rowData);

    setStatusAnchorEl(statusAnchorEl ? null : event.currentTarget);
  };
  const handleOpenServiceModal = (userData) => {
    setAuthorities(handleFilterAuthorities(authorities, userData[9]));
    setUserData(userData);
    setIsOpenServicesModal(true);
  };
  const statusOpen = Boolean(statusAnchorEl);
  const statusPopperId = statusOpen ? 'simple-popper' : undefined;
  useEffect(() => {
    handleFetchAllUsers({
      setTableData,
      requestAction: 'GET_ALL_USERS',
      setIsLoading: () => {},
      setAlert,
    });
    handleFetchCurrentUser({
      requestAction: 'SET_CURRENT_USER',
      setCurrentUserData,
      setAlert,
      setIsLoading: () => {},
    });
    handleFetchAuthorities({
      setAuthorities,
      requestAction: 'GET_ALL_AUTHORITIES',
      setIsLoading,
      setAlert,
    });
  }, []);
  useEffect(() => {
    if (currentUserData.role === 'ADMIN') {
      handleFetchServiceList({
        setServiceList,
        requestAction: 'SET_SERVICE_LIST',
        setIsLoading: () => {},
        setAlert,
      });
    }
  }, [currentUserData]);
  useEffect(() => {
    console.log(isLoading, 'isLoading');
  }, [isLoading]);
  const options = {
    filterType: 'checkbox',
    selectableRowsHeader: false,
    textLabels: {
      pagination: { rowsPerPage: t('usersTable.Rows per page') },
      body: {
        noMatch: isLoading ? (
          <Box
            sx={{
              height: 'max-content',
            }}
          >
            {[...Array(10)].map((_, i) => (
              <Box width={'100%'} px={1} display={'flex'} justifyContent={'space-between'} py={2}>
                {[...Array([...Array(10)]?.length + 1 || 0)]?.map((_) => (
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: 90,
                      height: 30,
                      width: { md: '80%' },
                      borderRadius: 0.5,
                    }}
                  />
                ))}
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              height: 'max-content',
            }}
          >
            {[...Array(10)].map((_, i) => (
              <Box width={'100%'} px={1} display={'flex'} justifyContent={'space-between'} py={2}>
                {[...Array([...Array(10)]?.length + 1 || 0)]?.map((_) => (
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: 90,
                      height: 30,
                      width: { md: '80%' },
                      borderRadius: 0.5,
                    }}
                  />
                ))}
              </Box>
            ))}
          </Box>
        ),
      },
    },
  };
  return (
    <Grid container item gap={4}>
      <Grid container item>
        <MUIDataTable
          title={t('usersTable.Users List')}
          data={tableData}
          columns={[
            {
              name: 'userId',
              label: 'User ID',
              options: {
                filter: true,
                display: 'none',
                customBodyRender: (value, tableMeta, updateValue) => {
                  return <Grid display={'none'}></Grid>;
                },
              },
            },
            {
              name: 'UserName',
              label: t('UserNameLabel'),
              options: {
                filter: true,
              },
            },
            {
              name: 'FirstName',
              label: t('firstnameLabel'),
              options: {
                display: 'none',
                filter: false,
              },
            },
            {
              name: 'middleName',
              label: t('middlenameLabel'),

              options: {
                display: 'none',

                filter: false,
              },
            },
            {
              name: 'last Name',
              label: t('lastnameLabel'),

              options: {
                filter: false,
                display: 'none',
              },
            },
            {
              name: 'status',
              label: t('statusLabel'),

              options: {
                filter: true,
              },
            },
            {
              name: 'role',
              label: t('roleLabel'),

              options: {
                filter: true,
                display: currentUserData.role == 'TEAM_LEAD' ? 'none' : true,
                customBodyRender: (value, tableMeta, updateValue) => {
                  return (
                    <Grid container item minWidth={'150px'} alignItems={'center'} gap={2}>
                      <Grid item xs={8}>
                        <Typography variant="body2" fontWeight={500}>
                          {value}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={2}
                        sx={{ cursor: 'pointer' }}
                        onClick={(event) => handleStatusClick(event, tableMeta.rowData)}
                      >
                        <MoreVertIcon sx={{ color: 'primary.main' }} />
                      </Grid>
                    </Grid>
                  );
                },
              },
            },
            {
              name: 'email',
              label: t('emailLabel'),

              options: {
                filter: true,
              },
            },
            currentUserData.role == 'TEAM_LEAD'
              ? {
                  name: 'service',
                  label: t('serviceLabel'),
                }
              : {
                  name: 'service',
                  label: t('serviceLabel'),
                  options: {
                    filter: true,
                    display: currentUserData.role == 'TEAM_LEAD' ? 'none' : true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                      const formattedValue = value.split('_').join(' ');
                      return (
                        <Grid container item minWidth={'200px'} maxWidth={'200px'} alignItems={'center'} gap={2}>
                          <Grid item xs={8}>
                            <Typography variant="body2" fontWeight={500}>
                              {formattedValue}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => handleOpenServiceDialog(tableMeta.rowData)}
                          >
                            <MoreVertIcon sx={{ color: 'primary.main' }} />
                          </Grid>
                        </Grid>
                      );
                    },
                  },
                },
            {
              name: 'services',
              label: t('servicesLabel'),
              options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                  return (
                    <Grid container item minWidth={'150px'} maxWidth={'150px'} alignItems={'center'}>
                      <Button fullWidth variant="contained" onClick={() => handleOpenServiceModal(tableMeta.rowData)}>
                        {t('usersTable.VIEW ALL')}
                      </Button>
                    </Grid>
                  );
                },
              },
            },
            {
              name: 'team',
              label: t('teamLabel'),
              options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                  return (
                    <Grid container item alignItems={'center'}>
                      <Grid item>
                        <Typography>{value}</Typography>
                      </Grid>
                    </Grid>
                  );
                },
              },
            },
          ]}
          options={options}
        />
      </Grid>
      <Modal
        open={isOpenServicesModal}
        onClose={handleCloseServicesModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid container item xs={12} md={6} sx={{ ...glassMorphisimStyle }}>
          <DNDServicesModal
            userData={userData}
            authorities={authorities}
            setTableData={setTableData}
            tableData={tableData}
            setAuthorities={setAuthorities}
            handleCloseServicesModal={handleCloseServicesModal}
            setIsServicesModalLoading={setIsServicesModalLoading}
            isServicesModalLoading={isServicesModalLoading}
          />
        </Grid>
      </Modal>
      {isEditServiceDialogOpen && (
        <ServiceDialog
          authorities={authorities}
          userId={userData[0]}
          userActiveService={userData[8]}
          isEditServiceDialogOpen={isEditServiceDialogOpen}
          handleCloseServiceDialog={handleCloseServiceDialog}
          tableData={tableData}
          setTableData={setTableData}
          setAlert={setAlert}
          serviceList={serviceList}
          setServiceList={setServiceList}
        />
      )}
      <Popper id={statusPopperId} open={statusOpen} anchorEl={statusAnchorEl} sx={glassMorphisimStyle}>
        {userData && (
          <RolesPopper
            tableData={tableData}
            setTableData={setTableData}
            userData={userData}
            handleCloseRolePopper={handleCloseRolePopper}
          />
        )}
      </Popper>
    </Grid>
  );
}

export default UserTable;
