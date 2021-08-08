const limitChecker = require("./limitChecker");
const mockCarType = "car";

describe("assignLot", () => {
  it("should return true since limit is not exceeded.", async () => {
    const mockLimit = { car: 3, motorcycle: 4 };
    const mockCurrentCapMem = { car: 2, motorcycle: 0 };
    const response = limitChecker.limitChecker(mockCarType, mockLimit, mockCurrentCapMem);
    expect(response).toBeTruthy();
  });
  it("should return false since limit is exceeded.", async () => {
    const mockLimit = { car: 3, motorcycle: 4 };
    const mockCurrentCapMem = { car: 3, motorcycle: 0 };
    const response = limitChecker.limitChecker(mockCarType, mockLimit, mockCurrentCapMem);
    expect(response).toBeFalsy();
  });
});
