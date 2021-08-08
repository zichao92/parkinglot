const buildVehicleSpace = require("./buildVehicleSpace");

const motorcycle = (allocatedSlots) => {
  return {
    motorcycle: buildVehicleSpace.buildVehicleSpace(
      "MotorcycleLot",
      allocatedSlots
    ),
  };
};

module.exports = motorcycle;
