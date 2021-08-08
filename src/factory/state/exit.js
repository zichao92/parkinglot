const clearLot = require("../../exitLogic/clearLot/clearLot")
const fareCalculation = require("../../exitLogic/fareCalculation/fareCalculation")
const exit = (params, mem) =>{
  const carPlate = params[1];
  const exitTimeStamp = params[2];
  const car = Object.keys(mem.car).find(key => mem.car[key] === carPlate);
  const motorcycle = Object.keys(mem.motorcycle).find(key => mem.motorcycle[key] === carPlate);
  if (!car && !motorcycle){
    return {message: "Vehicle Not found!" , mem}
  }
  const vehicleType = car ? car : motorcycle
}

module.exports = {exit}