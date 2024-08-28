/* eslint-disable */
import { Box, Grid, Toolbar, styled, Typography, TextField, Button } from "@mui/material";
import ShowAlert from "components/ShowAlert";
import { LoginContext } from "hooks/context/LoginInfoContext";
import { themeContext } from "hooks/context/ThemeContext";
import React, { useContext, useState, useEffect } from "react";
// import { Outlet } from "react-router";
import SideDrawer from "../../components/layout/SideDrawer";
import MainHeader from "../../components/layout/main_header/MainHeader";
import {
    handleFetchAllUsers,
    handleFetchAuthorities,
    handleFetchCurrentUser,
    handleFetchServiceList,
    handleUpdateUserInfo,
  } from 'utils/users/users';
import { AlertContext } from 'hooks/context/AlertContext';
import { Navigate } from "react-router";
import { useForm } from 'react-hook-form';
import ChangePassDialog from "components/user/dialogs/ChangePassDialog";
import CustomToast from "components/toast/CustomToast";

export const drawerWidth = 240;

const DrawerPaper = styled("div")(({ theme }) => ({
  width: drawerWidth,
  display: "grid",
  gridTemplateRows: "auto auto 1fr auto",
  // Add any other styles you need here
}));

const MainStyle = styled("main")(({ theme }) => ({
  flexGrow: 1,
  height: "calc(100vh - 65px)",
  padding: 16,
}));

