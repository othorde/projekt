import styled from "styled-components";

export const Wrapper = styled.div `
	{	
		font-size: 1em;
		width: 100vw;
		height: 15vh;
        top: 0;
        left: 0;
        text-align: center;
		background: #1f2a32;
		color: #f1f1f1;
	}
`;

export const Content = styled.div `
	{	
		display: flex;
		font-size: 1em;
		width: 100%;
		height: 100%;

        text-align: center;
		color: #f1f1f1;
	}
`;

export const Logga = styled.div `
	{
		margin: 20px auto;

		flex:1;
		padding-left: 20px;
		font-size: 1.3em;
		max-width: 18%;
		height: 2.5em;
        text-align: left;

		@media screen and (max-width: 650px) {
			display: none;
		  }
	}
`;

export const Nav = styled.div `
{
	flex: 1;
	margin: 20px auto;
	width: 100%;
	font-size: 1.4em;

	a {
		text-decoration: none;
		color: #f1f1f1;
	}
	a:hover {
		color: #ffd343;
	}

	@media screen and (max-width: 650px) {

	}
	

}
`;

export const Nav2 = styled.div `
{
	flex: 1;
	margin: 20px auto;
	width: 100%;
	font-size: 0.8em;
	justify-content: left;
	a {
		text-decoration: none;
		color: #f1f1f1;
	}
	a:hover {
		color: #ffd343;
	}

	@media screen and (max-width: 650px) {

	}
}
`;

export const SignOut = styled.div `
	{
		flex: 1;
		padding-right: 1em;
		margin: 20px auto;
		min-width: 6em;
		max-width:10%;
		font-size: 1.3em;
		position: relative;
    	float: right;
	}
`;



