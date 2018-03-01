/**
 * @description the simplest timer object for basic performance metrics tracking
 * @module faucetman/timer
 */

/**
 * @constructor
 */
const Timer = () => {
	/** @private */
	const at = new Date();

	/** @public */
	return {
		
		/** @property {number} started - POSIX timestamp value */
		get started() { return at.getTime(); },

		/** @property {number} elapsed - miliseconds since {@link Timer#started} */
		get elapsed() { return (new Date().getTime()) - this.started; },

		/** @method reset - the {@link Timer#started} value */
		reset: () => {
			this.at = new Date();
			return this.started;
		},

		/** @method start - a stub for the {@link Timer#reset()} method */
		start: () => { return this.reset; }
	};
};

/** @exports module:faucetman/timer instance of {@link Timer} */
module.exports = {
	timer: new Timer()
};