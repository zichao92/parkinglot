const initMem = require("./initMem");
const buildInitStatusMem = require("../helper/buildInitStatusMem");

let buildInitStatusMemSpy = jest.spyOn(
  buildInitStatusMem,
  "buildInitStatusMem"
);

const mockStatusMem = {
  car: {
    CarLot1: true,
    CarLot2: true,
    CarLot3: true,
    CarLot4: true,
    CarLot5: true,
  },
  motorcycle: {
    MotorcycleLot1: true,
    MotorcycleLot2: true,
  },
};

describe("initMem", () => {
  it("should return statusMem & limtMem object.", () => {
    let array = ["5", "2"];
    buildInitStatusMemSpy.mockImplementation(() => {
      return mockStatusMem;
    });
    const response = initMem.initMem(array);
    expect(buildInitStatusMemSpy).toHaveBeenCalledTimes(2);
    expect(response.limitMem).toEqual({
      car: "5",
      motorcycle: "2",
    });
    expect(response.statusMem).toEqual(mockStatusMem);
    expect(response.currentCapMem).toEqual({ car: 0, motorcycle: 0 });
  });
});
