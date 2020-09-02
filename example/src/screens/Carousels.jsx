import React, { useState } from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string, func } from 'prop-types';
import { Carousel } from 'elements-navigation/react';
import Card from '../components/Card';

const Container = styled.div`
	width: 100%;

	h1, h2 {
		font-size: 2rem;
		padding: 3rem .4rem 2rem .4rem;
		text-shadow: 0 0 0.5rem #000;
	}
`;

const InfoContainer = styled.div`
	width: 88rem;
	margin: 0 5rem 2rem 5rem;

	h1 {
		font-size: 3rem;
	}
`;

const PreviewColor = styled.div`
	width: 3rem;
	height: 3rem;
	margin-left: 1rem;
	display: inline-block;
	vertical-align: middle;
	border: solid .05rem #DDD;
	background: ${p => p.color};
`;

const CarouselContainer = styled.div`
	height: 100%;
	padding: 0 5rem;
	overflow: hidden;

	& > * {
		width: 88rem;
		height: 20rem;
	}
`;

const Carousels = ({ data, setColor }) => {
	const [selected, setSelected] = useState(data[0][0]);
	return (
		<Container>
			<InfoContainer>
				<h1>{selected.title}</h1>
				<h2>
					Preview {selected.color}:
					<PreviewColor color={selected.color} />
				</h2>
			</InfoContainer>
			<CarouselContainer>
				<Carousel vertical data-en-default>
					{data.map((sub, i) => (
						<div key={i}>
							<h1>{`Session ${i}`}</h1>
							<Carousel>
								{sub.map((obj, j) => (
									<Card
										key={j}
										title={obj.title}
										subtitle={obj.color}
										onClick={() => setColor(obj.color)}
										onFocus={() => setSelected(obj)}
									/>
								))}
							</Carousel>
						</div>
					))}
				</Carousel>
			</CarouselContainer>
		</Container>
	);
};

Carousels.propTypes = {
	data: arrayOf(arrayOf(shape({
		title: string.isRequired,
		color: string.isRequired
	}))),
	setColor: func.isRequired
};

export default Carousels;
