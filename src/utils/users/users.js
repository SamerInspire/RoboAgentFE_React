import AxiosHit from 'utils/api/AxiosHit';
export async function handleSubmitUserAuths(utils) {
  const { containerSections, userId } = utils;
  try {
    await AxiosHit(
      {
        method: 'put',
        url: '/api/user-auth',
        data: {
          roboAuthorities: containerSections['active_services'],
          userId: userId,
        },
      },
      utils,
    );
  } catch (error) {
    console.error(error);
  }
}
export const handleFetchAuthorities = async (utils) => {
  try {
    const { setIsLoading } = utils;
    setIsLoading(true);
    await AxiosHit(
      {
        method: 'get',
        url: '/api/user-auth',
      },
      utils,
    );
    setIsLoading(false);
  } catch (error) {
    throw new Error(error);
  }
};
export async function hanldeSubmitUserNewRole(utils) {
  const { userId, newRole } = utils;
  try {
    await AxiosHit(
      {
        method: 'put',
        url: `/api/user-roles/${userId}/roles/${newRole.id}`,
      },
      utils,
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function handleSubmitNewUser(userData, utils) {
  console.log(userData);
  try {
    await AxiosHit(
      {
        url: '/api/users/signup',
        method: 'post',
        data: { ...userData, phone_Number:undefined, userRole:undefined, userTeam:undefined}
        // , roboAuthorities: undefined 
      },
      utils,
    );
    // console.log("r ======> ",r)
    // handleSubmitUserAuths({
    //   roboAuthorities: userData.roboAuthorities,
    //   userId: r.data.roboAgentRs.body?.user?.userId,
    // });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
export async function handleSubmitUserNewService(utils) {
  const { userId, userNewService } = utils;
  console.log();
  try {
    await AxiosHit(
      {
        method: 'put',
        url: `/api/service/${userId}/service/${userNewService.id}`,
      },
      utils,
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
export async function handleFetchAllUsers(utils) {
  try {
    const { setIsLoading } = utils;
    setIsLoading(true);
    await AxiosHit(
      {
        url: '/api/users/getallusers?size=40',
        method: 'get',
      },
      utils,
    );
    setIsLoading(false);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
export async function handleFetchServiceList(utils) {
  try {
    const { setIsLoading } = utils;
    setIsLoading(true);
    await AxiosHit(
      {
        method: 'get',
        url: '/api/service',
      },
      utils,
    );
    setIsLoading(false);
  } catch (error) {
    throw new Error(error);
  }
}
export async function handleFetchCurrentUser(utils) {
  try {
    await AxiosHit(
      {
        url: '/api/users/currentuser',
        method: 'get',
      },
      utils,
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
export async function handleUpdateUserInfo(userData, utils) {
  console.log("submit update user info ::",userData);
  try {
    await AxiosHit(
      {
        url: '/api/users/update-info',
        method: 'post',
        data: userData,
      },
      utils,
    );
  } catch (error) {
    console.log("update user info error",error);
    throw new Error(error);
  }
}
export async function handleChangePassword(utils) {
  const { email, currentPass, newPass,confirmPass, setIsLoading, handleClose } = utils;
  setIsLoading(true);
  try {
    await AxiosHit({
      method: "post",
      url: "/api/users/change-pass",
      //headers: { Authorization: `${otpToken}` },
      data: {
        email:email,
        currentPassword: currentPass,
        password: newPass,
        confirmedPassword: confirmPass
      },},
      utils,
    );
    handleClose();
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
