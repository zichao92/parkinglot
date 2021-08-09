const car = (carPlate, timeStamp, allocated) => {
  const carObj = {
    [carPlate]: {
      type: 'car',
      entryTimeStamp: timeStamp,
      allocated,
    },
  };
  return carObj;
};

module.exports = car;
