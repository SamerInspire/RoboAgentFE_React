import { CONTAINER_SECTIONS } from "src/constants/dnd";

export const getAuthorityByStatus = (authorities, status) => {
  return authorities.filter((authority) => authority.containerValue === status);
};

export const getAuthorityById = (authorities, id) => {
  console.log(authorities.find((authority) => authority.id == id));
  return authorities.find((authority) => authority.id === id);
};

export const initializeContainer = (authorities) => {
  const containerSections = {};

  Object.keys(CONTAINER_SECTIONS).forEach((containerSectionKey) => {
    containerSections[containerSectionKey] = getAuthorityByStatus(
      authorities,
      containerSectionKey
    );
  });
  return containerSections;
};

export const findBoardSectionContainer = (containerSections, id) => {
  // console.log(id, containerSections);
  // const isInAllServices = containerSections.all_services.some(
  //   (service) => service.id == id
  // );
  // const isInActiveServices = containerSections.active_services.some(
  //   (service) => service.id == id
  // );
  // if (isInActiveServices) {
  //   const e = containerSections["active_services"].find(
  //     (auth) => auth.id === id
  //   );
  //   console.log(e);
  //   return e.id;
  // } else if (isInAllServices) {
  //   const e = containerSections["all_services"].find((auth) => auth.id == id);
  //   return e.id;
  // }

  const container = Object.keys(containerSections).find((key) =>
    containerSections[key].find((item) => item.id === id)
  );
  return container;
};
