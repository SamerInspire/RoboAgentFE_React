import DownloadIcon from "@mui/icons-material/Download";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { Button, Grid } from "@mui/material";
import { useContext } from "react";
import { AlertContext } from "hooks/context/AlertContext";
import { hanldeSubmitUserNewRole } from "utils/users/users";

function RolesPopper({
  userData,
  setTableData,
  tableData,
  handleCloseRolePopper,
}) {
  const { setAlert } = useContext(AlertContext);
  return (
    <Grid container item alignItems={"center"} gap={2} p={2}>
      {userData[6]?.toLowerCase() == "MEMBER".toLowerCase() ? (
        <Grid item>
          <Button
            fullWidth
            onClick={() => {
              hanldeSubmitUserNewRole({
                userId: userData[0],
                newRole: "TEAM_LEAD",
                setTableData,
                requestAction: "UPDATE_USER_ROLE",
                tableData,
                userData,
                handleCloseRolePopper,
                setAlert,
              });
              handleCloseRolePopper();
            }}
            startIcon={<UpgradeIcon />}
            variant="outlined"
          >
            Promote to team Lead
          </Button>
        </Grid>
      ) : (
        <Grid item>
          <Button
            fullWidth
            onClick={() => {
              hanldeSubmitUserNewRole({
                userId: userData[0],
                newRole: "MEMBER",
                setTableData,
                requestAction: "UPDATE_USER_ROLE",
                tableData,
                userData,
                handleCloseRolePopper,
                setAlert,
              });
            }}
            startIcon={<DownloadIcon />}
            variant="outlined"
          >
            Emote to Member
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

export default RolesPopper;
