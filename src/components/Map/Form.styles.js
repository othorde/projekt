import styled from "styled-components";



export const Container = styled.div `

	background-color: #8CF3F3;
    min-height: 100vh;
    width: 100%; 
    display: flex;
    flex-direction: column;

    /* ipads */
    @media (max-width: 700px) {
        flex-direction: column;
		width: 100%;
    }

`;



export const Main = styled.div `{
	display: flex;
	flex-direction: column;
	
	@media (max-width: 1000px) {
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding-right:0em;

	}
}
`


export const StyleMap = styled.div `{
	display: flex;
	flex-direction: column;
	border: 3px solid black;
	box-shadow: 10px 8px 20px 5px rgb(0 0 0 / 50%);
    min-height: 500px;
    width: 100%;
	
	}
`;
