const motorcycle = (carPlate, timeStamp, allocatedNumber) => {
  const carObj = {
    [carPlate]: {
      type: "motorcycle",
      entryTimeStamp: timeStamp,
      allocated: `MotorcycleLot${allocatedNumber}`,
    },
  };
  return carObj;
};

module.exports = motorcycle;
