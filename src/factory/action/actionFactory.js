const actionIndex = require("./actionIndex")

const actionFactory = (state) =>{
    return actionIndex[state]
}
module.exports = actionFactory