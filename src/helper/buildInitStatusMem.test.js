const buildInitStatusMem = require('./buildInitStatusMem');

describe('buildInitStatusMem', () => {
  it('should return statusMem object based on incoming array message.', () => {
    let statusMem = {};
    const vehicleArray = [{ Car: 3 }, { Motorcycle: 4 }];
    vehicleArray.forEach((vehicle) => {
      const vehicleStatusObj = buildInitStatusMem.buildInitStatusMem(vehicle);
      statusMem = { ...vehicleStatusObj, ...statusMem };
    });
    expect(statusMem.car).toEqual({
      CarLot1: true,
      CarLot2: true,
      CarLot3: true,
    });
    expect(statusMem.motorcycle).toEqual({
      MotorcycleLot1: true,
      MotorcycleLot2: true,
      MotorcycleLot3: true,
      MotorcycleLot4: true,
    });
  });
});
