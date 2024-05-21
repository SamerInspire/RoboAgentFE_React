// authorities.test.js
import { CONTAINER_SECTIONS } from "src/constants/dnd";
import {
  getAuthorityByStatus,
  getAuthorityById,
  initializeContainer,
  findBoardSectionContainer,
} from "./service";

const sampleAuthorities = [
  {
    authId: 3,
    name: "CM_ROLE",
    description: "CM Role",
    containerValue: "active_services",
    id: 3,
  },
  {
    authId: 5,
    name: "AUTOMATION_ROLE",
    description: "Automation Role",
    containerValue: "all_services",
    id: 5,
  },
  {
    authId: 4,
    name: "WP_ROLE",
    description: "WP Role",
    containerValue: "all_services",
    id: 4,
  },
  {
    authId: 6,
    name: "HALF_ADMIN",
    description: "Half Admin",
    containerValue: "active_services",
    id: 6,
  },
];

describe("Authority Functions", () => {
  describe("getAuthorityByStatus", () => {
    it("should return authorities with the specified status", () => {
      const activeServices = getAuthorityByStatus(
        sampleAuthorities,
        "active_services"
      );
      expect(activeServices).toEqual([
        {
          authId: 3,
          name: "CM_ROLE",
          description: "CM Role",
          containerValue: "active_services",
          id: 3,
        },
        {
          authId: 6,
          name: "HALF_ADMIN",
          description: "Half Admin",
          containerValue: "active_services",
          id: 6,
        },
      ]);
    });

    it("should return an empty array if no authorities match the status", () => {
      const inactiveServices = getAuthorityByStatus(
        sampleAuthorities,
        "inactive_services"
      );
      expect(inactiveServices).toEqual([]);
    });
  });

  describe("getAuthorityById", () => {
    it("should return the authority with the specified id", () => {
      const authority = getAuthorityById(sampleAuthorities, 5);
      expect(authority).toEqual({
        authId: 5,
        name: "AUTOMATION_ROLE",
        description: "Automation Role",
        containerValue: "all_services",
        id: 5,
      });
    });

    it("should return undefined if no authority matches the id", () => {
      const authority = getAuthorityById(sampleAuthorities, 999);
      expect(authority).toBeUndefined();
    });
  });

  describe("initializeContainer", () => {
    it("should initialize containers correctly based on status", () => {
      const containers = initializeContainer(sampleAuthorities);
      expect(containers).toEqual({
        all_services: [
          {
            authId: 5,
            name: "AUTOMATION_ROLE",
            description: "Automation Role",
            containerValue: "all_services",
            id: 5,
          },
          {
            authId: 4,
            name: "WP_ROLE",
            description: "WP Role",
            containerValue: "all_services",
            id: 4,
          },
        ],
        active_services: [
          {
            authId: 3,
            name: "CM_ROLE",
            description: "CM Role",
            containerValue: "active_services",
            id: 3,
          },
          {
            authId: 6,
            name: "HALF_ADMIN",
            description: "Half Admin",
            containerValue: "active_services",
            id: 6,
          },
        ],
      });
    });
  });

  describe("findBoardSectionContainer", () => {
    it("should return the correct section id for active_services", () => {
      const section = findBoardSectionContainer({}, "active_services");
      expect(section).toEqual("active_services");
    });

    it("should return the correct section id for all_services", () => {
      const section = findBoardSectionContainer({}, "all_services");
      expect(section).toEqual("all_services");
    });

    it("should return the correct container section for a given id", () => {
      const containerSections = initializeContainer(sampleAuthorities);
      const section = findBoardSectionContainer(containerSections, 5);
      expect(section).toEqual("all_services");
    });

    it("should return undefined if the id is not found in any container section", () => {
      const containerSections = initializeContainer(sampleAuthorities);
      const section = findBoardSectionContainer(containerSections, 999);
      expect(section).toBeUndefined();
    });
  });
});
