import { CONTAINER_SECTIONS } from "constants/dnd";

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
  if (id == "active_services") return "active_services";
  else if (id == "all_services") return "all_services";
  const container = Object.keys(containerSections).find((key) =>
    containerSections[key].find((item) => item.id === id)
  );
  return container;
};
