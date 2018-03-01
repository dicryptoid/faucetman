/**
 * @description peace of script to test the Timer methods
 */

const util = require('util');
const timer = require('../timer/index');
const logger = require('../logger/index')('LoggerTest');

/* eslint-disable-next-line no-console */
console.log(timer.now());
/* eslint-disable-next-line no-console */
console.log(util.inspect(logger));

logger.log(timer.now());
