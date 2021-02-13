/**
 * Bind an event to when you click outside of a specified area
 *
 * @namespace onClickOutside
 * @memberof DKA11y
 */

let _selector;
let _callback;

/**
 * Checks for the mouse click and validates and runs the callback.
 *
 * @memberof DKA11y.onClickOutside
 * @param  {MouseEvent} e
 * @private
 */
const _onClickOutside = e => {
	e.stopPropagation();

	if (e.target.closest(_selector) === null) {
		e.preventDefault();

		_callback();
	}
};

/**
 * Unset the event listener, recommended to call this event inside the callback
 * that is passed through to the `set` function.
 *
 * @memberof DKA11y.onClickOutside
 */
export const unset = () => {
	_callback = null;
	window.removeEventListener('click', _onClickOutside);
};

/**
 * Sets a callback and the event listeners for the document click event. Only one
 * event can be registered at the one time. Unset is automatically run before
 * setting a new event.
 *
 * @memberof DKA11y.onClickOutside
 * @param  {String} selector DOM selector string of the parent element
 * @param  {Function} callback Function to be run
 */
export const set = (selector, callback) => {
	if (typeof(callback) !== 'function') {
		throw new Error('Callback must be a function');
	}

	unset();

	// pull out of the current thread, or it will trigger on the click that calls this
	setTimeout(() => {
		_selector = selector;
		_callback = callback;

		window.addEventListener('click', _onClickOutside);
	}, 1);
};
