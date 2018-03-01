/**
 * @description the simplest timer object for basic performance metrics tracking
 * @module faucetman/timer
 * @todo make it standalone module
 */

/**
 * @constructor
 */
const Timer = function() {
	/** @private */
	const at = new Date();

	/** @public */
	return {
		
		/** @property {number} started - POSIX timestamp value */
		get started() { return at.getTime(); },

		/** @property {number} elapsed - miliseconds since {@link Timer#started} */
		get elapsed() { return (new Date().getTime()) - this.started; },

		/** @method reset():number - the {@link Timer#started} value */
		reset() {
			this.at = new Date();
			return this.started;
		},

		/** @method start():number - a stub for the {@link Timer#reset()} method */
		start() { return this.reset; },

		/** @method now():string - a method for getting the current date and time string */
		now() {
			let now = new Date(),
				date = `${now.getFullYear()}/${now.getMonth()}/${now.getDate()}`,
				time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`;
			return `${date} - ${time}`;
		}
	};
};

/** @exports module:faucetman/timer instance of {@link Timer} */
module.exports = new Timer();