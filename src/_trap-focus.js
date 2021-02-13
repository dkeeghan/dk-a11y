/**
 * Trap focus in a designated area. Also will automatically apply hideOthers
 * functionality to ensure that the rest of the screen is hidden from screenreaders.
 *
 * @namespace trapFocus
 * @memberof DKA11y
 */

import { KEY } from './_vars';

/**
 * Enable the focus trap features
 *
 * @memberof DKA11y.trapFocus
 * @param  {HTMLElement} element DOM Element to be used as the container for the focus trap
 * @param  {String} [type='modal'] Text to be displayed for screenreaders at the top and bottom
 */
export const set = (el, type = 'modal') => {
	const topMarker = document.createElement('div');
	topMarker.innerHTML = `Top of ${type}`;
	topMarker.classList.add('vh');
	topMarker.classList.add('focusable');
	topMarker.setAttribute('tabIndex', '0');
	topMarker.setAttribute('data-focus-trap-top', true);

	const bottomMarker = document.createElement('div');
	bottomMarker.innerHTML = `Bottom of ${type}`;
	bottomMarker.classList.add('vh');
	bottomMarker.classList.add('focusable');
	bottomMarker.setAttribute('tabIndex', '0');
	bottomMarker.setAttribute('data-focus-trap-bottom', true);

	el.insertBefore(topMarker, el.firstChild);
	el.appendChild(bottomMarker);

	topMarker.addEventListener(
		'keydown',
		e => {
			if (e.key === KEY.TAB && e.shiftKey) {
				e.preventDefault();
				bottomMarker.focus();
			}
		},
		true,
	);

	bottomMarker.addEventListener(
		'keydown',
		e => {
			if (e.key === KEY.TAB && !e.shiftKey) {
				e.preventDefault();
				topMarker.focus();
			}
		},
		true,
	);
};

/**
 * Disable the focus trap features
 *
 * @memberof DKA11y.trapFocus
 *
 * @param  {HTMLElement} element DOM Element to be used as the scope for removal - used when you might have trapFocus areas inside other trapFocus areas
 */
export const unset = (el = null) => {
	let topMarker, bottomMarker;

	if (el) {
		topMarker = el.querySelector(':scope > [data-focus-trap-top]');
		bottomMarker = el.querySelector(':scope > [data-focus-trap-bottom]');
	} else {
		topMarker = document.querySelector('[data-focus-trap-top]');
		bottomMarker = document.querySelector('[data-focus-trap-bottom]');
	}

	if (topMarker) {
		topMarker.parentNode.removeChild(topMarker);
	}

	if (bottomMarker) {
		bottomMarker.parentNode.removeChild(bottomMarker);
	}
};
