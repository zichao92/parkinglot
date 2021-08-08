const clearLot = require("../../exitLogic/clearLot/clearLot");
const fareCalculation = require("../../exitLogic/fareCalculation/fareCalculation");

const exit = (params, limitMem, currentCapMem, parkingLotMem, statusMem) => {
  const carPlate = params[1];
  const exitTimeStamp = params[2];
  const vehicleType = parkingLotMem[carPlate].type;
  const targetAllocation = parkingLotMem[carPlate].allocated;
  const entryTimeStamp = parkingLotMem[carPlate].entryTimeStamp;
  const cost = fareCalculation.fareCalculation(entryTimeStamp, exitTimeStamp, vehicleType);
  const response = clearLot.clearLot(carPlate, parkingLotMem, statusMem);
  currentCapMem[vehicleType] -= 1;
  const message = `${targetAllocation} ${cost}`;
  return {
    message,
    currentCapMem,
    parkingLotMem: response.parkingLotMem,
    statusMem: response.statusMem,
  };
};

module.exports = exit;
