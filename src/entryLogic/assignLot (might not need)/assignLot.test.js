const assignLot = require("./assignLot");

const mockCarType = "car";
const mockCarPlate = "C6L.SI";
const mockAssignedLot = "CarLot1"
const mockTimeStamp = 1628300283317
let dateNowSpy = jest.spyOn(Date, 'now');
dateNowSpy.mockImplementation(() => mockTimeStamp);

describe("assignLot", () => {
  it("should return object which contains the newly assigned lot details such as carplate & timestamp.", async () => {
    const mockMem = {
      motorcycle: {
        MotorcycleLot1: null,
        MotorcycleLot2: null,
        MotorcycleLot1: null,
      },
      car: { CarLot1: null, CarLot2: null, CarLot1: null },
    };
    const response = assignLot.assignLot(mockCarType, mockCarPlate, mockAssignedLot, mockTimeStamp, mockMem);
    const testObj = response[mockCarType][mockAssignedLot]
    expect(testObj.carPlate).toBe("C6L.SI");
    expect(testObj.timeStamp).toBe(1628300283317);
  });
});
