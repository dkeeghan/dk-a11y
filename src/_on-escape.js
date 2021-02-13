/**
 * Provides a shortcut to run a function when the ESC key is pressed
 *
 * @namespace onEscape
 * @memberof DKA11y
 */

import { KEY } from './_vars';

let _callbacks = [];

/**
 * Checks for the ESC keypress and validates and runs the callback.
 *
 * @memberof DKA11y.onEscape
 *
 * @param  {KeyboardEvent} e
 * @private
 */
const _onEscapeKeypress = e => {
	if (!e.defaultPrevented && e.key && e.key === KEY.ESC) {
		const [latestCallback] = _callbacks.slice(-1);

		if (latestCallback) {
			latestCallback.callback();
		}
	}
};

/**
 * Unset the event listener, recommended to call this event inside the callback
 * that is passed through to the `set` function.
 *
 * @memberof DKA11y.onEscape
 *
 * @param  {HTMLElement} el Linked element that it was originally bound to
 */
export const unset = el => {
	_callbacks = _callbacks.filter(callback => {
		return (callback.el !== el);
	});

	if (_callbacks.length === 0) {
		window.removeEventListener('keyup', _onEscapeKeypress);
	}
};

/**
 * Sets a callback and the event listeners for the keyup event.
 * Callbacks can be stacked, but need to be unset in the same order they were set
 *
 * @memberof DKA11y.onEscape
 * @param  {Function} callback Function to be run
 * @param  {HTMLElement} el Element that this function is linked to (allows for nesting of ESC functions)
 */
export const set = (callback, el) => {
	if (typeof(callback) !== 'function') {
		throw new Error('Callback must be a function');
	}

	_callbacks.push({
		callback,
		el,
	});

	window.addEventListener('keyup', _onEscapeKeypress);
};
