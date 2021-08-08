const enter = require("./enter");
const allocateObjIndex = require("../allocateObj/allocateObjndex");
const limitChecker = require("../../entryLogic/limitChecker/limitChecker");
const findAvailableLot = require("../../entryLogic/findLot/findAvailableLot");

let limitCheckerSpy = jest.spyOn(limitChecker, "limitChecker");
let findAvailableLotSpy = jest.spyOn(findAvailableLot, "findAvailableLot");
let carSpy = jest.spyOn(allocateObjIndex, "car");
const mockLimit = { car: 3, motorcycle: 4 };
const mockCarObj = {
  SGX1234A: { type: "car", entryTimeStamp: 1613541902, allocated: "CarLot2" },
};
const mockParams = ["Enter", "car", "SGX1234A", "1613541902"];
const mockParkingLotMem = {
  SGX1001: {
    type: "car",
    entryTimeStamp: 160000,
    allocated: "CarLot1",
  },
};

afterEach(() => {
  limitCheckerSpy.mockReset();
  findAvailableLotSpy.mockReset();
});

describe("entry", () => {
  it("should an object that contains Accept as message, updated currentCapMem and an assigned allocatedObj", () => {
    const mockCurrentCapMem = { car: 1, motorcycle: 0 };
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
    limitCheckerSpy.mockImplementation(() => {
      return true;
    });
    findAvailableLotSpy.mockImplementation(() => {
      return "CarLot2";
    });
    carSpy.mockImplementation(() => mockCarObj);
    const response = enter(
      mockParams,
      mockLimit,
      mockCurrentCapMem,
      mockParkingLotMem,
      mockStatusMem
    );
    expect(limitCheckerSpy).toBeCalledWith("car", mockLimit, mockCurrentCapMem);
    expect(carSpy).toBeCalledWith("SGX1234A", "1613541902", "CarLot2");
    expect(response.message).toBe("Accept CarLot2");
    expect(response.currentCapMem).toEqual({ car: 2, motorcycle: 0 });
    expect(response.parkingLotMem).toEqual({
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
    });
    expect(response.statusMem).toEqual({
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
    });
  });
});
it("should return an object that contains Reject message, same currentCapMem and null as allocatedObj", () => {
  const mockCurrentCapMem = { car: 3, motorcycle: 0 };
  const mockStatusMem = {
    car: {
      CarLot1: false,
      CarLot2: false,
      CarLot3: false,
    },
    motorcycle: {
      MotorcycleLot1: true,
      MotorcycleLot2: true,
      MotorcycleLot3: true,
      MotorcycleLot4: true,
    },
  };
  limitCheckerSpy.mockImplementation(() => {
    return false;
  });
  carSpy.mockImplementation(() => mockCarObj);
  const response = enter(
    mockParams,
    mockLimit,
    mockCurrentCapMem,
    mockParkingLotMem,
    mockStatusMem
  );
  expect(limitCheckerSpy).toBeCalledWith("car", mockLimit, mockCurrentCapMem);
  expect(response.message).toBe("Reject");
  expect(response.currentCapMem).toEqual({ car: 3, motorcycle: 0 });
  expect(response.parkingLotMem).toEqual(mockParkingLotMem);
  expect(response.statusMem).toEqual(mockStatusMem);
});
