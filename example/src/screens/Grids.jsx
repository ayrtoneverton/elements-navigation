import React, { useState } from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string, func } from 'prop-types';
import { Grid } from 'elements-navigation/react';
import Card from '../components/Card';

const GridContainer = styled.div`
	height: 100%;
	padding: 2rem 5rem;
	overflow: hidden;

	& > * {
		width: 88rem;
		height: 38rem;
	}
`;

const SearchContainer = styled.div`
	width: 88rem;
	margin: 3rem 5rem 2rem 5rem;
	text-align: center;

	input {
		width: 30rem;
		padding: 1rem;
		color: #666;
		font-size: 1.5rem;
		border: solid .2rem #221526;
		background: #CCC;

		&:focus {
			background: #FFF;
		}
	}
`;

const Empty = styled.h1`
	text-align: center;
`;

const Grids = ({ data, setColor }) => {
	const [search, setSearch] = useState('');
	const result = [].concat(...data).filter(
		e => e.title.indexOf(search) >= 0 || e.color.indexOf(search) >= 0
	);
	return (
		<div data-en-vertical data-en-default>
			<SearchContainer>
				<input
					data-en-item
					onChange={e => setSearch(e.target.value)}
					placeholder="Search color..."
				/>
			</SearchContainer>
			<GridContainer data-en-active>
				{result.length ? (
					<Grid>
						{result.map((obj, i) => (
							<Card
								key={i}
								title={obj.title}
								subtitle={obj.color}
								onClick={() => setColor(obj.color)}
							/>
						))}
					</Grid>
				) : (
					<Empty>Nothing found</Empty>
				)}
			</GridContainer>
		</div>
	);
};

Grids.propTypes = {
	data: arrayOf(arrayOf(shape({
		title: string.isRequired,
		color: string.isRequired
	}))),
	setColor: func.isRequired
};

export default Grids;
