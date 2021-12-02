import styled from 'styled-components';

export const Wrapper = styled.div `
	display:flex;
	font-size: 1em;
	height: 100vh;
	width: 100vw;
	text-align: center;

`;

export const Content = styled.div `
	margin: auto;
	width: 100%;
	height: 100%;
	background-color: #8CF3F3;
	padding-top:8em;
	position:relative;
    .form {
      padding-bottom: 5em;
	  z-index: 10;

    }
`;



export const SignIn = styled.div `
	* {
		display:flex;
		flex-direction: column;
		z-index: 10;

	}

	.register {
		
		a{
			text-decoration: none;
			color: black;
			:hover {
				color: white;
			}

		}

		div {
			display:flex;
			flex:1;
			width: 100%;
			min-width: 6em;
			padding: 15px;
			margin-top: 5px;
			margin-bottom: 5px;

			border-radius: 8px;
			border: none;
			background: #FFD343;
			text-align: center;
			font-size: 1.3em;
			font-weight: 900;

			
		}


		border: 2px;
		padding: 2em;
		min-width: 14em;
		width: 450px;
		min-height: 20em;

		align-items: center;
		margin: 0 auto;
		background-color: #1f2a32;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
		@media (max-width: 700px) {
			width: 60%;
		}

		@media (max-width: 480px) {
			padding: 1em;
		}
	
	}


`;

export const Delimiter = styled.div ` 

	align-items: center;
	border-bottom: 1px solid #f1f1f1;
	width: 100%;
	margin: 20px 16px;
	text-align: center

`; 

export const ScooterImg = styled.div `

	background-position: center center;
	width:100%;
	height:100%;
	position: absolute;
	top: -20px;
	left: 0;
	z-index: 1;


`