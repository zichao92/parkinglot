const vehicleIndex = require("./vehicleIndex")

const vehicleFactory = (type) =>{
    return vehicleIndex[type]
}
module.exports = vehicleFactory