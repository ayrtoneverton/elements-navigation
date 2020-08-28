export let KEYS = {
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	EVENT_KEY_PRESS: 'onkeydown'
};

export const DEFAULT = 'data-en-default';
export const ACTIVE = 'data-en-active';
export const ITEM = 'data-en-item';
export const HORIZONTAL = 'data-en-horizontal';
export const VERTICAL = 'data-en-vertical';

export const QUERY_DEFAULT = `[${DEFAULT}]`;
export const QUERY_ITEM = `[${ITEM}]`;
export const QUERY_HORIZONTAL = `[${HORIZONTAL}]`;
export const QUERY_VERTICAL = `[${VERTICAL}]`;
export const QUERY_CONTAINER = `${QUERY_ITEM}, ${QUERY_HORIZONTAL}, ${QUERY_VERTICAL}`;
export const QUERY_PARENT_FOR_ACTIVE = `${QUERY_HORIZONTAL} > *, ${QUERY_VERTICAL} > *`;

export const $ = (query, element = document) => element.querySelector(query);
export const $$ = (query, element = document) => element.querySelectorAll(query);

export const isActive = element => element.getAttribute(ACTIVE);
export const isContainer = element => element.getAttribute(HORIZONTAL) || element.getAttribute(VERTICAL);
export const getActiveChild = container => container.children && Array.from(container.children).find(isActive);

export const NOT_SCROLL_FOCUS = { preventScroll: true };
export const focusContainer = (container, event, move) => {
	if (event && event.treated) return;
	const active = getActiveChild(container);
	let newActive = move ? active[move] : active || container;
	let actual = newActive;
	while (actual) {
		if (isContainer(actual)) {
			actual = getActiveChild(actual);
		} else {
			actual.focus(NOT_SCROLL_FOCUS);
			if (actual === document.activeElement) {
				if (!event) return;
				event.treated = true;
				active.removeAttribute(ACTIVE);
				newActive.setAttribute(ACTIVE, true);
				break;
			} else {
				actual = $(QUERY_CONTAINER, actual);
			}
		}
		if (!actual && move) {
			newActive = newActive[move];
			actual = newActive;
		}
	}
};
export const PREVIOUS = 'previousElementSibling';
export const NEXT = 'nextElementSibling';
export const focusPrevious = (container, event) => focusContainer(container, event, PREVIOUS);
export const focusNext = (container, event) => focusContainer(container, event, NEXT);

function handleHorizontal(event) {
	switch (event.keyCode) {
		case KEYS.LEFT:
			focusPrevious(this, event);
			break;
		case KEYS.RIGHT:
			focusNext(this, event);
			break;
		default:
			break;
	}
}
function handleVertical(event) {
	switch (event.keyCode) {
		case KEYS.UP:
			focusPrevious(this, event);
			break;
		case KEYS.DOWN:
			focusNext(this, event);
			break;
		default:
			break;
	}
}
const initEvent = (element, handle) => {
	if (element[KEYS.EVENT_KEY_PRESS]) {
		element.onKeyMove = handle;
	} else {
		element[KEYS.EVENT_KEY_PRESS] = handle;
	}
	if (!getActiveChild(element) && element.firstElementChild) {
		element.firstElementChild.setAttribute(ACTIVE, true);
	}
};
const initHorizontalEvent = element => initEvent(element, handleHorizontal);
const initVerticalEvent = element => initEvent(element, handleVertical);

export const updateDOM = () => {
	const defaultContainer = [
		Array.from($$(QUERY_DEFAULT)).pop(),
		$(QUERY_HORIZONTAL),
		$(QUERY_VERTICAL),
		$(QUERY_ITEM)
	].find(e => e);
	if (!defaultContainer) return;
	let active = defaultContainer;
	let otherActive;
	while (active) {
		otherActive = getActiveChild(active.parentElement);
		if (otherActive) otherActive.removeAttribute(ACTIVE);
		active.setAttribute(ACTIVE, true);
		active = active.parentElement.closest(QUERY_PARENT_FOR_ACTIVE);
	}
	$$(QUERY_HORIZONTAL).forEach(initHorizontalEvent);
	$$(QUERY_VERTICAL).forEach(initVerticalEvent);
	if (defaultContainer) focusContainer(defaultContainer);
};

export const onPressByRef = (keyEvents, funcRef) => (element) => {
	if (!element) return;
	element[KEYS.EVENT_KEY_PRESS] = (event) => {
		const { treated } = event;
		const callBack = keyEvents[event.keyCode];
		if (callBack) {
			callBack(event, element);
		}
		if (event.treated && !treated) {
			event.treated = false;
		} else if (element.onKeyMove && !event.cancelBubble) {
			element.onKeyMove(event);
		}
	};
	if (funcRef) funcRef(element);
};

const initElementsNavigation = (keys) => {
	KEYS = { ...KEYS, ...keys };
	updateDOM();
	new MutationObserver(updateDOM).observe(document.body, { childList: true, subtree: true });
};

export default initElementsNavigation;
