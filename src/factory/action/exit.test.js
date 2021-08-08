const exit = require("./exit");
const clearLot = require("../../exitLogic/clearLot/clearLot");
const fareCalculation = require("../../exitLogic/fareCalculation/fareCalculation");

let clearLotspy = jest.spyOn(clearLot, "clearLot");
let fareCalculationSpy = jest.spyOn(fareCalculation, "fareCalculation");

const mockLimit = { car: 3, motorcycle: 4 };

const mockParams = ["Exit", "SGX1234A", "1613545602"];
const mockParkingLotMem = {
  SGX1234A: {
    type: "motorcycle",
    entryTimeStamp: "1613541902",
    allocated: "MotorcycleLot1",
  },
};

afterEach(() => {
  clearLotspy.mockReset();
  fareCalculationSpy.mockReset();
});

describe("exit", () => {
  it("should an object that contains Accept as message, updated currentCapMem and an assigned allocatedObj", () => {
    const mockCurrentCapMem = { car: 0, motorcycle: 1 };
    const mockStatusMem = {
      car: {
        CarLot1: false,
        CarLot2: true,
        CarLot3: true,
      },
      motorcycle: {
        MotorcycleLot1: true,
        MotorcycleLot2: true,
        MotorcycleLot3: true,
        MotorcycleLot4: true,
      },
    };
    clearLotspy.mockImplementation(() => {
      return {
        parkingLotMem: {},
        statusMem: mockStatusMem,
      };
    });
    fareCalculationSpy.mockImplementation(() => {
      return 2;
    });
    const response = exit(
      mockParams,
      mockLimit,
      mockCurrentCapMem,
      mockParkingLotMem,
      mockStatusMem
    );

    expect(fareCalculationSpy).toBeCalledWith("1613541902", "1613545602", "motorcycle");
    expect(clearLotspy).toBeCalledWith(
      "SGX1234A",
      mockParkingLotMem,
      mockStatusMem
    );
    expect(response.message).toBe("MotorcycleLot1 2");
    expect(response.currentCapMem).toEqual({ car: 0, motorcycle: 0 });
    expect(response.parkingLotMem).toEqual({});
    expect(response.statusMem).toEqual({
      car: {
        CarLot1: false,
        CarLot2: true,
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
