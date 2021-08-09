const motorcycle = (carPlate, timeStamp, allocated) => {
  const carObj = {
    [carPlate]: {
      type: 'motorcycle',
      entryTimeStamp: timeStamp,
      allocated,
    },
  };
  return carObj;
};

module.exports = motorcycle;
