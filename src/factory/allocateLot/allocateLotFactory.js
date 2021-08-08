const allocateLotIndex = require("./allocateLotIndex")

const allocateLotFactory = (vehicle) =>{
    return allocateLotIndex[vehicle]
}
module.exports = allocateLotFactory