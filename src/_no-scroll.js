/**
 * Disable the page scroll animation.
 * Requires using the SCSS function provided
 *
 * @namespace noScroll
 * @memberof DKA11y
 */

import { CLASSES } from './_vars';

let classToUse = CLASSES.NO_SCROLL;

/**
 * Set a custom class name instead of the default provided option
 *
 * @memberof DKA11y.noScroll
 * @param  {String} newClassName New classname to be added/removed when noScroll set/unset
 */
export const setClassName = newClassName => {
	classToUse = newClassName;
};

/**
 * Stops the page from scrolling by applying a class to the body element
 *
 * @memberof DKA11y.noScroll
 */
export const set = () => {
	if (!document.body.classList.contains(classToUse)) {
		// document.documentElement.scrollTop is here for IE11 compat
		const scrollTop = window.scrollY || document.documentElement.scrollTop;

		document.body.classList.add(classToUse);
		document.body.style.top = `${-scrollTop}px`;
	}
};

/**
 * Allows the page to start scrolling again by removing the class
 *
 * @memberof DKA11y.noScroll
 */
export const unset = () => {
	if (document.body.classList.contains(classToUse)) {
		const top = parseInt(document.body.style.top, 10);

		document.body.classList.remove(classToUse);
		document.body.style.top = '';

		window.scroll(0, -top);
	}
};
