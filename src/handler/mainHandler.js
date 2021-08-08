const fs = require("fs");
const readline = require("readline");

const mainHandler = (filename) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(`${filename}`),
    crlfDelay: Infinity,
  });
  const indexCount = ((i = 0) => () => ++i)();
  rl.on("line", (line, lineIndex = indexCount()) => {
    if (lineIndex === 1) {
      let mem = initMem()
    } else {
      const statements = line.split(" ")

    }
  });
  console.log();
};

module.exports = { mainHandler };
