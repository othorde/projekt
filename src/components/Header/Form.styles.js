import styled from "styled-components";

export const Container = styled.div `
	{	
		display: flex;
    	flex-direction: row;
		font-size: 1em;
		width: 100vw;
		height: 12%;
		min-height: 12vh;
		background: #1f2a32;
		color: #f1f1f1;
		border-bottom: 2px solid black;
		justify-content: center;
		align-items: center;

		@media screen and (max-width: 720px) {
			justify-content: right;

		}
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
		font-size: 1.3em;
		font-weight: 700;
		@media screen and (max-width: 720px) {
			display: none;
		  }
	}
`;

export const Nav = styled.div `
{
	display: flex;
	flex-direction: row;
	width: 60%;
	font-size: 1.3em;
	font-weight: 700;

	a {
		display: flex;
		flex-direction: row;
		text-decoration: none;
		color: #f1f1f1;
		margin: 0em 4em 0em 2em;
		transition: color 0.3s linear;

	}
	a:hover {
		color: #F47CB8;
	}

	@media screen and (max-width: 720px) {
		display:none;
	}
	@media screen and (max-width: 1000px) {
		margin: 0em 1em 0em 1em;
	}

}
`;

export const SignOut = styled.div `
	{
		padding-right: 4em;
		min-width: 6em;
		width: 15%;
		font-size: 1.3em;
		padding-right: 7em;
	}
`;


export const StyledMenu = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #1F2A32;
    height: 100vh;
    text-align: left;
    padding: 2rem;
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.3s ease-in-out;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
    z-index: 500;

a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: white;
    text-decoration: none;
    transition: color 0.3s linear;
    
    @media (max-width: 1000px) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: #F47CB8;
    }
}
`;
