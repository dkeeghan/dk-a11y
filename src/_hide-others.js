/**
 * Use aria-hidden to hide all elements on the page except the one specified.
 * Used for modal windows and containers where the rest of the page is hidden.
 *
 * @namespace hideOthers
 * @memberof DKA11y
 */

let _elements = [];

/**
 * Gets this children of the requested node
 *
 * @memberof DKA11y.hideOthers
 * @param  {Object} node A list of node elements from the DOM
 * @param  {Object} skipMe The node element to be checked against
 * @private
 */
const _getChildren = (node, skipMe) => {
	const children = [];
	for (; node; node = node.nextSibling) {
		if (node.nodeType === 1 && node !== skipMe) {
			children.push(node);
		}
	}
	return children;
};

/**
 * Gets this nodes siblings
 *
 * @memberof DKA11y.hideOthers
 * @param  {Object} node DOM Node to find children of
 * @private
 */
const _getSiblings = node => {
	return _getChildren(node.parentNode.firstChild, node);
};

/**
 * Validates the DOM element to determine if it requires aria-hidden to be applied
 *
 * @memberof DKA11y.hideOthers
 * @param  {Object} elements List of DOM elements to validate
 * @private
 */
const _validateElements = elements => {
	const validated = [];

	for (let i = 0, len = elements.length; i < len; i += 1) {
		const el = elements[i];
		let ignoreBlock = false;

		if (el.nodeName.toLowerCase() === 'script' || el.nodeName.toLowerCase() === 'link') {
			ignoreBlock = true;
		}

		if (el.getAttribute('aria-hidden') === 'true') {
			ignoreBlock = true;
		}

		if (!ignoreBlock) {
			validated.push(el);
		}
	}

	return validated;
};

/**
 * Check DOM node and determine if it should be hidden or not
 *
 * @memberof DKA11y.hideOthers
 * @param  {Object} container List of DOM elements to validate
 * @param  {Object} scope custom scope (by default document.body) so you can only hide certain areas of the screen if you need
 * @private
 */
const _checkIfShouldBeHidden = (container, scope) => {
	const allChildren = scope.children;

	for (let i = 0; i < allChildren.length; i++) {
		const item = allChildren[i];
		if (item === container) {
			_elements = _elements.concat(_validateElements(_getSiblings(item)));
		} else if (item.contains(container)) {
			_elements = _elements.concat(_validateElements(_getSiblings(item)));
			_checkIfShouldBeHidden(container, item);
		}
	}
};

/**
 * Remove aria-hidden from all elements it was previously applied to
 *
 * @memberof DKA11y.hideOthers
 */
export const unset = () => {
	if (_elements && _elements.length > 0) {
		for (const el of _elements) {
			el.removeAttribute('aria-hidden');
		}

		_elements = [];
	}
};

/**
 * Apply aria-hidden to all DOM elements except for the container specified
 *
 * @memberof DKA11y.hideOthers
 * @param  {Object} container List of DOM elements to validate
 * @param  {Object} scope custom scope (by default document.body) so you can only hide certain areas of the screen if you need
 */
export const set = (container, scope = document.body) => {
	unset();

	_elements = [];
	_checkIfShouldBeHidden(container, scope);

	for (const el of _elements) {
		el.setAttribute('aria-hidden', true);
	}
};
