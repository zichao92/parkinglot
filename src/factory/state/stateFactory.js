const stateIndex = require("./stateIndex")

const stateFactory = (state) =>{
    return stateIndex[state]
}
module.exports = stateFactory