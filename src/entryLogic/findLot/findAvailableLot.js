const findAvailableLot = (vehicleType, statusMem) => {
  const targetTypeObj = statusMem[vehicleType];
  for (let key in targetTypeObj) {
    if (targetTypeObj[key]) {return key};
  }
};
module.exports = { findAvailableLot };

//finds earliest empty lot & return the key
