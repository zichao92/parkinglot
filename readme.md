# parkinglot question
### Language used
nodejs
### Installaion
1) run `npm i`

### Test
1) run `yarn test` \
To add more test cases, please put the "inputfile" as .txt format and place it under `src/data/`
Go to `src/handler/handler.test.js` and add your new customised inputfile. Remember to rename the test case.
Please remove `.skip` from the individual handler test to see results.

### This program maintains 4 type of memories
In the absence of database, im using these objects as memories.
1) currentCapMem
This object mains the current number of cars and motorcycles. It will be initialised as 0
Example:
```
{
    "car": 0,
    "motorcycle": 0
}
```
2) limitMem
This object dictates the number of allowed vehicles for each type
```
{
    "car": 3,
    "motorcycle": 4
}
```
3) parkingLotMem
This object maintains a collection of currently parked vehicles.
```
{
    "SGX1001": {
        "type": "car",
        "entryTimeStamp": 160000,
        "allocated": "CarLot1"
    },
    "SGX1234A": {
        "type": "car",
        "entryTimeStamp": 1613541902,
        "allocated": "CarLot2"
    },
    "SGG9999A": {
        "type": "car",
        "entryTimeStamp": 1613541902,
        "allocated": "CarLot3"
    }
}
```
4) statusMem
This object mains the current parking situation. If the value is true for a particular key, it means that the parking lot is vaccant.
```
{
    "car":{
        "CarLot1" : true,
        "CarLot2" : true,
        "CarLot3" : true
    },
    "motorcycle":{
        "MotorcycleLot1" : true,
        "MotorcycleLot2" : true,
        "MotorcycleLot3" : true,
        "MotorcycleLot4" : true
    }
}
```

### Flow

1) handler is being initiated
2) handler calls and reads `input.txt`
3) handler inits in house memories using the first line of statements from input.txt
4) Uses factory design pattern to run the respective action (actionFactory)
Markdown
5) When a vehicle enters, it checks if the limit is being exceeded. If exceeded limit, we will return a reject statement.
6) If everything is good, the vehicle is registered using another factory design pattern(allocateObjFactory). The allocated parking lot will be printed out.
7) When exiting, the various memory will be modified and return back to the handler process. The fees will be calculated here as well (fareCalculation)


