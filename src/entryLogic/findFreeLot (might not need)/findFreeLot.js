const findFreeLot = (vehicleType, mem) => {
  const vehiclePack = mem[vehicleType];
  const response = Object.keys(vehiclePack).find(
    (key) => vehiclePack[key] === null
  );
  const assignedLot = response ? response : null;
  return assignedLot;
};
module.exports = {
  findFreeLot,
};

// 1. get carType
// 2. Checks memory
// 3. returns results
// 4. mem =