const clearLot = (carPlate, parkingLotMem, statusMem) => {
  const targetType = parkingLotMem[carPlate].type
  const targetAllocation = parkingLotMem[carPlate].allocated
  statusMem[targetType][targetAllocation] = true
  delete parkingLotMem[carPlate]
  return {parkingLotMem, statusMem};
};
module.exports = { clearLot };