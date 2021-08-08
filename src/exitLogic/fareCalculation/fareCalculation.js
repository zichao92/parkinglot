const fareCalculation = (entryTimeStamp, carType) => {
  const exitTimeStamp = Date.now();
  const rates = {
    car: 2,
    motorcycle: 1,
  };
  const hourDifference = Math.round(
    Math.abs(exitTimeStamp - entryTimeStamp) / 36e5
  );
  const cost = hourDifference * rates[carType];
  return cost
};
module.exports = { fareCalculation };