const Profile = (props) => {
  const [currentUserData, setCurrentUserData] = useState({});
  const [authorities, setAuthorities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serviceList, setServiceList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const { loginData } = useContext(LoginContext);
  const { window } = props;
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleToggleDrawer = () => setToggleMenu(!toggleMenu);
  const { direction } = useContext(themeContext);
  const handleToggleClose = () => setToggleMenu(false);
  const container = window !== undefined ? () => window().document.body : undefined;
  const { setAlert, handleCloseAlert } = useContext(AlertContext);
  const [editMode,setEditMode] = useState(false);
  const [changePass,setChangePass]=useState(false);
  const [snackbarData, setSnackbarData] = useState({
    alertType: '',
    alertMsg: '',
    open: false,
  });

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

  console.log('current user data ::',currentUserData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    values: {
      firstName: currentUserData.firstName,
      middleName: currentUserData.middleName,
      lastName: currentUserData.lastName,
      phoneNumber: currentUserData.phoneNumber
    },
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarData((prev) => ({ ...prev, open: false }));
  };

  const handleCloseDialogs = () => {
    setChangePass(false);
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          direction: direction == "rtl" ? "ltr" : "ltr",
          display: "flex",
        }}
      >
        {/* App Bar */}
        {loginData.isLoggedIn && <MainHeader onClick={handleToggleDrawer} />}

        {loginData.isLoggedIn && (
          <SideDrawer
            container={container}
            toggleMenu={toggleMenu}
            onClose={handleToggleClose}
            drawerPaper={<DrawerPaper />}
          />
        )}
        {/* Drawer */}

        {/* Content */}
        <MainStyle>
          {loginData.isLoggedIn && <Toolbar />}
          <ShowAlert />
          {/* <Outlet /> */}
          <Grid container item alignItems={'flex-start'} flexWrap={'nowrap'} gap={8}>
                <Grid container item sm={12} md={10} gap={4}>
                    <Grid item xs={12}>
                        <Typography variant="h5" style={{ fontWeight: 'bold' }}> Profile </Typography>
                    </Grid>
                    {changePass && (
                        <ChangePassDialog
                        setSnackbarData={setSnackbarData}
                        setAlert={setAlert}
                        changePass={changePass}
                        email={currentUserData.email}
                        //handleNext={handleNext}
                        handleClose={handleCloseDialogs}
                        />
                    )}
                    {snackbarData.open && <CustomToast snackbarData={snackbarData} handleClose={handleClose} />}
                    <form
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                        onSubmit={handleSubmit(async (data) => {
                            console.log('data submitted',data);
                              //setLoading(true);
                              setAlert({
                                alertType: 'info',
                                sleep: 5000000,
                                alertMsg: 'Updating User Info',
                              });
                              await handleUpdateUserInfo(
                                {... data},
                                {requestAction: 'UPDATE_USER_INFO',
                                 setAlert   }        
                              );
                              setEditMode(false);
                              //reset();
                             // setLoading(false);
                            
                          })}>
                            <Grid container item position={'relative'} xs={12} gap={4}>
                                <Grid container item spacing={4}>
                                
                                {/* Name */}
                                <Grid container item xs={12} spacing={4}>
                                    <Grid container item xs={12} gap={1} md={4}>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" fontWeight={500}>
                                        First Name
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                                id="outlined-multiline-static"
                                                fullWidth
                                                defaultValue={currentUserData.firstName}
                                                //value={currentUserData.firstName}
                                                InputProps={{
                                                    readOnly:!editMode,
                                                    disabled:!editMode
                                                }}
                                                {...register('firstName')}
                                            />
                                    </Grid>
                                    </Grid>
                                    <Grid container item xs={12} md={4} gap={1}>
                                        <Grid item xs={12}>
                                            <Typography variant="body2" fontWeight={500}>
                                            Middle Name
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                        <TextField
                                                id="outlined-multiline-static"
                                                fullWidth
                                                InputProps={{
                                                    readOnly:!editMode,
                                                    disabled:!editMode
                                                }}
                                                {...register('middleName')}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={12} md={4} gap={1}>
                                        <Grid item xs={12}>
                                            <Typography variant="body2" fontWeight={500}>
                                            Last Name
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                        <TextField
                                                id="outlined-multiline-static"
                                                fullWidth
                                                InputProps={{
                                                    readOnly:!editMode,
                                                    disabled:!editMode
                                                }}
                                                {...register('lastName')}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                
                                {/* Phone Number */ }
                                <Grid container item xs={12} gap={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" fontWeight={500}>
                                            Phone Number
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="outlined-multiline-static"
                                            fullWidth
                                            InputProps={{
                                                readOnly:!editMode,
                                                disabled:!editMode
                                            }}
                                            {...register('phoneNumber')}
                                        />
                                    </Grid>
                                </Grid>

                                {/* Email */ }
                                <Grid container item xs={12} gap={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" fontWeight={500}>
                                            E-mail
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="outlined-multiline-static"
                                            fullWidth
                                            defaultValue={currentUserData.email}
                                            value={currentUserData.email}
                                            InputProps={{
                                                readOnly:true,
                                                disabled:true
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                
                                {/* Role */}
                                <Grid container item xs={12} gap={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" fontWeight={500}>
                                            Role
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="outlined-multiline-static"
                                            fullWidth
                                            defaultValue={currentUserData.role}
                                            value={currentUserData.role}
                                            InputProps={{
                                                readOnly:true,
                                                disabled:true
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                
                                {/* Main Service */}
                                <Grid container item xs={12} gap={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" fontWeight={500}>
                                            Main Service
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="outlined-multiline-static"
                                            // variant="filled"
                                            disabled={true}
                                            fullWidth
                                            defaultValue={currentUserData.service}
                                            value={currentUserData.service}
                                            InputProps={{
                                                readOnly:true,
                                                disabled:true
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                
                                {/* Team */}
                                <Grid container item xs={12} gap={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" fontWeight={500}>
                                            Team
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="outlined-multiline-static"
                                            fullWidth
                                            disabled={true}
                                            defaultValue={currentUserData.team}
                                            value={currentUserData.team}
                                            InputProps={{
                                                readOnly:true,
                                                disabled:true
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                {/* Password */}
                                <Grid container item xs={12} gap={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" fontWeight={500}>
                                            Password
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button 
                                                 
                                                variant="outlined"  
                                                disabled={isLoading} 
                                                //type="submit"
                                                disableElevation
                                                onClick={()=>{
                                                    setChangePass(true);
                                                }}>
                                                Change Password
                                            </Button>
                                    </Grid>
                                </Grid>

                                {/* Edit & Back Buttons */}
                            {    !editMode && <Grid container item spacing={4} marginBottom={4}>
                                    
                                    <Grid item xs={12} md={6}>
                                        <Button 
                                            fullWidth 
                                            variant="contained"  
                                            disabled={isLoading} 
                                            type="submit"
                                            disableElevation
                                            onClick={()=>{
                                                    setEditMode(true);
                                            }}>
                                            Edit
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="error"
                                            style={{
                                                width: '100%',
                                                color: 'white',
                                            }}
                                            href="/dash/dashboard"
                                        >
                                        Back
                                        </Button>
                                    </Grid>
                                </Grid>}

                                 {/* Save & Cancel Buttons */}
                                 {editMode && <Grid container item spacing={4} marginBottom={4}>
                                    
                                    <Grid item xs={12} md={6}>
                                        <Button 
                                            fullWidth 
                                            variant="contained"  
                                            disabled={isLoading} 
                                            type="submit"
                                            disableElevation
                                            // onClick={()=>{
                                            //     if(editMode){
                                            //         //Submit form
                                            //     }else{
                                            //         setEditMode(true);
                                            //     }
                                            // }}
                                            >
                                           Save
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="error"
                                            style={{
                                                width: '100%',
                                                color: 'white',
                                            }}
                                            // href="/dash/dashboard"
                                            onClick={()=>{
                                                
                                                    //cancel edit mode
                                                    setEditMode(false);
                                                    reset({
                                                        firstName: currentUserData.firstName? currentUserData.firstName : '',
                                                        middleName: currentUserData.middleName? currentUserData.middleName : '',
                                                        lastName: currentUserData.lastName? currentUserData.lastName : '',
                                                        phoneNumber : currentUserData.phoneNumber? currentUserData.phoneNumber : ''
                                                    });
                                                }}
                                        >
                                        Cancel
                                        </Button>
                                    </Grid>
                                </Grid>}
                                {/* <Grid container item xs={12} spacing={4}>
                                    <Grid container item xs={12} gap={1} md={6}>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" fontWeight={500}>
                                            Email
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                    <TextField
                                        id="outlined-multiline-static"
                                        fullWidth
                                        InputProps={{
                                            readOnly:true
                                        }}
                                    />
                                    </Grid>
                                    </Grid>
                                    <Grid container item xs={12} md={6} gap={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" fontWeight={500}>
                                            Team *
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                    <TextField
                                        id="outlined-multiline-static"
                                        fullWidth
                                        InputProps={{
                                            readOnly:true
                                        }}
                                    />
                                    </Grid>
                                    </Grid>
                                </Grid> */}
                                </Grid>
                            
                            </Grid>
                        </form>
                </Grid>
            </Grid>
        </MainStyle>
      </Box>
    </React.Fragment>
  );
};

export default Profile;
