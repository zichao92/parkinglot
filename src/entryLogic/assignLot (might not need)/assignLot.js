const assignLot = (vehicleType, carPlate, assignedLot, timeStamp, mem) => {
  mem[vehicleType][assignedLot] = { carPlate, timeStamp };
  return mem;
};
module.exports = { assignLot };

// 1. allocationMem = {"SGX1000" : {type:"car" , timeStamp: 160000, allocated: "CarLot1"}}