const car = require("./car");

const mockCarPlate = "SGX1000"
const mockTimeStamp = "1600000"
const mockAllocatedLot = "CarLot2"

describe("car factory fn", () => {
  it("should return vehicle object with carPlate as key.", () => {
    const vehicleObj = car(mockCarPlate, mockTimeStamp, mockAllocatedLot);
    expect(vehicleObj[mockCarPlate].type).toBe("car");
    expect(vehicleObj[mockCarPlate].entryTimeStamp).toBe(mockTimeStamp);
    expect(vehicleObj[mockCarPlate].allocated).toBe("CarLot2");
  });
});
