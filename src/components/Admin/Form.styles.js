import styled from "styled-components";


export const Wrapper = styled.div `
	align-content: center;
	font-size: 1rem;
	height: auto;
	width: 100vw;
	text-align: center;

`;

export const Content = styled.div `
	display:flex;
	flex-direction: row;
	height: 100vh;
	width: 100vw;
	background-color: #3776ab;

`;
export const Nav = styled.div `
	flex:1;
	border-right: solid black 1px ;
	padding: 1rem;
	max-width: 15%;
	min-width: 8em;
	height: 100%;
	@media screen and (max-width: 650px) {
		display: none;
	  }


`;

export const MapContainer = styled.div `
	flex:1;
	min-width: 350px;
	height: 100vh;
	position:relative;
	align-content: center;
	padding: 2em 2em;
	@media screen and (max-width: 650px) {
		padding: 1em;
		width: 100%;
	  }
`;


export const StyledBtn = styled.button `
	display: inline-block;
	border: 1px solid #ffd343;
	border-radius: 4px;
	background: #292929;
	color: #F1F1F1;
	font-weight: 600;
	font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, sans-serif;
	font-size: 1rem;
	text-transform: none;
	padding: 0.75 rem 1.25 rem;
	margin: 0 0 0.5
	rem 0;
	vertical-align: middle;
	text-align: center;
	cursor: pointer;
	text-decoration: none;
	line-height: 1;
	min-width: 9em;
	max-width: 9em;

	:hover {
		border: 1px solid #333333;
		background: #ffd343;
		color: #333333;
		text-decoration: none;
	}

	:active, :focus {
		border: 1px solid #ffd343;
		background: #333333;
		color: #fdeeee;
		text-decoration: none;
	}

	
`;