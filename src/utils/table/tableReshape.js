import { v4 as uuidv4 } from "uuid";

export function handleFilterServices(activeServices = [], allServices = []) {
  console.log(activeServices);
  const filteredArray2 = allServices.filter(
    (service) =>
      !activeServices.some(
        (activeService) => activeService.authId === service.authId
      )
  );
  return filteredArray2;
}

export function reshapeUserData(usersArr = []) {
  const newUsersArr = [];
  usersArr.forEach((user) => {
    user.status = user?.status?.split("-")[1];
    newUsersArr.push(Object.values(user));
  });
  return newUsersArr;
}

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
