import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	margin: 3rem 5rem;
	text-shadow: 0 0 0.5rem #000;

	h1 {
		font-size: 3rem;
		margin-bottom: 4rem;
	}

	p {
		font-size: 2rem;
		margin-bottom: 2rem;
	}

	a {
		color: #AAF;
		margin-left: .5rem;
		padding: .5rem;
		border: solid .2rem transparent;

		&:focus {
			border-color: #FFF;
		}
	}
`;

const Help = () => (
	<Container>
		<h1>Help</h1>
		<p>
			1. This demo is not designed to be used with the mouse, so use the directional controls to navigate.<br/>
			(use the arrow keys: &#8592; &#8594; &#8593; &#8595;)
		</p>
		<p>2. The data used here is generated randomly during page loading, that is, to test with new data, just update the page.</p>
		<p>
			3. For more details about the project, visit:
			<a data-en-item data-en-default href="https://github.com/ayrtoneverton/elements-navigation" target="_black">
				https://github.com/ayrtoneverton/elements-navigation
			</a>.
		</p>
	</Container>
);

export default Help;
