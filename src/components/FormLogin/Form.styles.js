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
	background-color: #3776ab;
	padding-top:8em;
	position:relative;
    .form {
      padding-bottom: 5em;
    }

`;



export const SignIn = styled.div `
	* {
		display:flex;
		flex-direction: column;

	}

	.register {
		border: 2px;
		padding: 2em;
		min-width: 14em;
		width:30%;
		align-items: center;
		margin: 0 auto;
		background-color: #1F4361;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);

	}



	/* Full-width input fields */
	input[type=text], input[type=password] {
		display:flex;
		flex:1;
		width: 93%;
		min-width: 6em;
		padding: 15px;
		margin-top: 10px;
		margin-bottom: 10px;

		border-radius: 8px;
		border: none;
		background: #f1f1f1;
		text-align: left;
		font-size: 1em;

	}

	label {
		width:100%
	}


	input[type=submit] {
		flex:1;
		text-align: center;
		margin: 0 auto;
		align-items: center;
		margin-top: 10px;
		width: 100%;
		min-width: 6em;

	}

	input[type=text]:focus, input[type=password]:focus {
		background-color: #ddd;
		outline: none;
	}

`;

export const Delimiter = styled.div ` 

	align-items: center;
	border-bottom: 1px solid #f1f1f1;
	width: 100%;
	margin: 20px 16px;
	text-align: center

`; 