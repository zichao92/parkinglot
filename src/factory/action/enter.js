const limitChecker = require('../../entryLogic/limitChecker/limitChecker');
const validVehicle = require('../../entryLogic/validVehicle/validVehicle');
const allocateObjFactory = require('../allocateObj/allocateObjFactory');
const findAvailableLot = require('../../entryLogic/findLot/findAvailableLot');

const enter = (params, limitMem, currentCapMem, parkingLotMem, statusMem) => {
  const newCurrentCapMem = currentCapMem;
  let newParkingLotMem = parkingLotMem;
  const newStatusMem = statusMem;
  const vehicleType = params[1];
  const carPlate = params[2];
  const timeStamp = params[3];
  let message = '';
  const validCheckResponse = validVehicle.validVehicle(vehicleType, limitMem);
  if (!validCheckResponse) {
    message = `${vehicleType} isnt a supported vehicle by our carpark. Please try somewhere else! Thanks`;
    return {
      message,
      currentCapMem,
      parkingLotMem,
      statusMem,
    };
  }
  const limitCheckResponse = limitChecker.limitChecker(
    vehicleType,
    limitMem,
    newCurrentCapMem,
  );
  let allocatedObj = {};
  if (limitCheckResponse) {
    newCurrentCapMem[vehicleType] += 1; // increase current parking status of vehicle by 1
    const allocatedLot = findAvailableLot.findAvailableLot(
      vehicleType,
      newStatusMem,
    );
    newStatusMem[vehicleType][allocatedLot] = false; // updates occupy status on statusMem
    const allocateObjtFn = allocateObjFactory(vehicleType);
    allocatedObj = allocateObjtFn(carPlate, timeStamp, allocatedLot);
    newParkingLotMem = { ...newParkingLotMem, ...allocatedObj };
    message = `Accept ${allocatedObj[carPlate].allocated}`;
  } else {
    message = 'Reject';
    allocatedObj = null;
  }

  return {
    message,
    currentCapMem: newCurrentCapMem,
    parkingLotMem: newParkingLotMem,
    statusMem: newStatusMem,
  };
};

module.exports = enter;
