const actionIndex = require('./actionIndex');

const actionFactory = (state) => actionIndex[state];
module.exports = actionFactory;
