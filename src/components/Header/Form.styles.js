import styled from "styled-components";

export const Container = styled.div `
	{	
		display: flex;
    	flex-direction: row;
		font-size: 1em;
		width: 100vw;
		height: 13%;
		min-height: 13vh;
		background: #1f2a32;
		color: #f1f1f1;
		border-bottom: 2px solid black;
		justify-content: center;
		align-items: center;
	}
`;

export const Content = styled.div `
	{	
		display: flex;
		flex-direction: column;
		font-size: 1em;
		width: 100%;
		height: 100%;
		color: #f1f1f1;
	}
`;

export const Logga = styled.div `
	{
		padding-left: 20px;
		font-size: 1.3em;
		width: 25%;
        text-align: left;

		@media screen and (max-width: 650px) {
			display: none;
		  }
	}
`;

export const Nav = styled.div `
{
	display: flex;
	flex-direction: row;
	width: 60%;
	font-size: 1.2em;


	a {
		display: flex;
		flex-direction: row;
		text-decoration: none;
		color: #f1f1f1;
		margin: 0em 4em 0em 2em;

	}
	a:hover {
		color: #ffd343;
	}

	@media screen and (max-width: 1000px) {
		margin: 0em 4em 0em 1em;

	}
}
`;

export const SignOut = styled.div `
	{
		padding-right: 4em;
		min-width: 6em;
		width: 15%;
		font-size: 1.3em;
	}
`;



