import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Grid, Modal, Popper, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUpdateAlert } from "src/hooks/Context/AlertContext";
import { glassMorphisimStyle } from "src/styles/styles";
import {
  handleFetchAllUsers,
  handleFetchAuthorities,
} from "src/utils/users/users";
import { v4 as uuidv4 } from "uuid";
import LoadingTableBody from "./TableLoading";
import DNDServicesModal from "./dialogs/DNDServicesModal";
import ServiceDialog from "./dialogs/ServiceDialog";
import RolesPopper from "./poppers/RolesPopper";
import "./usersTable.css";
export function handleFilterAuthorities(authorities, activeUserAuth) {
  const newAuth = [];
  authorities.map((auth) => {
    const isActiveAuth = activeUserAuth.findIndex(
      (active) => active.authId === auth.authId
    );
    if (isActiveAuth == -1) {
      const copyObj = { ...auth, containerValue: "all_services", id: uuidv4() };
      newAuth.push(copyObj);
    } else {
      const copyObj = {
        ...auth,
        containerValue: "active_services",
        id: uuidv4(),
      };
      newAuth.push(copyObj);
    }
  });
  return newAuth;
}
function UserTable() {
  const [isOpenServicesModal, setIsOpenServicesModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const [userData, setUserData] = useState({ userId: null });
  const [isEditServiceDialogOpen, setIsEditServiceDialogOpen] = useState(false);
  const [statusAnchorEl, setStatusAnchorEl] = useState(null);
  const setAlertInfo = useUpdateAlert();
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const handleStatusClick = (event, rowData) => {
    setUserData(rowData);

    setStatusAnchorEl(statusAnchorEl ? null : event.currentTarget);
  };
  const handleCloseRolePopper = () => setStatusAnchorEl(undefined);
  const statusOpen = Boolean(statusAnchorEl);
  const statusPopperId = statusOpen ? "simple-popper" : undefined;
  const handleOpenServiceDialog = (tableData) => {
    setUserData(tableData);
    setIsEditServiceDialogOpen(true);
  };
  const handleOpenServiceModal = (userData) => {
    setAuthorities(handleFilterAuthorities(authorities, userData[9]));
    setUserData(userData);
    setIsOpenServicesModal(true);
  };
  const handleCloseServicesModal = () => {
    setIsOpenServicesModal(false);
  };
  const handleCloseServiceDialog = () => {
    setIsEditServiceDialogOpen(false);
  };

  const columns = [
    {
      name: "userId",
      label: "User ID",
      options: {
        filter: true,
        display: "none",
        customBodyRender: (value, tableMeta, updateValue) => {
          return <Grid display={"none"}></Grid>;
        },
      },
    },
    {
      name: "UserName",
      label: t("UserNameLabel"),
      options: {
        filter: true,
      },
    },
    {
      name: "FirstName",
      label: t("firstnameLabel"),
      options: {
        display: "none",
        filter: false,
      },
    },
    {
      name: "middleName",
      label: t("middlenameLabel"),

      options: {
        display: "none",

        filter: false,
      },
    },
    {
      name: "last Name",
      label: t("lastnameLabel"),

      options: {
        filter: false,
        display: "none",
      },
    },
    {
      name: "status",
      label: t("statusLabel"),

      options: {
        filter: true,
      },
    },
    {
      name: "role",
      label: t("roleLabel"),

      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Grid
              container
              item
              minWidth={"150px"}
              alignItems={"center"}
              gap={2}
            >
              <Grid item xs={8}>
                <Typography variant="body2" fontWeight={500}>
                  {value}
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{ cursor: "pointer" }}
                onClick={(event) => handleStatusClick(event, tableMeta.rowData)}
              >
                <MoreVertIcon sx={{ color: "primary.main" }} />
              </Grid>
            </Grid>
          );
        },
      },
    },
    {
      name: "email",
      label: t("emailLabel"),

      options: {
        filter: true,
      },
    },
    {
      name: "service",
      label: t("serviceLabel"),
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const formattedValue = value.split("_").join(" ");
          return (
            <Grid
              container
              item
              minWidth={"200px"}
              maxWidth={"200px"}
              alignItems={"center"}
              gap={2}
            >
              <Grid item xs={8}>
                <Typography variant="body2" fontWeight={500}>
                  {formattedValue}
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{ cursor: "pointer" }}
                onClick={() => handleOpenServiceDialog(tableMeta.rowData)}
              >
                <MoreVertIcon sx={{ color: "primary.main" }} />
              </Grid>
            </Grid>
          );
        },
      },
    },
    {
      name: "services",
      label: t("servicesLabel"),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Grid
              container
              item
              minWidth={"150px"}
              maxWidth={"150px"}
              alignItems={"center"}
            >
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleOpenServiceModal(tableMeta.rowData)}
              >
                View all
              </Button>
            </Grid>
          );
        },
      },
    },
    {
      name: "team",
      label: t("teamLabel"),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Grid container item alignItems={"center"}>
              <Grid item>
                <Typography>{value}</Typography>
              </Grid>
            </Grid>
          );
        },
      },
    },
  ];
  const BodyComponent = useMemo(
    () => (props) => <LoadingTableBody loading={isLoading} {...props} />,
    [isLoading]
  );
  useEffect(() => {
    handleFetchAllUsers({
      setTableData,
      requestAction: "GET_ALL_USERS",
      setIsLoading,
    });
    handleFetchAuthorities({
      setAuthorities,
      requestAction: "GET_ALL_AUTHORITIES",
      setIsLoading,
    });
  }, []);
  const options = {
    filterType: "checkbox",
    selectableRowsHeader: false,
  };
  return (
    <Grid container item gap={4}>
      <Grid container item>
        <MUIDataTable
          title={"Users List"}
          data={tableData}
          columns={columns}
          options={options}
          components={{ TableBody: BodyComponent }}
        />
      </Grid>

      <Modal
        open={isOpenServicesModal}
        onClose={handleCloseServicesModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          item
          xs={12}
          md={6}
          sx={{
            ...glassMorphisimStyle,
          }}
        >
          <DNDServicesModal
            userData={userData}
            authorities={authorities}
            setAuthorities={setAuthorities}
            handleCloseServicesModal={handleCloseServicesModal}
          />
        </Grid>
      </Modal>

      {isEditServiceDialogOpen && (
        <ServiceDialog
          authorities={authorities}
          userId={userData[0]}
          isEditServiceDialogOpen={isEditServiceDialogOpen}
          handleCloseServiceDialog={handleCloseServiceDialog}
          tableData={tableData}
          setTableData={setTableData}
          setAlertInfo={setAlertInfo}
        />
      )}
      <Popper
        id={statusPopperId}
        open={statusOpen}
        anchorEl={statusAnchorEl}
        sx={glassMorphisimStyle}
      >
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
