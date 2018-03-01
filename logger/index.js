/**
 * @description the basic logger extending default {console} functionality extracted
 * 		to avoid linting `no-console` warnings
 * @module faucetman/logger
 * @todo make it standalone module
 * @todo finish JSDoc's for misssing methods
 */
const timer = require('../timer/index');

const Logger = (() => {	
	let _module = '';

	const prepend = (marker, msgs) => {
		return (marker) ? [marker].concat(msgs) : msgs;
	};

	const make = (method) => {
		/** @returns {console.(log|warn|error)} method invocation */
		return (...msgs) => {
			let msg = prepend(`${_module}]:`, msgs);
			msg = prepend(`[${timer.now()}`, msg);
			/* eslint-disable-next-line no-console */
			console[method](...msg);
		};
	};

	return function(module) {
		_module = module || _module;
		return 	{
			error: make('error'),
			log: make('log'),
			warn: make('warn')
		};
	};
})();

module.exports = Logger;