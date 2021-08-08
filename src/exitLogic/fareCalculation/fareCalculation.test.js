const fareCalculation = require("./fareCalculation");

const mockEntryTimeStamp = 1628300283317;
const mockExitTimeStamp = 1628306750639;
let dateNowSpy = jest.spyOn(Date, "now");
dateNowSpy.mockImplementation(() => mockExitTimeStamp);

describe("fareCalculation", () => {
  it("should the correct fare (4) for car.", async () => {
    const mockCarType = "car";
    const cost = fareCalculation.fareCalculation(
      mockEntryTimeStamp,
      mockCarType
    );
    expect(cost).toBe(4);
  });
  it("should the correct fare (2) for motorbike.", async () => {
    const mockCarType = "motorcycle";
    const cost = fareCalculation.fareCalculation(
      mockEntryTimeStamp,
      mockCarType
    );
    expect(cost).toBe(2);
  });
});
