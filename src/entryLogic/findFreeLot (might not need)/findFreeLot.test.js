const findFreeLot = require("./findFreeLot");

const mockCarType = "car";

describe("findFreeLot", () => {
  it("should return carLot position since there's opening.", async () => {
    const mockMem = {
      motorcycle: {
        MotorcycleLot1: null,
        MotorcycleLot2: null,
        MotorcycleLot1: null,
      },
      car: { CarLot1: null, CarLot2: null, CarLot1: null },
    };
    const response = findFreeLot.findFreeLot(mockCarType, mockMem);
    expect(response).toBe("CarLot1");
  });
  it("should return null since there are no availbility.", async () => {
    const mockMem = {
      motorcycle: {
        MotorcycleLot1: null,
        MotorcycleLot2: null,
        MotorcycleLot1: null,
      },
      car: {
        CarLot1: "mockCarPlate1",
        CarLot2: "mockCarPlate2",
        CarLot1: "mockCarPlate3",
      },
    };
    const response = findFreeLot.findFreeLot(mockCarType, mockMem);
    expect(response).toBeNull();
  });
});
