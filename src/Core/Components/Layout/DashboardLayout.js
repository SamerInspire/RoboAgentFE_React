import { Box, styled, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from 'react';
import { useLoginInfo } from "src/Core/Context/LoginInfoContext";
import { Outlet } from 'react-router';
import ShowAlert from "src/Core/Components/ShowAlert";
import MainHeader from "./MainHeader";
import SideDrawer from "./SideDrawer";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth,
    display: "grid",
    gridTemplateRows: "auto auto 1fr auto",
  },
}));

const MainStyle = styled("main")(({ theme }) => ({
  flexGrow: 1,
  minHeight: "100vh",
  padding: theme.spacing(2.5),
}));

const DashboardLayout = (props) => {
  // window width
  const LoginInfo = useLoginInfo()
  const { window } = props;
  const [toggleMenu, setToggleMenu] = useState(false);
  const classes = useStyles();

  // toggle drawer
  const handleToggleDrawer = () => setToggleMenu(!toggleMenu);
  const handleToggleClose = () => setToggleMenu(false);

  // I don't know the work of container yet
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <React.Fragment >
      <Box sx={{ display: "flex" }}>
        {/* App Bar */}
        <MainHeader onClick={handleToggleDrawer} />

        {/* Drawer */}
        {LoginInfo.login ? <><SideDrawer
          container={container}
          toggleMenu={toggleMenu}
          onClose={handleToggleClose}
          drawerPaper={classes.drawerPaper}
        /></> : <></>}

        {/* Content */}
        <MainStyle>

          <Toolbar />
          <ShowAlert />

          {/* Main parts */}
          <Outlet />
        </MainStyle>
      </Box>
    </React.Fragment>

  );
};

export default DashboardLayout;

export const drawerWidth = 240;
