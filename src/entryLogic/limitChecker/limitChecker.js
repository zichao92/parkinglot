const limitChecker = (vehicleType, limitMem, currentCapMem) => limitMem[vehicleType] > currentCapMem[vehicleType];
module.exports = { limitChecker };
// 1. Should check limitMem against currentCapMem
// 2. If target vehicle limitMem is greater or equals to vehicle currentCapMem, reject
// 3. If target vehicle limitMem is lesser than vehicle currentCapMem, accept
