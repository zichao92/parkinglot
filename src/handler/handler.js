const fs = require("fs");
const readline = require("readline");
const initMem = require("../init/initMem");
const actionFactory = require("../factory/action/actionFactory");

const handler = async(filename) => {
  let statusMem = {};
  let currentCapMem = {};
  let limitMem = {};
  let parkingLotMem = {};
  const rl = readline.createInterface({
    input: fs.createReadStream(`${filename}`),
    crlfDelay: Infinity,
  });
  let indexCounter = 0;
  for await (const line of rl) {
    const statements = line.split(" ");
    if (indexCounter === 0) {
      let memObject = initMem.initMem(statements);
      limitMem = memObject.limitMem;
      statusMem = memObject.statusMem;
      currentCapMem = memObject.currentCapMem;
    } else {
      const actionFn = actionFactory(statements[0].toLowerCase());
      const actionObj = actionFn(
        statements,
        limitMem,
        currentCapMem,
        parkingLotMem,
        statusMem
      );
      const message = actionObj.message;
      currentCapMem = actionObj.currentCapMem;
      parkingLotMem = actionObj.parkingLotMem;
      statusMem = actionObj.statusMem;
      console.log(message);
    }
    indexCounter++;
  }
};

module.exports = { handler };
