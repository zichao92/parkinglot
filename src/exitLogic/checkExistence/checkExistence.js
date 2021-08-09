// Checks if vehicle exists in parkingLotMem, we dont want phatom vehicles
const checkExistence = (carPlate, parkingLotMem) =>{
  return (carPlate in parkingLotMem)
}

module.exports = { checkExistence }