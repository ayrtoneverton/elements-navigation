import React from 'react';
import styled from 'styled-components';
import { any } from 'prop-types';
import {
	KEYS, ACTIVE, onPressByRef, getActiveChild,
	PREVIOUS, NEXT, focusContainer
} from '../elements-navigation';

const Container = styled.div`
	display: flex;
	max-width: 100%;
	max-height: 100%;
`;

const GridContainer = styled.div`
	transition: margin .3s;

	& > * {
		display: inline-block;
	}
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
	const element = getActiveChild(container);
	const { offsetTop, offsetLeft } = element;
	let newElement = element[move];
	if (!newElement) return null;
	while (newElement[move] && (newElement.offsetLeft !== offsetLeft
		|| (move === NEXT ? newElement.offsetTop <= offsetTop : newElement.offsetTop >= offsetTop)
	)) {
		newElement = newElement[move];
	}
	newElement.movedTop = parseFloat(container.style.marginTop) || 0;
	newElement.movedLeft = parseFloat(container.style.marginLeft) || 0;
	event.stopPropagation();
	element.removeAttribute(ACTIVE);
	newElement.setAttribute(ACTIVE, true);
	focusContainer(newElement);
	return newElement;
};

const up = (event, container) => {
	const element = getElement(container, event, PREVIOUS);
	if (!element) return;
	const top = element.offsetTop - getStyle(element, 'marginTop');
	if (container.parentElement.offsetTop > top) {
		startTransition(container, top - container.parentElement.offsetTop - element.movedTop);
	}
};

const right = (event, container) => {
	const element = getActiveChild(container)[NEXT];
	if (!element || element.offsetTop > document.activeElement.offsetTop) {
		event.treated = true;
	}
};

const down = (event, container) => {
	const element = getElement(container, event, NEXT);
	if (!element) return;
	const downContainer = container.parentElement.offsetTop + container.parentElement.offsetHeight;
	const down = element.offsetTop + element.offsetHeight + getStyle(element, 'marginBottom');
	if (downContainer < down) {
		startTransition(container, down - downContainer - element.movedTop);
	}
};

const left = (event, container) => {
	const element = getActiveChild(container)[PREVIOUS];
	if (!element || element.offsetTop < document.activeElement.offsetTop) {
		event.treated = true;
	}
};

const Grid = ({ children, ...props }) => (
	<Container {...props}>
		<GridContainer
			data-en-horizontal
			ref={onPressByRef({
				[KEYS.UP]: up,
				[KEYS.RIGHT]: right,
				[KEYS.DOWN]: down,
				[KEYS.LEFT]: left
			})}
		>
			{children}
		</GridContainer>
	</Container>
);

Grid.propTypes = {
	children: any
};

export default Grid;
