// Checks if vehicle type is part of limitMem
const validVehicle = (vehicleType, limitMem) => (vehicleType in limitMem);

module.exports = { validVehicle };
