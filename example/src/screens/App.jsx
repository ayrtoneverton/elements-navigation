import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Carousels from './Carousels';
import Grids from './Grids';
import Help from './Help';
import mock from '../mock';

const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		color: #FFF;
		outline: none;
		text-decoration: none;
		font-family: sans-serif;
	}

	html, body, #root, #root > div {
		display: flex;
		width: 100%;
		height: 100%;
		font-size: 10.6px;
		overflow: hidden;
		background: ${p => p.background};

		@media (min-width: 1000px) {
			font-size: 11.383px;
		}
		@media (min-width: 1900px) {
			font-size: 16px;
		}
		@media (min-width: 2500px) {
			font-size: 23px;
		}
		@media (min-width: 3800px) {
			font-size: 31px;
		}
	}
`;

const Menu = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	background: #2d1834;
	z-index: 1;
`;

const MenuItem = styled.a`
	padding: 1rem 2rem;
	margin: 1rem;
	font-size: 1.5rem;
	text-shadow: 0 0 .5rem #000;
	border: solid .2rem transparent;
	${p => p.active && 'background: rgba(0, 0, 0, .4);'}

	&:focus {
		border-color: #FFF;
	}
`;

const data = mock();

const screens = [
	{ title: 'Carousels', screen: Carousels },
	{ title: 'Grids', screen: Grids },
	{ title: 'Help', screen: Help }
];

const App = () => {
	const [color, setColor] = useState('#221526');
	const [screen, setScreen] = useState(0);
	const Screen = screens[screen].screen;
	return (
		<div data-en-horizontal>
			<GlobalStyle background={color} />
			<Menu data-en-vertical>
				{screens.map(({ title }, i) => (
					<MenuItem
						key={i}
						href="#"
						active={screen === i}
						onClick={e => e.preventDefault() || setScreen(i)}
					>
						{title}
					</MenuItem>
				))}
			</Menu>
			<Screen data={data} setColor={setColor} />
		</div>
	);
};

export default App;
