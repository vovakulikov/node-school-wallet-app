import React from 'react';
import styled from 'emotion/react';

const Container = styled.dev`
	width:50%;
	min-width: 500px;
`;

const Container50Percent = ({children}) => (<Container>{children}</Container>);

export default Container50Percent;