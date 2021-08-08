const allocateObjndex = require("./allocateObjndex")

const allocateLotFactory = (vehicle) =>{
    return allocateObjndex[vehicle]
}
module.exports = allocateLotFactory