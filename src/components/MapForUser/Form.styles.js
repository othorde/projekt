import styled from "styled-components";


export const Style = styled.div `
	{	
		width: 85%;
		height: 85%;
		border: 20px;
		box-shadow: 10px 8px 20px 5px rgb(0 0 0 / 50%);
		min-width:250px;

		@media (max-width: 1000px) {
	
			min-width:250px;
			min-height:150px;
			border: 20px;
			height: 300px;
			width: 100%;

		}
		
	}
`;

