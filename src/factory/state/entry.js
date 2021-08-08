const limitChecker = require("../../entryLogic/limitChecker/limitChecker");
const allocateLotFactory = require("../allocateLot/allocateLotFactory");

const entry = (params, limitMem, currentCapMem) => {
  const vehicleType = params[1];
  const carPlate = params[2];
  const timeStamp = params[3];
  console.log(JSON.stringify(currentCapMem))
  const allocatedNumber = currentCapMem[vehicleType] + 1;
  const limitCheckResponse = limitChecker.limitChecker(vehicleType, limitMem, currentCapMem);
  let message = ""
  let allocatedObj = {}
  if (limitCheckResponse){
    currentCapMem[vehicleType] += 1 // increase current parking status of vehicle by 1
    const allocateLotFn = allocateLotFactory(vehicleType);
    allocatedObj = allocateLotFn(carPlate, timeStamp, allocatedNumber);
    message = `Accept ${allocatedObj[carPlate].allocated}`
  } else {
    message = 'Reject'
    allocatedObj = null
  }

  return {message, currentCapMem, allocatedObj};
};

module.exports = { entry };

//{"SGX1001" : {type:"car" , timeStamp: 160000, allocated: "CarLot2"}}
