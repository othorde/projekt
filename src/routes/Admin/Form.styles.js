import styled from "styled-components";


export const Container = styled.div `
	background-color: #8CF3F3;
	min-height: 100vh;
	width: 100%; 
	display: flex;
	flex-direction: row;
	height: 100%;
	/* ipads */
	@media (max-width: 720px) {
		flex-direction: column;
		width: 100%;

	}

`;
export const Nav = styled.div `
	display: flex;
	flex-direction: column;
	width: 10%;
	padding: 1em 1em 0em 1em;
    flex: 1 1 auto;


	@media screen and (max-width: 720px) {
		width: 85%;
		border: none;
		margin: 1em 2em 2em 1em;
		height: 100%;

	}
`;

export const ShowLogg = styled.div `
	display: flex;
	flex-direction: column;
	width: 20%;
	padding: 2em 2em;
	padding-bottom: 8em;
    flex: 1 1 auto;
	padding: 2em;
	background-color: #7ecfcf;

	@media screen and (max-width: 720px) {
		width: 91%;
		border: 2px solid black;
		margin: 1em 2em 2em 1em;
		height: 100%;
	}
`;

export const MapContainer = styled.div `
	display: flex;
	flex-direction: column;
	text-align: center;
	width: 65%;
	align-content: center;
	padding: 2em 2em;
	padding-bottom: 8em;
    flex: 1 1 auto;

	@media screen and (max-width: 720px) {
		flex-direction: row;
		padding: 1em;
		width: 100%;
		height: 100%;
		min-width: 250px;
	}
`;


export const StyledBtn = styled.button `
	display: flex;
	border: 1px solid #ffd343;
	border-radius: 4px;
	background: #292929;
	color: #F1F1F1;
	font-weight: 600;
	font-size: clamp(0.7em, 1vw, 1.2vw);
	text-transform: none;
	padding: 0.75 rem 1.25 rem;
	margin: 0 0 0.5
	rem 0;
	vertical-align: middle;
	text-align: center;
	cursor: pointer;
	text-decoration: none;
	line-height: 1;
	max-width: 9em;
	min-width: 100px;

	@media screen and (max-width: 720px) {
		font-size: 1em;
		font-size: clamp(1em, 1.3em, 1.4vw);
	}

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