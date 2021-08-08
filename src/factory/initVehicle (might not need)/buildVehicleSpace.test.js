const buildVehicleSpace = require("./buildVehicleSpace");

const mockVehicleType = "CarLot";

describe("clearLot", () => {
  it("should target lot with null.", async () => {
    const testObj = buildVehicleSpace.buildVehicleSpace(mockVehicleType, 5)
    expect(Object.keys(testObj).length).toBe(5);
    expect(testObj.CarLot1).toBeNull();
  });
});
