const validVehicle = require("./validVehicle");
const mockCarType1 = "UFO";
const mockCarType2 = "car";

describe("validVehicle", () => {
  it("should return false since UFO isnt part of limitMem.", () => {
    const mocklimitMem = { car: 3, motorcycle: 4 };
    const response = validVehicle.validVehicle(mockCarType1, mocklimitMem);
    expect(response).toBeFalsy();
  });
  it("should return true since car is part of limitMem.", () => {
    const mocklimitMem = { car: 3, motorcycle: 4 };
    const response = validVehicle.validVehicle(mockCarType2, mocklimitMem);
    expect(response).toBeTruthy();
  });
});
