const clearLot = require("./clearLot");

const mockCarType = "car";
const mockAssignedLot = "CarLot1";

describe("clearLot", () => {
  it("should target lot with null.", async () => {
    const mockMem = {
      motorcycle: {
        MotorcycleLot1: null,
        MotorcycleLot2: null,
        MotorcycleLot1: null,
      },
      car: {
        CarLot1: { carPlate: "dummyData", timeStamp: 111111 },
        CarLot2: null,
        CarLot1: null,
      },
    };
    const response = clearLot.clearLot(
      mockCarType,
      mockAssignedLot,
      mockMem
    );
    expect(response[mockCarType][mockAssignedLot]).toBe(null);
  });
});
