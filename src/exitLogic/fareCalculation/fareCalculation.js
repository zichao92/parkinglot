const fareCalculation = (entryTimeStamp, exitTimeStamp, carType) => {
  const rates = {
    car: 2,
    motorcycle: 1,
  };
  const hourDifference = Math.round(
    Math.abs(exitTimeStamp - entryTimeStamp) / 36e2
  );
  const cost = hourDifference * rates[carType];
  return cost
};
module.exports = { fareCalculation };
