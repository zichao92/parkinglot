const clearLot = (carPlate, parkingLotMem, statusMem) => {
  const newStatusMem = statusMem;
  const newParkingLotMem = parkingLotMem;
  const targetType = newParkingLotMem[carPlate].type;
  const targetAllocation = newParkingLotMem[carPlate].allocated;
  newStatusMem[targetType][targetAllocation] = true;
  delete newParkingLotMem[carPlate];
  return { parkingLotMem: newParkingLotMem, statusMem: newStatusMem };
};
module.exports = { clearLot };
