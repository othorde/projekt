import styled from "styled-components";

export const Container = styled.div `
	display: flex;
	flex-direction: row;
	background-color: #8CF3F3;
    margin 0 auto;
    min-height: 100vh;
    width: 100%;
	

	/* ipads */
    @media (max-width: 700px) {
        flex-direction: column;
		width: 100%;
    }
`;

// export const Content = styled.div `
//     display: flex;
// 	flex-direction: column;
//     width: 100%;
//     height: 100%;
//     min-height: 100vh;
//     padding-bottom: 8em;    /* Footer height */

// 	@media (max-width: 769px) {
// 		flex-direction: column;
// 		padding:2em;
// 	}

// 	div {
// 		width:50%;
// 	}
// 	h2{
// 		font-size 2.5em;
// 	}

// 	@media (max-width: 769px) {
// 		position:relative;
// 		padding: 2em;

// 	}

// `;


export const WelcomeMessage = styled.div `
	display: flex;
	flex-direction: column;
	text-align: left;
	padding: 0em 4em 2em 2em;
	width: 60%;
	/* ipads */
	font-size: clamp(1.3rem, 2.5vw, 1.8rem); 

	@media (max-width: 700px) {
        flex-direction: column;
		padding: 0em 4em 1em 2em;
		width: 100%;
	
    }
	
	p {
		font-size: clamp(1.2rem, 2.5vw, 1.4rem); 
		max-width: 30em;
	}

	.container {
		position: relative;
		width: 100%;
		height: 100%
		padding:0;
		margin:0 auto;
	}

	.container:hover img {
		opacity: 0.8;
	}
	
	.container:hover .middle {
		opacity: 1;
	}

	img {
		height: 100%;
		width: 100%;
		max-height: 480px;
		max-width: 800px;
		min-width: 250px;
		border: 1px solid black;
		opacity: 1;
		transition: .5s ease;
		backface-visibility: hidden;
		padding: 0;
		margin: 0;
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
		color: white;
		font-size: 22px;
	}
`;






export const IconWrapper = styled.div `
	display: flex;
	flex-direction: column;
	width: 40%;
	padding: 8em 2em 2em 5em;

		@media (max-width: 700px) {
        flex-direction: column;
		width: 100%;
		padding: 2em;
		font-size: 1em;
    }
`

export const Icon1 = styled.div `
	flex: 2;
	text-align: left;
	color: #F47CB8;

	@media (max-width: 700px) {
		padding: 1em 1em 2em 1em;

    }


	h3, p{
		text-align: left;
		color: black;
		font-size: 2.3em;
		line-height: 1.0;
		margin-top: 0.2em;
		margin-bottom: 0.2em;
	}
	p{
		font-size: 1.3em;
	}
	`;

export const Icon2 = styled.div `
	flex: 2;
	text-align: left;

	@media (max-width: 700px) {
		padding: 1em 1em 2em 1em;
		font-size: 1em;
    }

	color: #F47CB8;
	h3, p{
		text-align: left;
		color: black;
		font-size: 2.3em;
		line-height: 1.0;
		margin-top: 0.2em;
		margin-bottom: 0.2em;
	}
	p{
		font-size: 1.3em;
	}
`;


export const Icon3 = styled.div `
	flex: 2;
	text-align: left;
	color: #F47CB8;

	@media (max-width: 700px) {
		padding: 1em 1em 2em 1em;
		font-size: 1em;
		min-width: 200px;
    }

	h3, p{
		text-align: left;
		color: black;
		font-size: 2.3em;
		line-height: 1.0;
		margin-top: 0.2em;
		margin-bottom: 0.2em;
	}
	p{
		font-size: 1.3em;
	}
`;

