import {
  Avatar,
  Box,
  Drawer,
  Hidden,
  List,
  Toolbar,
  Typography,
  styled
} from "@mui/material";
import { Link } from "react-router-dom";

// icons & images
import userAvatar from "assets/images/GreenQiwa.jpg";
import getMoreAvatar from "assets/images/pom-bot.gif";
import { FaUserFriends, FaUserPlus } from "react-icons/fa";
import { ImPieChart } from "react-icons/im";
import {
  RiLoginCircleFill,
  RiServerFill,
  RiShoppingBag3Fill,
} from "react-icons/ri";


import CustomListItem from "components/drawer/CustomListItem";
import { drawerWidth } from "components/layout/DashboardLayout";
import { LoginContext } from "hooks/context/LoginInfoContext";
import i18next from "i18next";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import AuthWrapper from "../auth_wrapper/AuthWrapper";
const NavDrawerStyle = styled("nav")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: drawerWidth,
    flexShrink: 0,
  },
}));

const LogoStyle = styled(Typography)(({ theme }) => ({
  color: theme.palette.green.darker,
  margin: 0,
}));

const UserCardStyle = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: "inherit",
  backgroundColor: theme.palette.gray.light,
  margin: "12px",
  padding: "14px 12px",
  borderRadius: theme.spacing(2),
  textDecoration: "none",
  "& .MuiTypography-root": {
    marginLeft: theme.spacing(2),
  },
}));

const ListStyle = styled(List)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const GetMoreStyle = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.gray.lighter,
  margin: "12px",
  padding: "60px 12px 14px 12px",
  borderRadius: theme.spacing(2),
  textAlign: "center",
  position: "absolute",
  bottom: 0,
  "& img": {
    position: "absolute",
    bottom: 30,
    left: "50%",
    // width: "50px",
    width: 120,
    transform: "translate(-50%, -30%)",
    transition: "all 0.3s ease-in",
  },
  "& h5": {
    margin: "10px 0",
  },
  "& a": {
    textDecoration: "none",
    fontWeight: 500,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.green.darker,
    display: "block",
    padding: "6px",
    borderRadius: "inherit",
    transition: "background 0.3s ease-in",
    boxShadow: "0px 5px 5px white",
    "&:hover": {
      backgroundColor: theme.palette.green.dark,
    },
  },

  "&:hover": {
    "& img": {
      transform: "translate(-50%, -50%)",
    },
  },
}));

// links for the side nav

const beforeLogin = [
  {
    id: "L0",
    path: "/auth/login",
    icon: <RiLoginCircleFill />,
    title: "Login",
  },
];

const afterLogin = [
  {
    id: "L0",
    path: "/dash/dashboard",
    icon: <ImPieChart />,
    title: "Dashboard",
    allowedRoles: ["ADMIN", "TEAM_LEAD", "MEMBER"],
  },
  {
    id: "L1",
    path: "/dash/user",
    icon: <FaUserFriends />,
    title: "User",
    allowedRoles: ["ADMIN", "TEAM_LEAD"],
  },
  {
    id: "L2",
    path: "/dash/manual",
    icon: <RiShoppingBag3Fill />,
    title: "Manual",
    allowedRoles: ["ADMIN", "TEAM_LEAD", "MEMBER"],
  },
  {
    id: "L3",
    path: "/dash/services",
    icon: <RiServerFill />,
    title: "Services",
    allowedRoles: ["ADMIN", "TEAM_LEAD", "MEMBER"],
  },
  {
    id: "L4",
    path: "/dash/register",
    icon: <FaUserPlus />,
    title: "Register",
    allowedRoles: ["ADMIN"],
  },
  // { id: "L3", path: "/blog", icon: <RiClipboardFill />, title: "Blog" },
  // { id: "L6", path: "/404", icon: <GiHazardSign />, title: "Not Found" },
];

const SideDrawer = (props) => {
  const { loginData } = useContext(LoginContext);
  console.log("loginData side ---< ", loginData);
  const links = loginData.isLoggedIn ? afterLogin : beforeLogin;
  const { t } = useTranslation();
  // const { direction } = useContext(themeContext);
  const drawerContent = (
    <>
      {/* Logo */}
      <Toolbar>
        <LogoStyle variant="h6" component="h2">
          RoboAgent portal
        </LogoStyle>
      </Toolbar>

      {/* User Card */}
      <UserCardStyle to="/" onClick={props.onClose}>
        <Avatar src={userAvatar} alt="User Image" />

        <Typography variant="h6">{loginData.firstName}</Typography>
      </UserCardStyle>

      {/* List of links */}
      <ListStyle>
        {links.map((el) => (
          <AuthWrapper key={el.id} roles={el.allowedRoles}>
            <CustomListItem
              key={el.id}
              path={el.path}
              icon={el.icon}
              title={t(`links.${el.title.toLowerCase()}`)}
              onClick={props.onClose}
            />
          </AuthWrapper>
        ))}
      </ListStyle>

      {/* get more card */}
      <GetMoreStyle>
        <img src={getMoreAvatar} alt="avatar" />
        <Typography variant="body1">
          {t("user.welcome")} {loginData.firstName + " "} {loginData.lastName}
        </Typography>
      </GetMoreStyle>
    </>
  );

  return (
    <NavDrawerStyle aria-label="Navigation Panel">
      {/* Hidden 01 for sm size */}
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={i18next.language == "ar" ? "right" : "left"}
          open={props.toggleMenu}
          onClose={props.onClose}
        >
          {/* Drawer Component */}
          {drawerContent}
        </Drawer>
      </Hidden>

      {/* Hidden 02 for big size*/}
      <Hidden xsDown implementation="css">
        <Drawer variant="permanent" open classes={{ paper: props.drawerPaper }}>
          {drawerContent}
        </Drawer>
      </Hidden>
    </NavDrawerStyle>
  );
};

export default SideDrawer;
