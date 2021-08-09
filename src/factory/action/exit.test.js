const exit = require("./exit");
const clearLot = require("../../exitLogic/clearLot/clearLot");
const fareCalculation = require("../../exitLogic/fareCalculation/fareCalculation");
const checkExistence = require("../../exitLogic/checkExistence/checkExistence")

let clearLotspy = jest.spyOn(clearLot, "clearLot");
let fareCalculationSpy = jest.spyOn(fareCalculation, "fareCalculation");
let checkExistencSpy = jest.spyOn(checkExistence, "checkExistence");
const mockLimit = { car: 3, motorcycle: 4 };

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
  checkExistencSpy.mockReset();
});

describe("exit", () => {
  it("should an object that contains Accept as message, updated currentCapMem and an assigned allocatedObj", () => {
    const mockParams = ["Exit", "SGX1234A", "1613545602"];
    const mockCurrentCapMem = { car: 0, motorcycle: 1 };
    const mockStatusMem = {
      car: {
        CarLot1: false,
        CarLot2: true,
        CarLot3: true,
      },
      motorcycle: {
        MotorcycleLot1: false,
        MotorcycleLot2: true,
        MotorcycleLot3: true,
        MotorcycleLot4: true,
      },
    };
    checkExistencSpy.mockImplementation(()=>{return true})
    clearLotspy.mockImplementation(() => {
      return {
        parkingLotMem: {},
        statusMem:  {
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
        },
      };
    });
    fareCalculationSpy.mockImplementation(() => {
      return {cost:2, success:true};
    });
    const response = exit(
      mockParams,
      mockLimit,
      mockCurrentCapMem,
      mockParkingLotMem,
      mockStatusMem
    );
    expect(checkExistencSpy).toBeCalledWith("SGX1234A", mockParkingLotMem);
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
  it("should warn the driver about cost calculation issue", () => {
    const mockParams = ["Exit", "SGX1234A", "1612540902"];
    const mockCurrentCapMem = { car: 0, motorcycle: 1 };
    const mockStatusMem = {
      car: {
        CarLot1: false,
        CarLot2: true,
        CarLot3: true,
      },
      motorcycle: {
        MotorcycleLot1: false,
        MotorcycleLot2: true,
        MotorcycleLot3: true,
        MotorcycleLot4: true,
      },
    };
    checkExistencSpy.mockImplementation(()=>{return true})
    fareCalculationSpy.mockImplementation(() => {
      return {cost:0, success:false};
    });
    const response = exit(
      mockParams,
      mockLimit,
      mockCurrentCapMem,
      mockParkingLotMem,
      mockStatusMem
    );
    expect(checkExistencSpy).toBeCalledWith("SGX1234A", mockParkingLotMem);
    expect(fareCalculationSpy).toBeCalledWith("1613541902", "1612540902", "motorcycle");
    expect(response.message).toBe("Something went wrong with the cost calculation. Please call the carpark staff @999 for assistance!");
    expect(response.currentCapMem).toEqual({ car: 0, motorcycle: 1 });
    expect(response.parkingLotMem).toEqual(mockParkingLotMem);
    expect(response.statusMem).toEqual(mockStatusMem)
  });
  it("should warn the driver that the exiting vehicle isnt found", () => {
    const mockParams = ["Exit", "SGX1111A", "1612540902"];
    const mockCurrentCapMem = { car: 0, motorcycle: 1 };
    const mockStatusMem = {
      car: {
        CarLot1: false,
        CarLot2: true,
        CarLot3: true,
      },
      motorcycle: {
        MotorcycleLot1: false,
        MotorcycleLot2: true,
        MotorcycleLot3: true,
        MotorcycleLot4: true,
      },
    };
    checkExistencSpy.mockImplementation(()=>{return false})
    fareCalculationSpy.mockImplementation(() => {
      return {cost:0, success:false};
    });
    const response = exit(
      mockParams,
      mockLimit,
      mockCurrentCapMem,
      mockParkingLotMem,
      mockStatusMem
    );
    expect(checkExistencSpy).toBeCalledWith("SGX1111A", mockParkingLotMem);
    expect(response.message).toBe("We cannot find your vehicle in our records! Please stay put, gonna call ghostbusters to catch phatom driver!");
    expect(response.currentCapMem).toEqual({ car: 0, motorcycle: 1 });
    expect(response.parkingLotMem).toEqual(mockParkingLotMem);
    expect(response.statusMem).toEqual(mockStatusMem)
  });
});
