import styled from "styled-components";


export const Wrapper = styled.div `
	align-content: center;
	font-size: 1rem;
	height: 100vh;
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
	height: 100%;
	position:relative;
	align-content: center;
	padding: 2em 2em;
	@media screen and (max-width: 650px) {
		padding: 1em;
		width: 100%;

	  }

`;
