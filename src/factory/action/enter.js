const limitChecker = require("../../entryLogic/limitChecker/limitChecker");
const allocateObjFactory = require("../allocateObj/allocateObjFactory");
const findAvailableLot = require("../../entryLogic/findLot/findAvailableLot")

const enter = (params, limitMem, currentCapMem, parkingLotMem, statusMem) => {
  const vehicleType = params[1];
  const carPlate = params[2];
  const timeStamp = params[3];
  const limitCheckResponse = limitChecker.limitChecker(vehicleType, limitMem, currentCapMem);
  let message = ""
  let allocatedObj = {}
  if (limitCheckResponse){
    currentCapMem[vehicleType] += 1 // increase current parking status of vehicle by 1
    const allocatedLot = findAvailableLot.findAvailableLot(vehicleType, statusMem);
    statusMem[vehicleType][allocatedLot] = false // updates occupy status on statusMem
    const allocateObjtFn = allocateObjFactory(vehicleType);
    allocatedObj = allocateObjtFn(carPlate, timeStamp, allocatedLot);
    parkingLotMem = {...parkingLotMem, ...allocatedObj}
    message = `Accept ${allocatedObj[carPlate].allocated}`
  } else {
    message = 'Reject'
    allocatedObj = null
  }

  return {message, currentCapMem, parkingLotMem, statusMem};
};

module.exports = enter;
