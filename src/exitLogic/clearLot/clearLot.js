const clearLot = (carType, assignedLot, mem) => {
  mem[carType][assignedLot] = null;
  return mem;
};
module.exports = { clearLot };