const handler = require("./handler");

const filename = "src/data/inputfile.txt"

describe("handler", () => {
  it("running the whole program", async() => {
    await handler.handler(filename)
  });
});
