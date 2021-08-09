const handler = require("./handler");

describe("handler", () => {
  it("running the whole program on data1", async () => {
    const filename = "src/data/inputfile.txt";
    const arrayMessages = await handler.handler(filename);
    expect(arrayMessages[0]).toBe("Accept MotorcycleLot1");
    expect(arrayMessages[1]).toBe("Accept CarLot1");
    expect(arrayMessages[2]).toBe("MotorcycleLot1 2");
    expect(arrayMessages[3]).toBe("Accept CarLot2");
    expect(arrayMessages[4]).toBe("Accept CarLot3");
    expect(arrayMessages[5]).toBe("Reject");
    expect(arrayMessages[6]).toBe("CarLot3 6");
  });
  it("running the whole program on data2", async () => {
    const filename = "src/data/inputfile2.txt";
    const arrayMessages = await handler.handler(filename);
    expect(arrayMessages[0]).toBe("Reject");
    expect(arrayMessages[1]).toBe("Reject");
    expect(arrayMessages[2]).toBe("Reject");
    expect(arrayMessages[3]).toBe("Reject");
    expect(arrayMessages[4]).toBe("Reject");
    expect(arrayMessages[5]).toBe("Reject");
  });
  it("running the whole program on data3", async () => {
    const filename = "src/data/inputfile3.txt";
    const arrayMessages = await handler.handler(filename);
    expect(arrayMessages[0]).toBe("Accept MotorcycleLot1");
    expect(arrayMessages[1]).toBe("Accept CarLot1");
    expect(arrayMessages[2]).toBe(
      "We cannot find your vehicle in our records! Please stay put, gonna call ghostbusters to catch phatom driver!"
    );
  });
  it("running the whole program on data4", async () => {
    const filename = "src/data/inputfile4.txt";
    const arrayMessages = await handler.handler(filename);
    expect(arrayMessages[0]).toBe("Accept MotorcycleLot1");
    expect(arrayMessages[1]).toBe("Accept CarLot1");
    expect(arrayMessages[2]).toBe(
      "Something went wrong with the cost calculation. Please call the carpark staff @999 for assistance!"
    );
  });
  it("running the whole program on data5", async () => {
    const filename = "src/data/inputfile5.txt";
    const arrayMessages = await handler.handler(filename);
    expect(arrayMessages[0]).toBe("Accept MotorcycleLot1");
    expect(arrayMessages[1]).toBe("Accept CarLot1");
    expect(arrayMessages[2]).toBe(
      "KTVCluster isnt a supported vehicle by our carpark. Please try somewhere else! Thanks"
    );
  });
});
