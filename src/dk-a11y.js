
import { set as setHideOthers, unset as unsetHideOthers } from './_hide-others';
import { set as setNoScroll, unset as unsetNoScroll, setClassName } from './_no-scroll';
import { set as setTrapFocus, unset as unsetTrapFocus } from './_trap-focus';
import { set as setOnEscape, unset as unsetOnEscape } from './_on-escape';
import { set as setOnClickOutside, unset as unsetOnClickOutside } from './_on-click-outside';

export default {
	hideOthers: {
		set: setHideOthers,
		unset: unsetHideOthers,
	},
	noScroll: {
		set: setNoScroll,
		unset: unsetNoScroll,
		setClassName,
	},
	trapFocus: {
		set: setTrapFocus,
		unset: unsetTrapFocus,
	},
	onEscape: {
		set: setOnEscape,
		unset: unsetOnEscape,
	},
	onClickOutside: {
		set: setOnClickOutside,
		unset: unsetOnClickOutside,
	},
};
