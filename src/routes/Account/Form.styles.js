import styled from "styled-components";


export const Container = styled.div `

	background-color: #8CF3F3;
    min-height: 100vh;
    width: 100%; 
    margin 0 auto;
    display: flex;
    flex-direction: row;
    /* ipads */
    @media (max-width: 700px) {
        flex-direction: column;
		width: 100%;
    }
	
`;

export const UserInfoContainer = styled.div `
	display: flex;
	flex-direction: column;
	width: 60%;
	padding: 2em;

    @media (max-width: 700px) {
        flex-direction: column;
		width: 100%;
    }


`
export const PaymentContainer = styled.div `

	display: flex;
	text-align: center;
	flex-direction: column;
	width: 40%;

	@media (max-width: 700px) {
        flex-direction: column;
		width: 100%;
		padding: 0em;
    }
`

export const Christmas = styled.div `

	position: relative;
	width: 100%;
	height: 100%;
	padding:0;
	margin:0 auto;
	min-width: 200px;
	@media (max-width: 700px) {
        flex-direction: column;
		width: 100%;
    }

	:hover img {
		opacity: 0.8;
	}

	:hover .middle {
		opacity: 1;
	}

	padding-top: 2em;
	flex-direction: column;
	justify-content: center; 
	align-items:center;
	img {
		width: 100%;
		height: 70%;
		max-height: 550px;
		padding-bottom: 2em;
		border: 1px solid black;
		opacity: 1;
		transition: 1s ease;
		backface-visibility: hidden;
		padding: 0;
		margin: 0;
		@media screen and (max-width: 1200px) { 
			max-height: 320px;
			min-height: 250px;
	
		}

	}

	
	.middle {
		transition: .5s ease;
		opacity: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		text-align: center;
		max-width: 600px;
		max-height: 400px;
	}
		

		
	.text {
		width: 100%;
		height: 100%;
		max-width: 600px;
		max-height: 400px;
		color: black;
		font-weight: bold;
		font-size: 1.4em;
	}
	

`
