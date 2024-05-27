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

// export function reshapeUserData(usersArr = []) {
//   const newUsersArr = [];
//   for (let user of usersArr) {
//     let newUserArr = [];
//     for (let key of Object.keys(user)) {
//       newUserArr.push(user[key]);
//     }

//     newUsersArr.push(newUserArr);
//   }
//   return newUsersArr;
// }
