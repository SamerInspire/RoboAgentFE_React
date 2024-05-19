import {
  findBoardSectionContainer,
  getAuthorityById,
  getAuthorityByStatus,
  initializeContainer,
} from "./service";

const sampleAuthorities = [
  {
    id: 1,
    authId: 1,
    name: "ADMIN",
    description: "admin",
    containerValue: "all_services",
  },
  {
    id: 2,
    authId: 2,
    name: "SUPER_VISOR",
    description: "SuperVisor",
    containerValue: "active_services",
  },
  {
    id: 3,
    authId: 3,
    name: "CM_ROLE",
    description: "CM Role",
    containerValue: "all_services",
  },
];

describe("Utility Functions", () => {
  describe("getAuthorityByStatus", () => {
    test("should return authorities with the given status", () => {
      const result = getAuthorityByStatus(sampleAuthorities, "all_services");
      expect(result).toEqual([
        {
          authId: 1,
          name: "ADMIN",
          description: "admin",
          containerValue: "all_services",
        },
        {
          authId: 3,
          name: "CM_ROLE",
          description: "CM Role",
          containerValue: "all_services",
        },
      ]);
    });

    test("should return an empty array if no authorities match the given status", () => {
      const result = getAuthorityByStatus(
        sampleAuthorities,
        "non_existent_status"
      );
      expect(result).toEqual([]);
    });
  });

  describe("getAuthorityById", () => {
    test("should return the authority with the given id", () => {
      const result = getAuthorityById(sampleAuthorities, 1);
      expect(result).toEqual({
        authId: 1,
        name: "ADMIN",
        description: "admin",
        containerValue: "all_services",
      });
    });

    test("should return undefined if no authority matches the given id", () => {
      const result = getAuthorityById(sampleAuthorities, 99);
      expect(result).toBeUndefined();
    });
  });

  describe("initializeContainer", () => {
    test("should initialize container sections correctly", () => {
      const result = initializeContainer(sampleAuthorities);
      expect(result).toEqual({
        all_services: [
          {
            authId: 1,
            name: "ADMIN",
            description: "admin",
            containerValue: "all_services",
          },
          {
            authId: 3,
            name: "CM_ROLE",
            description: "CM Role",
            containerValue: "all_services",
          },
        ],
        active_services: [
          {
            authId: 2,
            name: "SUPER_VISOR",
            description: "SuperVisor",
            containerValue: "active_services",
          },
        ],
      });
    });
  });

  describe("findBoardSectionContainer", () => {
    const containerSections = initializeContainer(sampleAuthorities);

    test("should return 'active_services' if id is 'active_services'", () => {
      const result = findBoardSectionContainer(
        containerSections,
        "active_services"
      );
      expect(result).toBe("active_services");
    });

    test("should return 'all_services' if id is 'all_services'", () => {
      const result = findBoardSectionContainer(
        containerSections,
        "all_services"
      );
      expect(result).toBe("all_services");
    });

    test("should return the correct container for a given authority id", () => {
      const result = findBoardSectionContainer(containerSections, 1);
      expect(result).toBe("all_services");

      const result2 = findBoardSectionContainer(containerSections, 2);
      expect(result2).toBe("active_services");
    });

    test("should return undefined if the id does not match any container", () => {
      const result = findBoardSectionContainer(containerSections, 99);
      expect(result).toBeUndefined();
    });
  });
});
