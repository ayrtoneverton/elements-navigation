import React from 'react';
import { string, func } from 'prop-types';
import styled from 'styled-components';

const A = styled.a`
	width: 16rem;
	margin: .4rem;
	padding: 2.5rem;
	text-align: center;
	text-decoration: none;
	outline: none;
	background: #644973;
	border: solid .05rem transparent;

	&:focus {
		background: #3d2867;
		transform: scale(1.3);
		transition: .3s;
		border-color: #FFF;
	}
`;

const Title = styled.div`
	font-size: 2.5rem;
	margin-bottom: 2rem;
`;

const Subtitle = styled.div`
	font-size: 1.5rem;
`;

const Card = ({ title, subtitle, onClick, ...props }) => (
	<A
		href="#"
		{...props}
		onClick={e => e.preventDefault() || (onClick && onClick(e))}
	>
		<Title>{title}</Title>
		<Subtitle>{subtitle}</Subtitle>
	</A>
);

Card.propTypes = {
	title: string.isRequired,
	subtitle: string,
	onClick: func
};

export default Card;
