const buildVehicleSpace = require("./buildVehicleSpace");

const car = (allocatedSlots) => {
  return { car: buildVehicleSpace.buildVehicleSpace("CarLot", allocatedSlots) };
};

module.exports = car;
