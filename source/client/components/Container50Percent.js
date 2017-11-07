import React from 'react';
import styled from 'emotion/react';

const Container = styled.dev`
	flex-basis: 500px;
	flex-grow: 1;
`;

const Container50Percent = ({children}) => (<Container>{children}</Container>);

export default Container50Percent;
