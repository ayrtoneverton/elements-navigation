import React from 'react';
import styled from 'styled-components';
import { bool, any } from 'prop-types';
import {
	onPressByRef, getActiveChild,
	PREVIOUS, NEXT, ACTIVE, VERTICAL, KEYS
} from '../elements-navigation';

const Container = styled.div`
	display: flex;
	max-width: 100%;
	max-height: 100%;
`;

const Horizontal = styled.div`
	display: flex;
	transition: margin .3s;
`;

const Vertical = styled.div`
	width: 100%;
	max-width: 100%;
	transition: margin .3s;
`;

let inTransition;
const stopTransition = () => { inTransition = false; };
const startTransition = (container, size, isLeft) => {
	inTransition = true;
	container.style[isLeft ? 'marginLeft' : 'marginTop'] = `-${Math.max(0, size)}px`;
	setTimeout(stopTransition, 300);
};

const getStyle = (element, prop) => {
	return parseFloat((element.currentStyle || getComputedStyle(element))[prop]);
};

const getElement = (container, event, move) => {
	if (inTransition) return event.stopPropagation();
	const element = getActiveChild(container)[move];
	if (!element) return null;
	element.movedTop = parseFloat(container.style.marginTop) || 0;
	element.movedLeft = parseFloat(container.style.marginLeft) || 0;
	return element;
};

const up = (event, container) => {
	const element = getElement(container, event, PREVIOUS);
	if (!element) return;
	const top = element.offsetTop - getStyle(element, 'marginTop');
	if (container.parentElement.offsetTop > top) {
		startTransition(container, top - container.parentElement.offsetTop - element.movedTop);
	}
};

const right = (event, container, el) => {
	const element = el || getElement(container, event, NEXT);
	if (!element) return;
	const rightContainer = container.parentElement.offsetLeft + container.parentElement.offsetWidth;
	const right = element.offsetLeft + element.offsetWidth + getStyle(element, 'marginRight');
	if (rightContainer < right) {
		startTransition(container, right - rightContainer - element.movedLeft, true);
	}
};

const down = (event, container, el) => {
	const element = el || getElement(container, event, NEXT);
	if (!element) return;
	const downContainer = container.parentElement.offsetTop + container.parentElement.offsetHeight;
	const down = element.offsetTop + element.offsetHeight + getStyle(element, 'marginBottom');
	if (downContainer < down) {
		startTransition(container, down - downContainer - element.movedTop);
	}
};

const left = (event, container) => {
	const element = getElement(container, event, PREVIOUS);
	if (!element) return;
	const left = element.offsetLeft - getStyle(element, 'marginLeft');
	if (container.parentElement.offsetLeft > left) {
		startTransition(container, left - container.parentElement.offsetLeft - element.movedLeft, true);
	}
};

export const activeByRef = (element) => {
	if (!element) return;
	element.setAttribute(ACTIVE, true);
	const container = element.parentElement;
	if (container.getAttribute(VERTICAL)) {
		element.movedTop = 0;
		down(null, container, element);
	} else {
		element.movedLeft = 0;
		right(null, container, element);
	}
};

const Carousel = ({ vertical, children, ...props }) => (
	<Container {...props}>
		{vertical ? (
			<Vertical
				data-en-vertical
				ref={onPressByRef({ [KEYS.UP]: up, [KEYS.DOWN]: down })}
			>
				{children}
			</Vertical>
		) : (
			<Horizontal
				data-en-horizontal
				ref={onPressByRef({ [KEYS.LEFT]: left, [KEYS.RIGHT]: right })}
			>
				{children}
			</Horizontal>
		)}
	</Container>
);

Carousel.propTypes = {
	vertical: bool,
	children: any
};

export default Carousel;
