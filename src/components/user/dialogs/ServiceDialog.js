import {
  Button,
  Dialog,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import Loader from 'components/loader/Loader';
import i18n from 'dictonaries/i18n';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { handleSubmitUserNewService } from 'utils/users/users';

function ServiceDialog({
  isEditServiceDialogOpen,
  handleCloseServiceDialog,
  userId,
  tableData,
  setAlert,
  serviceList,
  setTableData,
  userActiveService,
}) {
  const [userNewService, setUserNewService] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    handleCloseServiceDialog;
  };
  const handleChangeUserNewService = (serviceId) => {
    const newService = serviceList.filter((s)=> s.id == serviceId.target.value)[0]
    console.log('newService',newService);
    setUserNewService(newService);
  };
  const { t } = useTranslation();
  return (
    <Dialog
      disableEscapeKeyDown
      open={isEditServiceDialogOpen}
      onClose={handleClose}
      fullWidth
      maxWidth={'sm'}
      sx={{
        direction: i18n.language == 'ar' ? 'ltr' : 'ltr',
      }}
    >
      <Grid container item xs={12} p={4} gap={4}>
        <Grid item>
          <Typography variant="h5" fontWeight={600}>
            {t('usersTable.Choose User Main Service')} *
          </Typography>
        </Grid>
        <FormControl sx={{ my: 1, width: '100%' }}>
          <InputLabel id="main_service">{t('usersTable.Service')}</InputLabel>
          <Select
            id="main_service"
            fullWidth
            sx
            defaultValue={userActiveService.id}
            onChange={handleChangeUserNewService}
            input={<OutlinedInput label="Service" />}
          >
            {serviceList?.map?.((service) => (
              <MenuItem key={service.id} sx={{ direction: 'ltr' }} value={service.id}>
                {i18n.language == 'ar' ? service.descriptionAr : service.descriptionEn}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid container item spacing={4}>
          <Grid item xs={6}>
            <Button fullWidth variant="outlined" onClick={handleCloseServiceDialog}>
              {t('usersTable.Cancel')}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              disabled={isLoading}
              onClick={async () => {
                setIsLoading(true);
                await handleSubmitUserNewService({
                  handleCloseServiceDialog,
                  userId,
                  userNewService,
                  requestAction: 'SET_SUBMIT_USER_SERVICE',
                  tableData,
                  setTableData,
                  setAlert,
                });
                setIsLoading(false);
              }}
            >
              {/* {t('usersTable.Submit')} */}
              {isLoading ? <Loader styles={{ width: '30px', height: '30px' }} /> : t('usersTable.Submit')}
            </Button>
            {/* } */}
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default ServiceDialog;
