import styled from "styled-components";



export const Container = styled.div `

	background-color: #8CF3F3;
    min-height: 100vh;
    width: 100%; 
    display: flex;
    flex-direction: row;
	max-height: 1200px;

    /* ipads */
    @media (max-width: 1000px) {
        flex-direction: column;
		width: 100%;
		max-height: 1800px;

    }

`;


export const Main = styled.div `{
	display: flex;
	flex-direction: column;
	
	@media (min-width: 720px) {
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
