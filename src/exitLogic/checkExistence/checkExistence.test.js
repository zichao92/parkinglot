const checkExistence = require('./checkExistence');

const mockParkingLotMem = {
  SGX1001: {
    type: 'car',
    entryTimeStamp: 160000,
    allocated: 'CarLot1',
  },
};

describe('checkExistence', () => {
  it('should return true since vehicle exists.', () => {
    const mockCarPlate = 'SGX1001';
    const response = checkExistence.checkExistence(mockCarPlate, mockParkingLotMem);
    expect(response).toBeTruthy();
  });
  it('should return false since vehicle isnt found in parkingLotMem.', () => {
    const mockCarPlate = 'SG2000';
    const response = checkExistence.checkExistence(mockCarPlate, mockParkingLotMem);
    expect(response).toBeFalsy();
  });
});
