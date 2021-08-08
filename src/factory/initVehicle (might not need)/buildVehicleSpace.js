const buildVehicleSpace = (vehicleType, vehicleSlots) => {
  const vehicleObj = {};
  const arrayObj = [...Array(parseInt(vehicleSlots)).keys()]
  arrayObj.forEach((lotNumber) => {
    const objKey = vehicleType + (lotNumber + 1);
    vehicleObj[objKey] = null;
  });
  return vehicleObj;
};

module.exports = { buildVehicleSpace }