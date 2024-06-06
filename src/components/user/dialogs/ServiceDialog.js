import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { handleSubmitUserNewService } from "utils/users/users";

function ServiceDialog({
  isEditServiceDialogOpen,
  handleCloseServiceDialog,
  userId,
  tableData,
  setAlert,
  serviceList,
  setTableData,
}) {
  const [userNewService, setUserNewService] = useState();
  const handleChangeUserNewService = (serviceId) => {
    setUserNewService(serviceId.target.value);
  };
  const { t } = useTranslation();
  return (
    <Dialog
      disableEscapeKeyDown
      open={isEditServiceDialogOpen}
      onClose={handleCloseServiceDialog}
      fullWidth={"md"}
    >
      <DialogTitle>{t("usersTable.Choose User Main Service")}</DialogTitle>
      <DialogContent>
        <FormControl sx={{ my: 1, width: "100%" }}>
          <InputLabel id="main_service">{t("usersTable.Service")}</InputLabel>
          <Select
            id="main_service"
            fullWidth
            onChange={handleChangeUserNewService}
            input={<OutlinedInput label="Service" />}
          >
            {serviceList?.map?.((service) => (
              <MenuItem key={service.id} value={service.service}>
                {service.service.split("_").join(" ")}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseServiceDialog}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() =>
            handleSubmitUserNewService({
              handleCloseServiceDialog,
              userId,
              userNewService,
              requestAction: "SET_SUBMIT_USER_SERVICE",
              tableData,
              setTableData,
              setAlert,
            })
          }
        >
          {t("usersTable.Submit")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ServiceDialog;
