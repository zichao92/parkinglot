const fareCalculation = require("./fareCalculation");

const mockEntryTimeStamp = "1628403819";
const mockExitTimeStamp = "1628413854";

describe("fareCalculation", () => {
  it("should the correct fare (6) for car.", () => {
    const mockCarType = "car";
    const cost = fareCalculation.fareCalculation(
      mockEntryTimeStamp,
      mockExitTimeStamp,
      mockCarType
    );
    expect(cost).toBe(6);
  });
  it("should the correct fare (3) for motorbike.", () => {
    const mockCarType = "motorcycle";
    const cost = fareCalculation.fareCalculation(
      mockEntryTimeStamp,
      mockExitTimeStamp,
      mockCarType
    );
    expect(cost).toBe(3);
  });
});
