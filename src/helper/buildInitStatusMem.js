const buildInitStatusMem = (vehicleLimitObj) => {
  const vehicleObj = {};
  const vehicleType = Object.keys(vehicleLimitObj)[0];
  const vehicleSlots = vehicleLimitObj[vehicleType];
  const arrayObj = [...Array(parseInt(vehicleSlots, 10)).keys()];
  arrayObj.forEach((lotNumber) => {
    const objKey = `${vehicleType}Lot${lotNumber + 1}`;
    vehicleObj[objKey] = true;
  });
  return { [vehicleType.toLowerCase()]: vehicleObj };
};

module.exports = { buildInitStatusMem };
