import DownloadIcon from "@mui/icons-material/Download";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { Button, Grid } from "@mui/material";
import { AlertContext } from "hooks/context/AlertContext";
import { useContext,useState } from "react";
import { useTranslation } from "react-i18next";
import { hanldeSubmitUserNewRole } from "utils/users/users";
import Loader from "components/loader/Loader";

function RolesPopper({
  userData,
  setTableData,
  tableData,
  handleCloseRolePopper,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const { t } = useTranslation();
  const Roles = JSON.parse(localStorage.getItem('Roles'));
  console.log('user data',userData);

  return (
    <Grid container item alignItems={"center"} gap={2} p={2}>
      {userData[6]?.role?.toLowerCase() == "MEMBER".toLowerCase() ? (
        <Grid item>
          <Button
            fullWidth
            disabled={isLoading}
            onClick={async () => {
              setIsLoading(true);
              await hanldeSubmitUserNewRole({
                userId: userData[0],
                newRole: Roles.filter((r)=>r.role =='TEAM_LEAD')[0] ,
                setTableData,
                requestAction: "UPDATE_USER_ROLE",
                tableData,
                userData,
                handleCloseRolePopper,
                setAlert,
              });
              handleCloseRolePopper();
              setIsLoading(false);
            }}
            startIcon={isLoading? null : <UpgradeIcon sx={{ mx: 1 }} />}
            variant="outlined"
          >
            {/* {t("usersTable.Promote to team Lead")} */}
            {isLoading ? <Loader styles={ { width: "30px", height: "30px" }} /> : t("usersTable.Promote to team Lead")}
          </Button>
        </Grid>
      ) : (
        <Grid item>
          <Button
            fullWidth
            disabled={isLoading}
            onClick={async () => {
              setIsLoading(true);
              await hanldeSubmitUserNewRole({
                userId: userData[0],
                newRole: Roles.filter((r)=>r.role =='MEMBER')[0],
                setTableData,
                requestAction: "UPDATE_USER_ROLE",
                tableData,
                userData,
                handleCloseRolePopper,
                setAlert,
              });
              handleCloseRolePopper();
              setIsLoading(false);
            }}
            startIcon={isLoading? null :<DownloadIcon sx={{ mx: 1 }} />}
            variant="outlined"
          >
            {/* {t("usersTable.Emote to Member")} */}
            {isLoading ? <Loader styles={ { width: "30px", height: "30px" }} /> : t("usersTable.Emote to Member")}

          </Button>
        </Grid>
      )}
    </Grid>
  );
}

export default RolesPopper;
