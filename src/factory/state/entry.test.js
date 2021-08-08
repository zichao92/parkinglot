const entry = require("./entry");
const allocateLotIndex = require("../allocateLot/allocateLotIndex");
const limitChecker = require("../../entryLogic/limitChecker/limitChecker");

let limitCheckerSpy = jest.spyOn(limitChecker, "limitChecker");
let carSpy = jest.spyOn(allocateLotIndex, "car");
const mockLimit = { car: 3, motorcycle: 4 };
const mockCarObj = {
  SGX1234A: { type: "car", timeStamp: 1613541902, allocated: "CarLot2" },
};
const mockParams = ["Enter", "car", "SGX1234A", "1613541902"];
afterEach(() => {
  limitCheckerSpy.mockReset();
});

describe("entry", () => {
  it("should an object that contains Accept as message, updated currentCapMem and an assigned allocatedObj", () => {
    const mockCurrentCapMem = { car: 1, motorcycle: 0 };
    limitCheckerSpy.mockImplementation(() => {
      return true;
    });
    carSpy.mockImplementation(() => mockCarObj);
    const response = entry.entry(mockParams, mockLimit, mockCurrentCapMem);
    expect(limitCheckerSpy).toBeCalledWith("car", mockLimit, mockCurrentCapMem);
    expect(carSpy).toBeCalledWith("SGX1234A", "1613541902", 2);
    expect(response.message).toBe("Accept CarLot2");
    expect(response.currentCapMem).toEqual({ car: 2, motorcycle: 0 });
  });
  it("should an object that contains Reject message, same currentCapMem and null as allocatedObj", () => {
    const mockCurrentCapMem = { car: 3, motorcycle: 0 };
    limitCheckerSpy.mockImplementation(() => {
      return false;
    });
    carSpy.mockImplementation(() => mockCarObj);
    const response = entry.entry(mockParams, mockLimit, mockCurrentCapMem);
    expect(limitCheckerSpy).toBeCalledWith("car", mockLimit, mockCurrentCapMem);
    expect(response.message).toBe("Reject");
    expect(response.currentCapMem).toEqual({ car: 3, motorcycle: 0 });
  });
});
