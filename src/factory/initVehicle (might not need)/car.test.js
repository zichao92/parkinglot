const car = require("./car");
const buildVehicleSpace = require("./buildVehicleSpace");

jest.mock("./buildVehicleSpace");
let buildVehicleSpaceSpy = jest.spyOn(buildVehicleSpace, "buildVehicleSpace");

describe("car factory", () => {
  it("should call buildVehicleSpace and return a vehicle mem object", async () => {
    buildVehicleSpaceSpy.mockImplementation(() => {
      return {
        CarLot1: null,
        CarLot2: null,
        CarLot3: null,
        CarLot4: null,
        CarLot5: null,
      };
    });

    const response = await car("5");
    expect(buildVehicleSpaceSpy).toBeCalledWith("CarLot", "5");

    expect(response).toEqual({
      car: {
        CarLot1: null,
        CarLot2: null,
        CarLot3: null,
        CarLot4: null,
        CarLot5: null,
      },
    });
  });
});
