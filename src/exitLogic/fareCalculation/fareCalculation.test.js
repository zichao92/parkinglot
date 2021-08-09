const fareCalculation = require('./fareCalculation');

describe('fareCalculation', () => {
  it('should the correct fare (6) for car.', () => {
    const mockEntryTimeStamp = '1628403819';
    const mockExitTimeStamp = '1628413854';
    const mockCarType = 'car';
    const response = fareCalculation.fareCalculation(
      mockEntryTimeStamp,
      mockExitTimeStamp,
      mockCarType,
    );
    expect(response.success).toBeTruthy();
    expect(response.cost).toBe(6);
  });
  it('should the correct fare (3) for motorbike.', () => {
    const mockEntryTimeStamp = '1628403819';
    const mockExitTimeStamp = '1628413854';
    const mockCarType = 'motorcycle';
    const response = fareCalculation.fareCalculation(
      mockEntryTimeStamp,
      mockExitTimeStamp,
      mockCarType,
    );
    expect(response.success).toBeTruthy();
    expect(response.cost).toBe(3);
  });
  it('should return with a failure and cost is 0 since entryTime is greater than exitTime.', () => {
    const mockEntryTimeStamp = '1628413854';
    const mockExitTimeStamp = '1628403819';
    const mockCarType = 'motorcycle';
    const response = fareCalculation.fareCalculation(
      mockEntryTimeStamp,
      mockExitTimeStamp,
      mockCarType,
    );
    expect(response.success).toBeFalsy();
    expect(response.cost).toBe(0);
  });
});
