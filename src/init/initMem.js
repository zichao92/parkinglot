const buildInitStatusMem = require('../helper/buildInitStatusMem');

const initMem = (numberArray) => {
  let statusMem = {};
  const limitMem = { car: numberArray[0], motorcycle: numberArray[1] };
  const currentCapMem = { car: 0, motorcycle: 0 };
  const vehicleArray = [
    { Car: numberArray[0] },
    { Motorcycle: numberArray[1] },
  ];
  vehicleArray.forEach((vehicle) => {
    const vehicleStatusObj = buildInitStatusMem.buildInitStatusMem(vehicle);
    statusMem = { ...vehicleStatusObj, ...statusMem };
  });
  return { limitMem, statusMem, currentCapMem };
};

module.exports = { initMem };
