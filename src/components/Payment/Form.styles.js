import styled from "styled-components";


export const Content = styled.div `

    padding:2em;
    border: 2px;
    min-width:14em;
    margin: 0 auto;
    align-items: center;
    border-radius: 8px;
    box-shadow: 4 8px 16px rbg(0 0 0 / 80%)
    border: 2px solid black;


    p {
		font-weight: bold;
		text-transform: uppercase;
		color: #295B80;
	}

	@media (max-width: 700px) {
        flex-direction: column;
		width: 100%;
		padding: 1em;
    }
`


export const Delimiter = styled.div ` 

	align-items: center;
	border-bottom: 1px solid #f1f1f1;
	width: 100%;
	margin: 20px 16px;
	text-align: center
`; 


export const StylePayment = styled.div `
	

	* {
		display:flex;
		flex-direction: column;
	}

	
    input {
        width: 100%;
        min-width: 10em;
        padding: 15px;
        margin-top: 10px;
        margin-bottom: 10px;
        border-radius: 8px;
        background: #f1f1f1;
        text-align: left;
        font-size: 1em;

		@media (max-width: 1000px) {
			font-size: 0.9em;
			
		}
		@media (max-width: 700px) {
			font-size: 1em;
		}
    }

	.register {

		

		border: 2px;
		padding: 2em;
		min-width: 14em;
		width: 100%;
		align-items: center;
		margin: 0 auto;
		background-color: #1f2a32;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
		@media (max-width: 700px) {
			width:80%;
		}

	}

	/* Full-width input fields */
	input[type=text], input[type=password] {
		display:flex;
		flex:1;
		width: 100%;
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
	input[type=submit] {
		flex:1;
		text-align: center;
		margin: 0 auto;
		align-items: center;
		margin-top: 10px;
		width: 100%;
		min-width: 6em;
        background: #ffd343;

	}

	input[type=text]:focus, input[type=password]:focus {
		background-color: #ddd;
		outline: none;
	}
`;


