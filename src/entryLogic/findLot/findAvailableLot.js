const findAvailableLot = (vehicleType, statusMem) => {
  const targetTypeObj = statusMem[vehicleType];
  const foundLot = Object.keys(targetTypeObj).find((key) => targetTypeObj[key] === true);
  return foundLot;
};
module.exports = { findAvailableLot };

// finds earliest empty lot & return the key
