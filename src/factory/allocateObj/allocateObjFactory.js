const allocateObjndex = require('./allocateObjndex');

const allocateLotFactory = (vehicle) => allocateObjndex[vehicle];
module.exports = allocateLotFactory;
