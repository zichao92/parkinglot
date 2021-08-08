const findAvailableLot = require("./findAvailableLot");
const mockCarType = "car";

describe("findAvailableLot", () => {
  it("should return CarLot2 since it's available.", () => {
    const mockStatusMem = {
      car: {
        CarLot1: false,
        CarLot2: true,
        CarLot3: true,
      },
      motorcycle: {
        MotorcycleLot1: true,
        MotorcycleLot2: false,
        MotorcycleLot3: false,
        MotorcycleLot4: true,
      },
    };
    const response = findAvailableLot.findAvailableLot(
      mockCarType,
      mockStatusMem,
    );
    expect(response).toBe("CarLot2");
  });
  it("should return CarLot1 since it's available.", () => {
    const mockStatusMem = {
      car: {
        CarLot1: true,
        CarLot2: false,
        CarLot3: false,
      },
      motorcycle: {
        MotorcycleLot1: true,
        MotorcycleLot2: false,
        MotorcycleLot3: false,
        MotorcycleLot4: true,
      },
    };
    const response = findAvailableLot.findAvailableLot(
      mockCarType,
      mockStatusMem,
    );
    expect(response).toBe("CarLot1");
  });
});
