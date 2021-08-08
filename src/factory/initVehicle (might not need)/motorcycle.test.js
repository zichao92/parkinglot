const motorcycle = require("./motorcycle");
const buildVehicleSpace = require("./buildVehicleSpace");

jest.mock("./buildVehicleSpace");
let buildVehicleSpaceSpy = jest.spyOn(buildVehicleSpace, "buildVehicleSpace");

describe("motorcycle factory", () => {
  it("should call buildVehicleSpace and return a vehicle mem object", async () => {
    buildVehicleSpaceSpy.mockImplementation(() => {
      return {
        motorcycleLot1: null,
        motorcycleLot2: null,
        motorcycleLot3: null,
        motorcycleLot4: null,
        motorcycleLot5: null,
      };
    });

    const response = await motorcycle("5");
    expect(buildVehicleSpaceSpy).toBeCalledWith("MotorcycleLot", "5");

    expect(response).toEqual({
      motorcycle: {
        motorcycleLot1: null,
        motorcycleLot2: null,
        motorcycleLot3: null,
        motorcycleLot4: null,
        motorcycleLot5: null,
      },
    });
  });
});
