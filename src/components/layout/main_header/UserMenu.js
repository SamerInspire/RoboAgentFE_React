/* eslint-disable no-unused-vars */
// icons
import HomeIcon from "@mui/icons-material/Home";
import Person2Icon from "@mui/icons-material/Person2";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  MenuItem,
  Typography,
  Button, styled
} from "@mui/material";
// icons & images
import Menu from "@mui/material/Menu";
import userAvatar from "assets/images/GreenQiwa.jpg";
import i18n from "dictonaries/i18n";
import { LoginContext } from "hooks/context/LoginInfoContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

const GrayMainText = styled("div")(({ theme }) => ({
  color: theme.palette.gray.main,
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    maxWidth: 225,
    width: "90%",
    boxShadow: `0 2px 10px -5px ${theme.palette.green.darker}`,
  },
}));
const BoxStyle = styled(Box)(({ theme }) => ({
  padding: "10px 16px",
}));

const AvatarButtonStyle = styled(IconButton)(({ theme }) => ({
  padding: "2px 6px",
  "& .MuiAvatar-root": {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

// const LinkStyle = styled(Link)(({ theme }) => ({
//   display: "block",
//   textAlign: "center",
//   padding: theme.spacing(1),
//   color: theme.palette.common.black,
//   fontSize: theme.spacing(3),
//   fontWeight: 500,
//   border: "1px solid #333",
//   borderRadius: theme.spacing(1),
//   transition: "background 0.25s ease-in",
//   "&:hover": {
//     backgroundColor: theme.palette.gray.lighter,
//     underline: "none",
//   },
// }));

const MenuItemStyle = styled(MenuItem)(({ theme }) => ({
  padding: 0,
  "& a": {
    width: "100%",
    padding: "8px 20px",
    display: "flex",
    alignItems: "center",
    fontSize: 18,
    color: theme.palette.common.black,
    textDecoration: "none",
    "& svg": {
      marginRight: theme.spacing(2),
      fontSize: theme.spacing(3),
    },
  },
}));

// List of links

const UserMenu = (props) => {
  const { t } = useTranslation();
  const links = [
    {
      id: "l1",
      path: "/home",
      title: t("userMenu.Home"),
      icon: <HomeIcon sx={{ color: "primary.main" }} />,
    },
    {
      id: "l2",
      path: "/profile",
      title: t("userMenu.Profile"),
      icon: <Person2Icon sx={{ color: "primary.main" }} />,
    },
    {
      id: "l3",
      path: "/settings",
      title: t("userMenu.Settings"),
      icon: <SettingsIcon sx={{ color: "primary.main" }} />,
    },
  ];
  const { loginData, logout } = useContext(LoginContext);
  console.log("LoginInfo", loginData);
  return (
    <>
      <AvatarButtonStyle
        aria-controls="notifications"
        aria-haspopup="true"
        onClick={props.onOpen}
      >
        <Avatar src={userAvatar} alt="User Name">
          JD
        </Avatar>
      </AvatarButtonStyle>

      <StyledMenu
        id="notificationsMenu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.onClose}
        sx={{ direction: i18n.language == "ar" ? "ltr" : "ltr" }}
      >
        {/* Header */}
        <BoxStyle>
          <Typography variant="h6" component="h3">
            {loginData.firstName ? loginData.firstName : ""}
          </Typography>
          <GrayMainText variant="body2" component="p">
            {loginData.email}
          </GrayMainText>
        </BoxStyle>
        <Divider />
        {/* list of links */}
        {links.map((el) => (
          <MenuItemStyle key={el.id}>
            <a href={el.path}>
              {el.icon}
              <Typography
                fontWeight={600}
                color={"primary.main"}
                variant="body1"
              >
                {el.title}
              </Typography>
            </a>
          </MenuItemStyle>
        ))}

        {/* Footer */}
        <BoxStyle>
          <Button variant="outlined" onClick={logout} fullWidth>
            {t("userMenu.logout")}
          </Button>
        </BoxStyle>
      </StyledMenu>
    </>
  );
};

export default UserMenu;
