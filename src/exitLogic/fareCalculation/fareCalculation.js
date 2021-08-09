const fareCalculation = (entryTimeStamp, exitTimeStamp, carType) => {
  if (entryTimeStamp > exitTimeStamp) {
    return { cost: 0, success: false };
  }
  const rates = {
    car: 2,
    motorcycle: 1,
  };
  const hourDifference = Math.ceil(
    Math.abs(exitTimeStamp - entryTimeStamp) / 36e2,
  );
  const cost = hourDifference * rates[carType];
  return { cost, success: true };
};
module.exports = { fareCalculation };
