const motorcycle = require("./motorcycle");

const mockCarPlate = "YMAHA1000"
const mockTimeStamp = "1600000"
const mockAllocatedNumber = 1

describe("motorcycle factory fn", () => {
  it("should return vehicle object with carPlate as key.", async () => {
    const vehicleObj = motorcycle(mockCarPlate, mockTimeStamp, mockAllocatedNumber);
    expect(vehicleObj[mockCarPlate].type).toBe("motorcycle");
    expect(vehicleObj[mockCarPlate].entryTimeStamp).toBe(mockTimeStamp);
    expect(vehicleObj[mockCarPlate].allocated).toBe("MotorcycleLot1");
  });
});
