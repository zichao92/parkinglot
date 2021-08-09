const enter = require('./enter');
const allocateObjIndex = require('../allocateObj/allocateObjndex');
const validVehicle = require('../../entryLogic/validVehicle/validVehicle');
const limitChecker = require('../../entryLogic/limitChecker/limitChecker');
const findAvailableLot = require('../../entryLogic/findLot/findAvailableLot');

const limitCheckerSpy = jest.spyOn(limitChecker, 'limitChecker');
const findAvailableLotSpy = jest.spyOn(findAvailableLot, 'findAvailableLot');
const validVehicleSpy = jest.spyOn(validVehicle, 'validVehicle');
const carSpy = jest.spyOn(allocateObjIndex, 'car');
const mockLimit = { car: 3, motorcycle: 4 };
const mockCarObj = {
  SGX1234A: { type: 'car', entryTimeStamp: 1613541902, allocated: 'CarLot2' },
};
const mockParkingLotMem = {
  SGX1001: {
    type: 'car',
    entryTimeStamp: 160000,
    allocated: 'CarLot1',
  },
};

afterEach(() => {
  limitCheckerSpy.mockReset();
  findAvailableLotSpy.mockReset();
  validVehicleSpy.mockReset();
});

describe('entry', () => {
  it('should an object that contains Accept as message, updated currentCapMem and an assigned allocatedObj', () => {
    const mockParams = ['Enter', 'car', 'SGX1234A', '1613541902'];
    const mockCurrentCapMem = { car: 1, motorcycle: 0 };
    const mockStatusMem = {
      car: {
        CarLot1: false,
        CarLot2: true,
        CarLot3: true,
      },
      motorcycle: {
        MotorcycleLot1: true,
        MotorcycleLot2: true,
        MotorcycleLot3: true,
        MotorcycleLot4: true,
      },
    };
    validVehicleSpy.mockImplementation(() => true);
    limitCheckerSpy.mockImplementation(() => true);
    findAvailableLotSpy.mockImplementation(() => 'CarLot2');
    carSpy.mockImplementation(() => mockCarObj);
    const response = enter(
      mockParams,
      mockLimit,
      mockCurrentCapMem,
      mockParkingLotMem,
      mockStatusMem,
    );
    expect(validVehicleSpy).toBeCalledWith('car', mockLimit);
    expect(limitCheckerSpy).toBeCalledWith('car', mockLimit, mockCurrentCapMem);
    expect(carSpy).toBeCalledWith('SGX1234A', '1613541902', 'CarLot2');
    expect(response.message).toBe('Accept CarLot2');
    expect(response.currentCapMem).toEqual({ car: 2, motorcycle: 0 });
    expect(response.parkingLotMem).toEqual({
      SGX1001: {
        type: 'car',
        entryTimeStamp: 160000,
        allocated: 'CarLot1',
      },
      SGX1234A: {
        type: 'car',
        entryTimeStamp: 1613541902,
        allocated: 'CarLot2',
      },
    });
    expect(response.statusMem).toEqual({
      car: {
        CarLot1: false,
        CarLot2: false,
        CarLot3: true,
      },
      motorcycle: {
        MotorcycleLot1: true,
        MotorcycleLot2: true,
        MotorcycleLot3: true,
        MotorcycleLot4: true,
      },
    });
  });
  it('should return an object that contains Reject message, same currentCapMem and null as allocatedObj', () => {
    const mockParams = ['Enter', 'car', 'SGX1234A', '1613541902'];
    const mockCurrentCapMem = { car: 3, motorcycle: 0 };
    const mockStatusMem = {
      car: {
        CarLot1: false,
        CarLot2: false,
        CarLot3: false,
      },
      motorcycle: {
        MotorcycleLot1: true,
        MotorcycleLot2: true,
        MotorcycleLot3: true,
        MotorcycleLot4: true,
      },
    };
    limitCheckerSpy.mockImplementation(() => false);
    validVehicleSpy.mockImplementation(() => true);
    carSpy.mockImplementation(() => mockCarObj);
    const response = enter(
      mockParams,
      mockLimit,
      mockCurrentCapMem,
      mockParkingLotMem,
      mockStatusMem,
    );
    expect(validVehicleSpy).toBeCalledWith('car', mockLimit);
    expect(limitCheckerSpy).toBeCalledWith('car', mockLimit, mockCurrentCapMem);
    expect(response.message).toBe('Reject');
    expect(response.currentCapMem).toEqual({ car: 3, motorcycle: 0 });
    expect(response.parkingLotMem).toEqual(mockParkingLotMem);
    expect(response.statusMem).toEqual(mockStatusMem);
  });
  it('should return a message stating that entering vehicle isnt a supported type', () => {
    const mockParams = ['Enter', 'NDPTank', 'SGX1234A', '1613541902'];
    const mockCurrentCapMem = { car: 3, motorcycle: 0 };
    const mockStatusMem = {
      car: {
        CarLot1: false,
        CarLot2: false,
        CarLot3: false,
      },
      motorcycle: {
        MotorcycleLot1: true,
        MotorcycleLot2: true,
        MotorcycleLot3: true,
        MotorcycleLot4: true,
      },
    };
    const response = enter(
      mockParams,
      mockLimit,
      mockCurrentCapMem,
      mockParkingLotMem,
      mockStatusMem,
    );
    expect(response.message).toBe('NDPTank isnt a supported vehicle by our carpark. Please try somewhere else! Thanks');
    expect(response.currentCapMem).toEqual({ car: 3, motorcycle: 0 });
    expect(response.parkingLotMem).toEqual(mockParkingLotMem);
    expect(response.statusMem).toEqual(mockStatusMem);
  });
});
