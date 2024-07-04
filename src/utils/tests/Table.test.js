const {
  handleFilterServices,
  reshapeUserData,
} = require("../table/tableReshape");

describe("handleFilterServices", () => {
  test("filters out active services from all services", () => {
    const activeServices = [{ authId: 1 }, { authId: 2 }];
    const allServices = [{ authId: 1 }, { authId: 2 }, { authId: 3 }];
    const expectedFilteredServices = [{ authId: 3 }];

    const filteredServices = handleFilterServices(activeServices, allServices);

    expect(filteredServices).toEqual(expectedFilteredServices);
  });

  test("returns all services if no active services", () => {
    const activeServices = [];
    const allServices = [{ authId: 1 }, { authId: 2 }, { authId: 3 }];
    const expectedFilteredServices = allServices;

    const filteredServices = handleFilterServices(activeServices, allServices);

    expect(filteredServices).toEqual(expectedFilteredServices);
  });

  test("returns empty array if all services are active", () => {
    const activeServices = [{ authId: 1 }, { authId: 2 }, { authId: 3 }];
    const allServices = [{ authId: 1 }, { authId: 2 }, { authId: 3 }];
    const expectedFilteredServices = [];

    const filteredServices = handleFilterServices(activeServices, allServices);

    expect(filteredServices).toEqual(expectedFilteredServices);
  });

  test("returns all services if active services are empty", () => {
    const activeServices = [];
    const allServices = [{ authId: 1 }, { authId: 2 }, { authId: 3 }];
    const expectedFilteredServices = allServices;

    const filteredServices = handleFilterServices(activeServices, allServices);

    expect(filteredServices).toEqual(expectedFilteredServices);
  });
});

describe("reshapeUserData", () => {
  test("transforms array of user objects into array of arrays of values", () => {
    const usersArr = [
      { id: 1, name: "Moh", email: "moh.abdin27@gmail.com" },
      { id: 2, name: "Jane", email: "jane@example.com" },
    ];
    const expectedReshapedData = [
      [1, "Moh", "moh.abdin27@gmail.com", undefined],
      [2, "Jane", "jane@example.com", undefined],
    ];

    const reshapedData = reshapeUserData(usersArr);

    expect(reshapedData).toEqual(expectedReshapedData);
  });

  test("returns empty array if input is empty", () => {
    const usersArr = [];
    const expectedReshapedData = [];

    const reshapedData = reshapeUserData(usersArr);

    expect(reshapedData).toEqual(expectedReshapedData);
  });

  test("handles user objects with different keys", () => {
    const usersArr = [
      { id: 1, name: "Moh", age: 30 },
      { id: 2, name: "Jane", age: 25, email: "jane@example.com" },
    ];
    const expectedReshapedData = [
      [1, "Moh", 30, undefined],
      [2, "Jane", 25, "jane@example.com", undefined],
    ];

    const reshapedData = reshapeUserData(usersArr);

    expect(reshapedData).toEqual(expectedReshapedData);
  });
});
