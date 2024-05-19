const { default: AxiosHit } = require("../AxiosHit");
const { handleGetResponse } = require("../answer/service");

// Mocking AxiosHit
jest.mock("../AxiosHit");

describe("handleGetResponse", () => {
  let utils;

  beforeEach(() => {
    utils = {
      data: {
        reason: "test reason",
        establishmentNumber: "123",
        id_number: "456",
      },
      servicename: "test service",
      options: {
        option1: true,
        option2: false,
        option3: true,
      },
    };
  });

  test("should construct establishmentNumber correctly with id_number", async () => {
    const expectedEstablishmentNumber = "123-456";
    await handleGetResponse(utils);

    expect(AxiosHit).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          establishmentNumber: expectedEstablishmentNumber,
        }),
      }),
      utils
    );
  });

  test("should construct establishmentNumber correctly without id_number", async () => {
    utils.data.id_number = "";
    const expectedEstablishmentNumber = "123";
    await handleGetResponse(utils);

    expect(AxiosHit).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          establishmentNumber: expectedEstablishmentNumber,
        }),
      }),
      utils
    );
  });

  test("should filter selectedOptions correctly", async () => {
    const expectedSelectedOptions = ["option1", "option3"];
    await handleGetResponse(utils);

    expect(AxiosHit).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          selectedOptions: expectedSelectedOptions,
        }),
      }),
      utils
    );
  });

  test("should call AxiosHit with correct parameters", async () => {
    const expectedEstablishmentNumber = "123-456";
    const expectedSelectedOptions = ["option1", "option3"];
    const expectedUrl = "roboAgent/get-answer?service=TEST_SERVICE";
    const expectedMethod = "post";
    const expectedBaseUrl = "http://localhost:3000/";

    await handleGetResponse(utils);

    expect(AxiosHit).toHaveBeenCalledWith(
      {
        url: expectedUrl,
        method: expectedMethod,
        baseURL: expectedBaseUrl,
        data: {
          establishmentNumber: expectedEstablishmentNumber,
          selectedOptions: expectedSelectedOptions,
          reason: "test reason",
        },
      },
      utils
    );
  });

  test("should handle errors properly", async () => {
    const error = new Error("Test error");
    AxiosHit.mockRejectedValueOnce(error);

    console.log = jest.fn();

    await expect(handleGetResponse(utils)).rejects.toThrow("Test error");
    expect(console.log).toHaveBeenCalledWith(error);
  });
});
