const clearLot = require("./clearLot");

const mockparkingLotMem = {
  SGX1001: {
    type: "car",
    entryTimeStamp: 160000,
    allocated: "CarLot1",
  },
  SGX1234A: {
    type: "car",
    entryTimeStamp: 1613541902,
    allocated: "CarLot2",
  },
};

const mockStatusMem = {
  car: {
    CarLot1: false,
    CarLot2: false,
    CarLot3: true,
  },
  motorcycle: {
    MotorcycleLot1: true,
    MotorcycleLot2: true,
    MotorcycleLot3: true,
    MotorcycleLot4: true,
  },
};
const mockCarPlate = "SGX1001";

describe("clearLot", () => {
  it("should remove target carplate from parkingLotMem, freeup statusMem and return these obj.", () => {
    const response = clearLot.clearLot(
      mockCarPlate,
      mockparkingLotMem,
      mockStatusMem
    );
    expect(response.parkingLotMem).toEqual({
      SGX1234A: {
        type: "car",
        entryTimeStamp: 1613541902,
        allocated: "CarLot2",
      },
    });
    expect(response.statusMem).toEqual({
      car: {
        CarLot1: true,
        CarLot2: false,
        CarLot3: true,
      },
      motorcycle: {
        MotorcycleLot1: true,
        MotorcycleLot2: true,
        MotorcycleLot3: true,
        MotorcycleLot4: true,
      },
    });
  });
});
