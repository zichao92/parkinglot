const clearLot = require('../../exitLogic/clearLot/clearLot');
const fareCalculation = require('../../exitLogic/fareCalculation/fareCalculation');
const checkExistence = require('../../exitLogic/checkExistence/checkExistence');

const exit = (params, limitMem, currentCapMem, parkingLotMem, statusMem) => {
  const newCurrentCapMem = currentCapMem;
  let message = '';
  const carPlate = params[1];
  const exitTimeStamp = params[2];
  const checkExistenceResponse = checkExistence.checkExistence(carPlate, parkingLotMem);
  if (!checkExistenceResponse) {
    message = 'We cannot find your vehicle in our records! Please stay put, gonna call ghostbusters to catch phatom driver!';
    return {
      message,
      currentCapMem,
      parkingLotMem,
      statusMem,
    };
  }
  const vehicleType = parkingLotMem[carPlate].type;
  const targetAllocation = parkingLotMem[carPlate].allocated;
  const { entryTimeStamp } = parkingLotMem[carPlate];
  const costResponse = fareCalculation.fareCalculation(
    entryTimeStamp,
    exitTimeStamp,
    vehicleType,
  );
  if (!costResponse.success) {
    message = 'Something went wrong with the cost calculation. Please call the carpark staff @999 for assistance!';
    return {
      message,
      currentCapMem,
      parkingLotMem,
      statusMem,
    };
  }
  const response = clearLot.clearLot(carPlate, parkingLotMem, statusMem);
  newCurrentCapMem[vehicleType] -= 1;
  message = `${targetAllocation} ${costResponse.cost}`;
  return {
    message,
    currentCapMem: newCurrentCapMem,
    parkingLotMem: response.parkingLotMem,
    statusMem: response.statusMem,
  };
};

module.exports = exit;
