const car = (carPlate, timeStamp, allocatedNumber) => {
  const carObj = {
    [carPlate]: {
      type: "car",
      entryTimeStamp: timeStamp,
      allocated: `CarLot${allocatedNumber}`,
    },
  };
  return carObj;
};

module.exports = car;
